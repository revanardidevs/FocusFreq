# Sprint 6: Ads & Compliance — Implementation Plan

**Status:** ✅ Approved for coding (2026-05-09).

---

## Sprint Goal

Add monetization without damaging the focus experience, and ensure all legal/compliance pages exist before applying for AdSense.

Sprint 6 is NOT just "paste a script tag." It is a **compliance + monetization architecture sprint** that must get right:

1. Where ads appear and where they absolutely do not.
2. How ad slots behave before AdSense approval (reserved space, no CLS).
3. Legal pages required by AdSense and GDPR-readiness.
4. Consent management readiness (not full CMP, but the hook).
5. Mobile safety — no accidental clicks, no layout traps.

---

## Architecture Overview

```
┌──────────────────────────────────────────────────┐
│                  Root Layout                      │
│  ┌──────────────────────────────────────────────┐ │
│  │ Header (no ads)                              │ │
│  ├──────────────────────────────────────────────┤ │
│  │                                              │ │
│  │  Public SEO Pages        /app Workspace      │ │
│  │  ┌──────────────┐       ┌──────────────┐    │ │
│  │  │ Hero         │       │ Timer        │    │ │
│  │  │ Widget       │       │ (NO ADS)     │    │ │
│  │  │ Intro        │       │ (NO BANNER)  │    │ │
│  │  │ [AD SLOT 1]  │       └──────────────┘    │ │
│  │  │ Content      │                            │ │
│  │  │ [AD SLOT 2]  │       /app/history         │ │
│  │  │ FAQ          │       ┌──────────────┐    │ │
│  │  │ CTA          │       │ Session list │    │ │
│  │  │ Disclaimer   │       │ (NO ADS)     │    │ │
│  │  │ SEO Footer   │       │ (NO BANNER)  │    │ │
│  │  └──────────────┘       └──────────────┘    │ │
│  ├──────────────────────────────────────────────┤ │
│  │ Footer (legal links)                         │ │
│  │ [Consent Banner — public pages only]         │ │
│  └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

---

## P0 Deliverables (Must Ship)

### Phase 1: Ad Infrastructure

#### 1.1 `AdSlot` Component

Create a reusable `<AdSlot>` component that:

- Accepts a `slotId` prop (e.g., `"after-widget"`, `"content-mid"`, `"footer-above"`).
- Accepts a `format` prop: `"horizontal"` | `"rectangle"` | `"responsive"`.
- Reserves a **fixed min-height** to prevent Cumulative Layout Shift (CLS):
  - `horizontal`: `min-height: 90px` (leaderboard 728×90)
  - `rectangle`: `min-height: 250px` (medium rectangle 300×250)
  - `responsive`: `min-height: 100px`
- Reads AdSense pub ID from env: `NEXT_PUBLIC_ADSENSE_PUB_ID`.
- Reads consent state from `useCookieConsent` hook.
- Has a `className` prop for spacing/margin control by the parent.
- Uses `"use client"` directive since it interacts with the window/ad script.

**4-state rendering behavior:**

| State | Behavior |
|---|---|
| **Development** (no env) | Show placeholder box with dashed border + "Ad" label for layout QA |
| **Production without `NEXT_PUBLIC_ADSENSE_PUB_ID`** | Render nothing (zero height, no DOM) |
| **Production with env but no consent (`null` or `"rejected"`)** | Render nothing (zero height, no DOM) |
| **Production with env + `"accepted"` consent** | Render real AdSense `<ins>` tag with reserved min-height |

```tsx
// src/components/ads/AdSlot.tsx
interface AdSlotProps {
  slotId: string;
  format: 'horizontal' | 'rectangle' | 'responsive';
  className?: string;
}
```

#### 1.2 `AdScript` Component (Root Layout)

- Loads the AdSense script (`pagead2.googlesyndication.com`) via `next/script` with `strategy="afterInteractive"`.
- Only renders if ALL conditions are met:
  1. `NEXT_PUBLIC_ADSENSE_PUB_ID` env var is set.
  2. Cookie consent state is `"accepted"` (explicit opt-in).
- If consent is `null` or `"rejected"`, the script does NOT load at all.
- Placed in `app/layout.tsx`, NOT in individual pages.

```tsx
// src/components/ads/AdScript.tsx
// Uses next/script with strategy="afterInteractive"
// Gated by: env check + useCookieConsent().consent === 'accepted'
```

#### 1.3 Ad Placement Map

| Page Type | Slot 1 (after widget + intro) | Slot 2 (mid/lower content) | Notes |
|---|---|---|---|
| Homepage `/` | ✅ horizontal | ✅ rectangle | Max 2 ads |
| SEO timer pages | ✅ horizontal | ✅ rectangle | After widget, between content sections |
| SEO frequency pages | ✅ horizontal | ✅ rectangle | After widget, between content sections |
| SEO noise pages | ✅ horizontal | ✅ rectangle | After widget, between content sections |
| `/leaderboard` | ✅ horizontal | ✅ rectangle | Non-intrusive, away from CTA |
| `/app` workspace | ❌ | ❌ | **NO ADS EVER** |
| `/app/history` | ❌ | ❌ | **NO ADS** |
| `/privacy` | ❌ | ❌ | Legal page, no ads |
| `/terms` | ❌ | ❌ | Legal page, no ads |
| `/cookies` | ❌ | ❌ | Legal page, no ads |

**Hard rules:**

1. `/app` and `/app/history` must NEVER load the `AdSlot` component. This is enforced architecturally — the `app/` route group does not import or render any ad components.
2. **Max 2 ad slots per page.** No exceptions for MVP.
3. **Ad Slot 1 goes AFTER the embedded widget + introductory text**, never directly below the hero where it could be adjacent to Play/Start/Preview buttons.
4. **No ad slot within 48px of:** CTA buttons, Play/Stop controls, Start/Pause controls, form inputs, or FAQ expand/collapse triggers.

#### 1.4 Mobile Ad Safety Rules

- **Minimum 16px margin** between any ad slot and interactive elements (buttons, links, timer controls).
- **No sticky/floating ads** — all ads are inline within content flow.
- **No interstitials** — no full-screen ads on page load or navigation.
- **No ads within scroll containers** that could cause accidental taps.
- **Ad slots on mobile** use `format="responsive"` and never exceed viewport width.
- **No ads adjacent to audio play/stop buttons** — minimum 48px visual separation.

#### 1.5 CLS Prevention

Each `AdSlot` reserves its minimum dimensions via CSS:

```css
.ad-slot-horizontal { min-height: 90px; min-width: 728px; max-width: 100%; }
.ad-slot-rectangle  { min-height: 250px; min-width: 300px; max-width: 100%; }
.ad-slot-responsive { min-height: 100px; width: 100%; }
```

On mobile (`< 728px`), horizontal slots downgrade to responsive.

---

### Phase 2: Legal & Compliance Pages

#### 2.1 Privacy Policy — `/privacy`

Required by: AdSense, GDPR, general compliance.

Page must include:

- What data is collected (anonymous auth, session duration, display name).
- What data is NOT collected (task names, email for anon users, browsing outside app).
- Third-party services (Google AdSense, Supabase).
- Cookie usage (AdSense cookies, analytics if added later).
- Data retention (anonymous sessions, leaderboard data).
- User rights (opt out of leaderboard, data stays anonymous).
- Contact information.
- Last updated date.

Implementation:

- Static page at `src/app/(public)/privacy/page.tsx`.
- Server component, no client-side JS needed.
- Uses existing SEO layout (SEODisclaimer + SEOFooter).
- NO ads on this page.

#### 2.2 Terms of Service — `/terms`

Page must include:

- Acceptance of terms.
- Service description (focus timer, frequency generator, leaderboard).
- User conduct (no abuse of leaderboard, no bot sessions).
- Intellectual property.
- Disclaimer of warranties (not a medical tool).
- Limitation of liability.
- Audio/frequency disclaimer (expanded from footer).
- Modifications to terms.
- Governing law placeholder.

Implementation:

- Static page at `src/app/(public)/terms/page.tsx`.
- NO ads on this page.

#### 2.3 Cookie Policy — `/cookies`

Page must include:

- What cookies are used (AdSense, anonymous auth session).
- Essential vs non-essential cookies.
- How to manage cookies (browser settings).
- Third-party cookies (Google Ads).

Implementation:

- Static page at `src/app/(public)/cookies/page.tsx`.
- NO ads on this page.

#### 2.4 Footer Legal Links

Update global `Footer.tsx` to include links with these exact labels:

- **Privacy Policy** → `/privacy`
- **Terms** → `/terms`
- **Cookie Policy** → `/cookies`

These links must be visible on ALL pages (including `/app`).

---

### Phase 3: Consent Management Readiness

#### 3.1 Cookie Consent Banner

We do NOT build a full CMP (Consent Management Platform) in Sprint 6. But we DO build a minimal consent banner that:

- Shows on first visit on **public/SEO pages only**.
- Text: "We use cookies to serve ads and improve your experience. [Accept] [Decline]"
- Stores consent in `localStorage` key: `focusfreq_cookie_consent`.
- Values: `"accepted"` | `"rejected"` | `null` (not yet decided).
- Banner is a thin bottom bar, NOT a modal or popup that blocks content.
- Banner is dismissable and does not reappear after choice.

**Consent gating behavior (explicit opt-in):**

```
accepted  → AdSense script may load, AdSlot renders real ads
rejected  → no AdSense script, AdSlot renders nothing
null      → no AdSense script, show consent banner
```

**Banner placement restrictions:**

- ✅ Show on all `(public)` route group pages (SEO pages, leaderboard, legal pages).
- ❌ Do NOT show on `/app` (workspace).
- ❌ Do NOT show on `/app/history`.
- ❌ Do NOT show during active focus session flows.

This is enforced by only rendering `<CookieConsentBanner>` inside the `(public)` layout, NOT the root layout or the `app/` layout.

#### 3.2 Consent State Hook

```tsx
// src/hooks/useCookieConsent.ts
// Returns: { consent: 'accepted' | 'rejected' | null, accept: () => void, reject: () => void }
```

This hook is consumed by:

- `AdScript` — only loads if `consent === 'accepted'`.
- `AdSlot` — only renders ads if `consent === 'accepted'`.
- `CookieConsentBanner` — shows if `consent === null`, hides otherwise.

---

### Phase 4: AdSense Review Readiness

#### 4.1 Pre-Review Checklist

Before applying for AdSense, all of the following must be true:

| Check | Requirement |
|---|---|
| Content quality | All SEO pages have unique, useful content (verified Sprint 4) |
| Privacy policy | `/privacy` exists and is linked from footer |
| Contact | Contact info or form exists (can be email in privacy page) |
| Navigation | Clear site navigation with no dead links |
| Original content | No copied/scraped content |
| Sufficient pages | 15+ indexable pages (we have 16+) |
| No prohibited content | No medical claims (verified Sprint 4) |
| Mobile friendly | Responsive design (verified Sprint 4) |
| Site age | Domain should ideally be 1+ month old |
| Ad slot readiness | Manual ad slots exist with reserved space |

#### 4.2 `ads.txt` File

Create `public/ads.txt` with placeholder for when AdSense is approved:

```
# Placeholder — update with actual AdSense publisher ID after approval
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

This file will be updated with the real pub ID after AdSense approval.

#### 4.3 Meta Verification

Add Google AdSense meta verification tag support in root layout:

```tsx
// Only renders if NEXT_PUBLIC_ADSENSE_VERIFICATION is set
<meta name="google-adsense-account" content="ca-pub-XXXXXXXX" />
```

---

## P1 Deliverables (Can defer to Sprint 7)

These are NOT required for Sprint 6 closure but should be planned:

1. **Analytics integration** (Google Analytics 4) — useful for measuring ad revenue per page, but not blocking.
2. **Ad performance monitoring** — dashboard or logging of ad impressions, not needed for MVP.
3. **Full CMP** (e.g., Google's own Funding Choices) — for strict EU GDPR compliance, can be added post-launch.
4. **A/B testing ad placements** — post-launch optimization.

---

## File Plan

### New Files

| File | Type | Description |
|---|---|---|
| `src/components/ads/AdSlot.tsx` | Client component | Reusable ad container |
| `src/components/ads/AdScript.tsx` | Client component | AdSense script loader |
| `src/components/ads/CookieConsentBanner.tsx` | Client component | Minimal consent bar |
| `src/hooks/useCookieConsent.ts` | Hook | Consent state management |
| `src/app/(public)/privacy/page.tsx` | Server component | Privacy policy page |
| `src/app/(public)/terms/page.tsx` | Server component | Terms of service page |
| `src/app/(public)/cookies/page.tsx` | Server component | Cookie policy page |
| `public/ads.txt` | Static file | AdSense publisher declaration |

### Modified Files

| File | Change |
|---|---|
| `src/app/layout.tsx` | Add `<AdScript />`, optional AdSense verification meta |
| `src/components/layout/Footer.tsx` | Add legal links (Privacy, Terms, Cookies) |
| `src/app/(public)/pomodoro-timer/page.tsx` | Add `<AdSlot>` below hero and between content |
| `src/app/(public)/study-timer/page.tsx` | Add `<AdSlot>` slots |
| `src/app/(public)/focus-timer/page.tsx` | Add `<AdSlot>` slots |
| `src/app/(public)/frequency-generator/page.tsx` | Add `<AdSlot>` slots |
| `src/app/(public)/tone-generator/page.tsx` | Add `<AdSlot>` slots |
| `src/app/(public)/binaural-beat-generator/page.tsx` | Add `<AdSlot>` slots |
| `src/app/(public)/noise-generator/page.tsx` | Add `<AdSlot>` slots |
| `src/app/(public)/frequency/[hz]/page.tsx` | Add `<AdSlot>` slots |
| `src/app/(public)/noise/[type]/page.tsx` | Add `<AdSlot>` slots |
| `src/app/(public)/leaderboard/page.tsx` | Add `<AdSlot>` slots |
| `src/app/(public)/page.tsx` | Add `<AdSlot>` on homepage |
| `src/app/sitemap.ts` | Add `/privacy`, `/terms`, `/cookies` |
| `src/components/seo/SEOFooter.tsx` | Add legal links section |

### Untouched Files (No Ads — Hard Rule)

These files must NOT be modified to include any ad components:

- `src/app/app/page.tsx` — workspace
- `src/app/app/history/page.tsx` — history
- `src/components/session/FocusWorkspace.tsx` — timer/session
- `src/components/timer/*` — timer controls
- `src/components/audio/*` — audio controls

---

## Build Order

```
Step 1:  AdSlot + AdScript components (infrastructure)
Step 2:  useCookieConsent hook
Step 3:  CookieConsentBanner component
Step 4:  Legal pages (privacy, terms, cookies)
Step 5:  Footer legal links
Step 6:  Place AdSlot in SEO pages
Step 7:  Place AdSlot in homepage + leaderboard
Step 8:  ads.txt + meta verification
Step 9:  Sitemap update
Step 10: Build verification + QA
```

---

## Acceptance Criteria

### Must Pass (P0)

- [ ] `AdSlot` component exists with 4-state rendering (dev placeholder / prod no-env / prod no-consent / prod ready).
- [ ] `AdSlot` renders nothing in production if `NEXT_PUBLIC_ADSENSE_PUB_ID` is missing.
- [ ] `AdSlot` renders nothing in production if consent is `null` or `"rejected"`.
- [ ] AdSense script only loads if env is configured AND consent is `"accepted"` (explicit opt-in).
- [ ] **NO ads anywhere on `/app` or `/app/history`** — verified by code inspection AND visual QA.
- [ ] **NO consent banner on `/app` or `/app/history`** — verified visually.
- [ ] No ad slot within 48px of any audio play/stop button.
- [ ] No ad slot adjacent to or overlapping timer start/pause/stop controls.
- [ ] Ad Slot 1 is placed AFTER embedded widget + intro, not directly below hero.
- [ ] No sticky, floating, or interstitial ads.
- [ ] Mobile: no ad causes horizontal scroll or viewport overflow.
- [ ] Mobile: no ad slot is positioned where accidental thumb taps are likely.
- [ ] Max 2 ad slots per page.
- [ ] `/privacy` page exists with complete content (subject to content review).
- [ ] `/terms` page exists with complete content (subject to content review).
- [ ] `/cookies` page exists with complete content (subject to content review).
- [ ] Global footer links to Privacy Policy, Terms, Cookie Policy on ALL pages.
- [ ] Cookie consent banner appears on first visit on public pages.
- [ ] Consent banner is dismissable and remembers choice.
- [ ] If consent is `null` (no choice), no AdSense script loads, banner shows.
- [ ] If consent is `"rejected"`, no AdSense script loads, no ad slots render.
- [ ] `ads.txt` exists in public directory.
- [ ] Sitemap includes `/privacy`, `/terms`, `/cookies`.
- [ ] `npm run build` exits 0.
- [ ] No medical/health claims in any new content.

### QA Checklist

| Check | Method |
|---|---|
| No ads in `/app` | Visual inspection + code grep |
| No ads in `/app/history` | Visual inspection + code grep |
| Ad slot CLS prevention | Lighthouse CLS score on SEO pages |
| Mobile ad safety | 375px viewport visual QA |
| Legal pages render | Navigate to `/privacy`, `/terms`, `/cookies` |
| Footer links work | Click each legal link from any page |
| Consent banner appears | Clear localStorage, reload public page |
| Consent rejection works | Reject cookies, verify no ad script in DOM |
| AdSense fail-safe | Remove env var, verify no errors |
| Build passes | `npm run build` exit 0 |

---

## Finalized Decisions (GPT Review)

All open questions have been resolved:

### 1. Consent default → Explicit opt-in (Option B)

**Decision:** No accepted consent = no AdSense script. Users must explicitly click "Accept" before any ads load. This is safer for trust and compliance at the MVP stage. Can be revisited post-launch if EU traffic is negligible.

### 2. AdSense application timing → Sprint 7

**Decision:** Deploy Sprint 6 infrastructure to production first. Apply for AdSense during Sprint 7 when the site has indexed content, live traffic, and has been polished.

### 3. Legal page content → Must be reviewed

**Decision:** LM1 may draft FocusFreq-specific legal pages using standard boilerplate tailored to the app's actual data practices (anonymous auth, no task names in backend, Supabase, AdSense, etc.). However, legal page content must be reviewed before considered final. Do not treat as "done" until reviewed.

### 4. Ad density → Max 2 per page

**Decision:** Cap at 2 ad slots per page for MVP. Do not add a third slot. Revisit after seeing real page lengths and ad performance post-launch.

---

## Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| AdSense rejection | No revenue until reapply | Ensure all checklist items pass before applying |
| Ads hurt user trust | Users leave | No ads during focus, consent banner, clear labeling |
| CLS from ad loading | Poor Core Web Vitals | Reserved min-height slots |
| Accidental mobile clicks | AdSense policy violation | Strict spacing rules, no sticky ads |
| Legal pages insufficient | Compliance risk | Standard boilerplate covering actual data practices |
| Cookie consent blocks all ads | Revenue loss until accept | Explicit opt-in is safer for trust; revisit if acceptance rate is too low |

---

## What Sprint 6 Does NOT Include

- ❌ Google Analytics 4 (can add in Sprint 7)
- ❌ Full CMP/GDPR consent platform (can add post-launch)
- ❌ Ad revenue tracking/dashboard
- ❌ Premium/ad-free tier
- ❌ Affiliate links
- ❌ Sponsorship slots
- ❌ A/B testing ad positions
