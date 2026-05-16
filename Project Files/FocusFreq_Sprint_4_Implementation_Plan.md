# FocusFreq Sprint 4 Implementation Plan: SEO & Public Utility Pages

## 🎯 Sprint Objective
Transform FocusFreq from a standalone web app into an SEO-first utility platform. Build indexable, high-quality public landing pages targeting specific search intents with interactive, lightweight embedded widgets and clear conversion funnels to the main app via URL parameter handoff.

## 🏗️ 1. Architecture & Reusable Components
- **`PublicLayout`**: A dedicated layout (`app/(public)/layout.tsx`) for public pages featuring a top navigation bar (Home, Timer Tools, Audio Tools) and an SEO-rich footer for internal linking.
- **`SEOContent` Components**: Reusable blocks like `<HeroHeader>`, `<FeatureList>`, `<FAQSection>`, and `<Disclaimer>` to maintain semantic HTML (`<h1>` to `<h3>`).
- **Structured Data**: Implement safe JSON-LD (`WebApplication`, `FAQPage`, `BreadcrumbList`). Avoid overly aggressive or medical schema.

## 🛠️ 2. Embedded Interactive Widgets (Lightweight)
Public pages must immediately solve the search intent using lightweight widgets, without recreating the full app.
- **`EmbeddedTimer`**: A lightweight timer capable only of basic start/stop functionality. No tasks, sessions, or history tracking.
- **`EmbeddedAudioPlayer`**: A lightweight audio widget capable of preview/play/stop for a specific preconfigured sound (e.g., a 432 Hz sine wave).
- **CTA**: Below every widget will be a clear Call To Action (e.g., "Start Full Focus Session") that links to the `/app` route.

## 🔗 3. URL Parameter Handoff
This is the core conversion funnel. The `/app` route will be updated to read URL search parameters and prefill its state.
**Examples:**
- `/frequency/432-hz` -> `/app?audioMode=tone&hz=432&waveform=sine`
- `/noise/brown-noise` -> `/app?audioMode=noise&noise=brown`
- `/pomodoro-timer` -> `/app?timer=25`
- `/study-timer` -> `/app?timer=45`
- `/deep-work-timer` -> `/app?timer=50`

## 📄 4. Page Rollout Priority

### P0 (Required for Sprint 4)
- `/pomodoro-timer`
- `/focus-timer`
- `/study-timer`
- `/frequency-generator`
- `/tone-generator`
- `/binaural-beat-generator`
- `/noise-generator`
- `/frequency/432-hz`
- `/frequency/528-hz`
- `/frequency/40-hz`
- `/noise/brown-noise`
- `/noise/white-noise`
- `/noise/pink-noise`

### P1 (If time allows)
- `/deep-work-timer`
- `/task-timer`
- `/frequency/963-hz`
- `/frequency/440-hz`
- `/frequency/1000-hz`
- `/noise/rain`
- `/noise/cafe`

## ✅ 5. Acceptance Criteria
- `sprint_4_implementation_plan.md` contains only the Sprint 4 plan.
- Public SEO pages are indexable and accessible without login.
- Public pages are not thin placeholders.
- Each main timer page includes an embedded lightweight timer.
- Each main audio/frequency/noise page includes an embedded lightweight audio widget.
- Specific frequency pages include a playable preconfigured tone.
- Specific noise pages include playable preconfigured noise.
- Each page has unique H1, title, meta description, and useful copy.
- Each page has internal links to related tools.
- Each page has a clear CTA to `/app`.
- CTA uses URL params to prefill timer/audio state in `/app`.
- `/app` can read URL params and preconfigure timer/audio settings.
- Frequency/audio pages include safe non-medical wording and disclaimer.
- Sitemap includes all new public routes.
- robots config does not block public routes.
- No Google Ads script is added yet.
- No leaderboard/public stats pages are built yet.
- No medical/healing claims are added.
- Build passes.
- Mobile layout works for public pages.
