
# FocusFreq Sprint 7C — Minimal Focus UI Refresh Blueprint

## 0. Context

FocusFreq sudah functionally launch-ready:

```txt
Sprint 0: Alignment ✅
Sprint 1: Foundation App ✅
Sprint 2: Frequency Engine ✅
Sprint 3: History & Progression ✅
Sprint 4: SEO Utility Pages ✅
Sprint 5: Leaderboard Backend ✅
Sprint 6: Ads & Compliance ✅
Sprint 7A: Pomodoro Cycle & Settings ✅
Sprint 7B: Launch Readiness QA ✅
```

Namun visual UI saat ini masih perlu disesuaikan agar terasa:

```txt
brighter
cleaner
more focused
less dashboard-like
more polished before launch
```

Mockup visual terbaru sudah menunjukkan arah yang tepat: **warm light focus UI**, timer sangat dominan, workspace lebih clean, dan elemen data/task/audio tetap ada tapi tidak mencuri perhatian.

Sprint 7C bukan sprint fitur. Ini adalah **visual + UX refinement sprint**.

---

# 1. Goal

Tujuan Sprint 7C:

> Mengubah FocusFreq menjadi bright minimal focus console yang lebih tenang, lebih cerah, lebih fokus, dan lebih siap launch tanpa mengubah product logic.

FocusFreq harus terasa seperti:

```txt
calm focus workspace
warm productivity tool
modern Pomodoro app
audio-aware timer
clean launch-ready web app
```

Bukan seperti:

```txt
analytics dashboard
dark developer MVP
neon audio app
project management tool
cluttered productivity dashboard
```

---

# 2. Core UX Principle

Prinsip utama:

> **Focus-first, not dashboard-first.**

Saat user masuk `/app`, UI harus menjawab satu hal:

```txt
Apa yang perlu user lakukan untuk mulai fokus sekarang?
```

Urutan prioritas visual:

```txt
1. Current task
2. Current mode: Focus / Short Break / Long Break
3. Timer besar
4. Start / Pause / End action
5. Audio summary
6. Quick duration controls
7. Compact task access
8. Compact today summary
9. Settings
10. History / deeper stats
```

Jangan menampilkan terlalu banyak informasi di workspace utama.

---

# 3. Hard Rules

LM1 harus mengikuti aturan ini:

```txt
Do not change product logic.
Do not change timer/session behavior.
Do not change Pomodoro cycle rules.
Do not change backend/Supabase logic.
Do not change leaderboard rules.
Do not change ads/consent logic.
Do not change SEO routes/content.
Do not add new features.
Do not add analytics.
Do not add theme toggle.
Do not add integrations.
Do not add new dependencies unless absolutely necessary.
```

Sprint ini hanya:

```txt
colors
layout polish
spacing
visual hierarchy
responsive polish
component styling
readability
focus-mode simplification
```

---

# 4. Visual Direction

## 4.1 Overall Mood

Arah visual:

```txt
bright
warm
minimal
focused
soft
clean
calm
launch-ready
```

Bukan:

```txt
cold corporate SaaS
heavy dashboard
dark ambient
neon cyber
over-illustrated
childish
```

Visual harus terasa seperti:

> meja kerja pagi yang bersih, timer fokus di tengah, task kecil di samping, audio sebagai pendamping.

---

# 5. Color System

Gunakan palette ini sebagai baseline.

## 5.1 Core Colors

```css
--color-bg: #FAFAF7;
--color-bg-warm: #FFF8F0;
--color-surface: #FFFFFF;
--color-surface-soft: #FFFDF9;

--color-text: #202124;
--color-text-strong: #111827;
--color-text-muted: #6F6A64;
--color-text-soft: #8A817A;

--color-border: #EAE6DF;
--color-border-strong: #DDD5CC;
```

## 5.2 Focus Accent

Focus mode memakai coral/orange-red.

```css
--color-focus: #F05A3C;
--color-focus-hover: #E24A31;
--color-focus-soft: #FFF0EA;
--color-focus-border: #FFC9BA;
--color-focus-shadow: rgba(240, 90, 60, 0.22);
```

Usage:

* primary CTA,
* Focus tab selected,
* active nav,
* progress accent,
* focus session status,
* current focus indicator.

## 5.3 Break Accent

Break mode memakai green/teal.

```css
--color-break: #2FAE75;
--color-break-hover: #269764;
--color-break-soft: #EAF8F1;
--color-break-border: #BFEBD5;
--color-break-shadow: rgba(47, 174, 117, 0.18);
```

Usage:

* Short Break selected state,
* Long Break selected state,
* break CTA,
* break status badge,
* break history label.

## 5.4 Audio Accent

Audio/frequency identity memakai soft violet.

```css
--color-audio: #6C63FF;
--color-audio-hover: #5B54E8;
--color-audio-soft: #F1EEFF;
--color-audio-border: #D8D2FF;
--color-audio-shadow: rgba(108, 99, 255, 0.18);
```

Usage:

* Audio summary card,
* AudioPanel selected controls,
* sound icon,
* frequency/noise badges,
* audio preview button secondary state.

## 5.5 Neutral Utility Colors

```css
--color-success: #2FAE75;
--color-warning: #F59E0B;
--color-danger: #EF4444;
--color-info: #3B82F6;
```

---

# 6. Gradient Principles

Gradients harus subtle, bukan dekorasi berlebihan.

## 6.1 Background Gradient

Global background boleh pakai warm subtle gradient:

```css
background:
  radial-gradient(circle at top left, rgba(240, 90, 60, 0.08), transparent 28%),
  radial-gradient(circle at bottom right, rgba(108, 99, 255, 0.06), transparent 26%),
  #FAFAF7;
```

Jangan pakai gradient kuat.

## 6.2 Primary Button Gradient

CTA utama boleh pakai coral gradient:

```css
background: linear-gradient(135deg, #F05A3C 0%, #FF735C 100%);
box-shadow: 0 14px 30px rgba(240, 90, 60, 0.22);
```

Hover:

```css
background: linear-gradient(135deg, #E24A31 0%, #F05A3C 100%);
transform: translateY(-1px);
```

## 6.3 Audio Surface Gradient

Audio summary boleh pakai soft violet:

```css
background: linear-gradient(135deg, #F7F4FF 0%, #FFFFFF 100%);
border: 1px solid #D8D2FF;
```

## 6.4 Break Surface Gradient

Break mode boleh pakai:

```css
background: linear-gradient(135deg, #EAF8F1 0%, #FFFFFF 100%);
```

---

# 7. Typography

Gunakan font modern, clean, highly readable.

## 7.1 Font Choice

Primary:

```txt
Inter
```

Fallback:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Jika Inter belum ada, gunakan system font dulu. Jangan tambah dependency font yang rumit kecuali sudah dipakai.

## 7.2 Typography Scale

```css
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 32px;
--text-4xl: 40px;
--text-timer-desktop: 112px;
--text-timer-tablet: 88px;
--text-timer-mobile: 64px;
```

## 7.3 Font Weights

```txt
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
Timer: 700 or 800
```

Timer harus large, bold, tapi tidak terlalu condensed.

## 7.4 Timer Typography

Timer style:

```css
font-size: clamp(64px, 10vw, 112px);
font-weight: 800;
letter-spacing: -0.06em;
line-height: 0.95;
color: #202124;
```

Timer harus menjadi elemen terbesar di `/app`.

---

# 8. Shape, Border, Shadow

## 8.1 Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 28px;
--radius-pill: 999px;
```

Usage:

* buttons: 12–16px,
* cards: 20–28px,
* tabs: 12–16px,
* small badges: pill.

## 8.2 Border

Gunakan border soft:

```css
border: 1px solid #EAE6DF;
```

Jangan terlalu banyak border tebal. Untuk hierarchy, pakai surface/background difference.

## 8.3 Shadows

Soft shadow only:

```css
--shadow-card: 0 18px 50px rgba(31, 24, 16, 0.06);
--shadow-soft: 0 8px 24px rgba(31, 24, 16, 0.05);
--shadow-focus: 0 18px 36px rgba(240, 90, 60, 0.18);
```

Jangan pakai harsh shadow.

---

# 9. Spacing System

Gunakan spacing konsisten:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

## 9.1 General Rules

* Jangan terlalu rapat.
* Workspace harus lega.
* Timer perlu breathing room.
* Cards jangan terlalu banyak padding besar di mobile.
* Mobile harus mengurangi vertical waste.

---

# 10. Layout Architecture

## 10.1 Desktop `/app`

Desktop layout yang disarankan:

```txt
┌───────────────────────────────────────────────┐
│ Minimal Header / Side Nav                     │
├───────────────────────────────────────────────┤
│                                               │
│        ┌─────────────────────────────┐        │
│        │ Current Task / Task Input   │        │
│        │ Mode Tabs                   │        │
│        │                             │        │
│        │           25:00             │        │
│        │                             │        │
│        │ Duration Buttons            │        │
│        │ Audio Summary               │        │
│        │ Start Button                │        │
│        └─────────────────────────────┘        │
│                                               │
│   ┌───────────────┐     ┌─────────────────┐   │
│   │ Compact Tasks │     │ Today Summary   │   │
│   └───────────────┘     └─────────────────┘   │
│                                               │
└───────────────────────────────────────────────┘
```

Timer card harus berada di tengah dan paling dominan.

## 10.2 Avoid

Jangan buat layout seperti:

```txt
Task list besar | Timer | Stats besar
```

Karena itu membuat workspace terasa seperti dashboard.

---

# 11. Navigation

## 11.1 Header / Sidebar

Ada dua opsi. Pilih yang paling mudah sesuai codebase saat ini.

### Option A: Top Header Minimal

```txt
FocusFreq     Home     Focus     History     Leaderboard     Settings
```

Cocok untuk public/app consistency.

### Option B: Small Left Sidebar

```txt
FocusFreq
Focus
History
Leaderboard
Settings
```

Kalau dipakai, sidebar jangan terlalu dominan. Width sekitar 160px–180px.

## 11.2 Active Nav

Focus active:

```css
background: #FFF0EA;
color: #F05A3C;
border-radius: 12px;
```

Icons:

* stroke line icons,
* 18–20px,
* jangan emoji sebagai primary icon kecuali badge kecil.

---

# 12. Workspace Component Blueprint

## 12.1 Main Timer Card

Main card:

```css
background: #FFFFFF;
border: 1px solid #EAE6DF;
border-radius: 28px;
box-shadow: 0 18px 50px rgba(31, 24, 16, 0.06);
padding: 40px 48px;
max-width: 680px;
margin: 0 auto;
```

Mobile:

```css
padding: 24px 18px;
border-radius: 22px;
max-width: 100%;
```

## 12.2 Current Task Area

If no task:

```txt
What will you focus on?
[ e.g. Write landing page copy        + ]
```

If active task:

```txt
Working on
Write landing page copy   [edit icon]
```

Style:

```css
label: 13px, font-weight 600, text #6F6A64
task title: 18–22px desktop, 16–18px mobile, font-weight 600
```

Do not show full task list here.

## 12.3 Mode Tabs

Tabs:

```txt
Focus | Short Break | Long Break
```

Container:

```css
display: grid;
grid-template-columns: repeat(3, 1fr);
background: #FFFDF9;
border: 1px solid #EAE6DF;
border-radius: 16px;
padding: 4px;
```

Selected Focus:

```css
background: #FFF0EA;
color: #F05A3C;
border: 1px solid #FFC9BA;
```

Selected Break:

```css
background: #EAF8F1;
color: #2FAE75;
border: 1px solid #BFEBD5;
```

Tab min height:

```css
44px
```

Use icons if available:

* Focus: target/flame
* Short Break: cup
* Long Break: tree/leaf

Icon optional. Text must remain clear.

## 12.4 Timer

Timer centered:

```txt
25:00
```

Status underneath:

```txt
Ready to focus
Working on: Landing page copy
Time for a short break
Break complete
```

Status style:

```css
font-size: 14px;
color: #6F6A64;
```

Small dot before status:

* Focus dot: `#F05A3C`
* Break dot: `#2FAE75`
* Audio dot not needed.

## 12.5 Duration Buttons

Focus mode:

```txt
15m Quick
25m Pomodoro
50m Deep Work
90m Long Flow
Custom
```

Short break:

```txt
3m
5m
10m
Custom
```

Long break:

```txt
10m
15m
30m
Custom
```

Button style:

```css
background: #FFFFFF;
border: 1px solid #EAE6DF;
border-radius: 14px;
min-width: 88px;
min-height: 56px;
```

Selected duration:

```css
background: linear-gradient(135deg, #F05A3C, #FF735C);
color: white;
border-color: transparent;
box-shadow: 0 12px 26px rgba(240, 90, 60, 0.22);
```

For break selected duration, use green gradient:

```css
background: linear-gradient(135deg, #2FAE75, #46C98D);
```

## 12.6 Primary Button

Focus idle:

```txt
Start Focusing
```

Break idle:

```txt
Start Break
```

Running:

```txt
Pause
End Session
```

Button hierarchy:

* primary = Start / Resume
* secondary = Pause
* danger/outline = End Session

Primary style:

```css
height: 56px;
border-radius: 16px;
background: linear-gradient(135deg, #F05A3C, #FF735C);
color: white;
font-weight: 700;
font-size: 16px;
```

Break primary:

```css
background: linear-gradient(135deg, #2FAE75, #46C98D);
```

---

# 13. Active Focus State

Saat timer running, workspace harus masuk “reduced UI”.

## 13.1 Show

```txt
Exit Focus / End
Current mode badge
Working on: [task]
Large timer
Pause / End
Audio summary
```

## 13.2 Hide / Collapse

* duration buttons,
* full task list,
* today stats,
* settings panel,
* detailed audio controls.

## 13.3 Layout

```txt
┌──────────────────────────────────────────┐
│ Exit Focus                         Audio │
│                                          │
│                  Focus                   │
│                                          │
│              Working on                  │
│         Write landing page copy          │
│                                          │
│                 18:42                    │
│                                          │
│          Stay focused. Progress.         │
│                                          │
│       Audio: Brown Noise · 20%           │
│                                          │
│          [ Pause ]   [ End ]             │
└──────────────────────────────────────────┘
```

Background may become slightly warmer:

```css
background:
  radial-gradient(circle at center, rgba(240,90,60,0.08), transparent 40%),
  #FAFAF7;
```

Do not make it dark.

---

# 14. Break State

## 14.1 Short Break

```txt
Short Break
05:00
Relax your eyes. Breathe.
[Start Break] / [Pause] [Skip Break]
```

## 14.2 Long Break

```txt
Long Break
15:00
Step away and recharge.
[Start Long Break] / [Pause] [Skip Break]
```

## 14.3 Visual

Use green accent.

Mode badge:

```css
background: #EAF8F1;
color: #2FAE75;
border: 1px solid #BFEBD5;
```

Audio area:

```txt
Focus audio is off during breaks
```

Do not show violet audio card prominently during breaks unless user manually expands audio.

---

# 15. Task Panel

Task list harus compact.

## 15.1 Collapsed State

```txt
Tasks (3)  ▾
```

Optional active task preview:

```txt
Current: Write landing page copy
```

## 15.2 Expanded State

```txt
○ Write landing page copy       2 sessions · 50m
○ Read 20 pages                 1 session · 25m
✓ Review notes                  3 sessions · 75m
```

## 15.3 Style

Panel:

```css
background: #FFFFFF;
border: 1px solid #EAE6DF;
border-radius: 20px;
padding: 16px;
```

Task rows:

```css
min-height: 48px;
border-bottom: 1px solid #F1ECE6;
```

Completed:

```css
text-decoration: line-through;
color: #8A817A;
```

Task metadata:

```css
font-size: 12px;
color: #8A817A;
```

Do not show too many controls per task by default.

Use `...` menu if needed.

---

# 16. Today Summary

Stats harus compact, bukan dashboard besar.

## 16.1 Desktop

Small card/strip:

```txt
Today: 1h 35m · 3 sessions · Streak 3 🔥
```

Optional second line:

```txt
This week: 4h 20m
```

## 16.2 Style

```css
background: #FFFFFF;
border: 1px solid #EAE6DF;
border-radius: 20px;
padding: 16px 20px;
font-size: 14px;
```

No chart in `/app`.

Charts belong in History.

---

# 17. Audio Summary

## 17.1 Default

```txt
Audio: Brown Noise · 20%        Change
```

Style:

```css
background: linear-gradient(135deg, #F7F4FF, #FFFFFF);
border: 1px solid #D8D2FF;
border-radius: 16px;
padding: 14px 16px;
color: #202124;
```

Icon block:

```css
width: 40px;
height: 40px;
border-radius: 12px;
background: #6C63FF;
color: white;
```

## 17.2 No Audio

```txt
Audio off      Choose
```

## 17.3 Break

```txt
Focus audio off during break
```

Use green/neutral styling, not violet.

## 17.4 Expanded AudioPanel

When user clicks Change:

* open collapsible panel/drawer,
* do not push timer out of primary view,
* mobile bottom sheet okay,
* do not use full-screen modal unless needed.

---

# 18. Settings Panel

Settings panel should feel clean and organized.

## 18.1 Desktop

Right drawer:

```css
width: 420px;
max-width: 100vw;
background: #FFFFFF;
border-left: 1px solid #EAE6DF;
box-shadow: -20px 0 60px rgba(31,24,16,0.08);
```

## 18.2 Mobile

Bottom sheet or full-height panel:

```css
height: min(90vh, 720px);
border-radius: 24px 24px 0 0;
```

## 18.3 Sections

```txt
Timer
Task
Sound
Theme
Notifications
```

Sidebar/tabs inside settings:

* active section uses coral soft background.
* labels readable.
* input size 16px minimum.

Do not make settings visually exciting. It should be quiet.

---

# 19. History Page Refresh

History can be more data-rich than workspace, but still clean.

## 19.1 Structure

```txt
History & Stats

[Today] [This Week] [Streak] [Top Audio]

All | Focus | Breaks | Abandoned

Session list
```

If current implementation still has All / Completed / Abandoned, it can remain. But visual labels for breaks must be clear.

## 19.2 Break Labels

Short Break:

```txt
☕ Short Break
```

Long Break:

```txt
🌿 Long Break
```

Use green badge.

## 19.3 Cards

Use same light surface:

```css
background: #FFFFFF;
border: 1px solid #EAE6DF;
border-radius: 20px;
```

---

# 20. Leaderboard Refresh

Leaderboard should look credible.

## 20.1 Header

```txt
Weekly Focus Leaderboard
Only completed focus sessions count.
```

## 20.2 Table

Columns:

```txt
Rank | Name | Focus Time | Sessions
```

Top 3:

* subtle medal icon,
* soft background,
* not too gamified.

## 20.3 Empty State

```txt
No leaderboard entries yet.
Complete a focus session and join the weekly leaderboard.
[Launch Workspace]
```

---

# 21. Public SEO Pages

Public pages should share the bright theme, but can be more informative.

## 21.1 Layout

```txt
Hero
Embedded tool
Short explanation
How it works
FAQ
Related tools
CTA
Footer
```

## 21.2 Hero

Use big heading, clear CTA, tool preview.

Example:

```txt
Free Pomodoro Timer
Boost focus with structured work and break cycles.

[Start Pomodoro] [Open Full Workspace]
```

## 21.3 Embedded Widgets

Make embedded timer/audio match app style:

* white surface,
* soft border,
* coral/violet accents,
* not dark.

## 21.4 Ads

Do not move ads near controls.

Ad slots remain in approved safe positions.

---

# 22. Consent Banner

Visual refresh only.

## 22.1 Style

```css
background: #FFFFFF;
border: 1px solid #EAE6DF;
box-shadow: 0 -8px 28px rgba(31,24,16,0.08);
border-radius: 16px;
```

Bottom bar, not modal.

Buttons:

* Accept = coral,
* Decline = outline neutral.

Do not show in `/app`.

---

# 23. Legal Pages

Legal pages should be readable and plain.

Use:

* max-width 760–860px,
* white card or plain content,
* good line-height,
* clear headings.

Do not over-style legal pages.

---

# 24. Responsive Breakpoints

Use approximate breakpoints:

```txt
mobile: < 640px
tablet: 640–1024px
desktop: > 1024px
wide: > 1280px
```

## 24.1 Mobile `/app`

Initial viewport must show:

```txt
mode
active task/input
timer
start button
```

Task list below.

Stats below.

Audio summary either visible or immediately below start button.

No horizontal overflow.

## 24.2 Desktop

Timer card centered.

Secondary panels below or side but visually lighter.

---

# 25. Accessibility

Maintain/improve:

* visible focus rings,
* aria-labels for icon buttons,
* aria-pressed for tabs,
* keyboard navigation,
* color contrast,
* 44px minimum touch targets,
* no text below 12px for critical UI,
* inputs at least 16px on mobile.

Focus ring:

```css
outline: 3px solid rgba(240, 90, 60, 0.35);
outline-offset: 2px;
```

---

# 26. Implementation Scope for LM1

## Components likely modified

```txt
globals.css
layout components
Header / Footer
FocusWorkspace
Timer
TimerControls
TimerModes / TimerPresets
TaskInput
TaskList
TaskItem
AudioSummary
AudioPanel
SettingsPanel
SessionRecap
History components
Leaderboard page/components
SEO shared components
AdSlot styling only
CookieConsentBanner styling only
```

## Do not modify logic-heavy files unless required

Avoid changing:

```txt
Supabase migrations
leaderboard RPC
supabaseSessionService logic
history aggregation logic
timer state machine logic
ads consent logic
SEO routes/content
```

If touched, explain why.

---

# 27. Execution Order

LM1 should execute in this order:

## Step 1 — Design tokens

* update global CSS variables,
* light theme colors,
* text colors,
* surfaces,
* buttons,
* focus rings.

## Step 2 — Core `/app` layout

* center timer,
* simplify workspace,
* compact task/stats,
* bright theme.

## Step 3 — Active focus mode

* reduce UI while running,
* current task visible,
* timer dominant,
* no distractions.

## Step 4 — Break mode visual

* green accent,
* break copy,
* audio off message.

## Step 5 — Task/audio/settings polish

* task list compact,
* audio summary compact,
* settings panel clean.

## Step 6 — History/leaderboard polish

* visual refresh only,
* no logic changes.

## Step 7 — Public page shared polish

* hero/tool cards,
* CTA consistency,
* no SEO content rewrite.

## Step 8 — Consent/ad/legal visual check

* styling only,
* do not alter logic.

## Step 9 — QA/build

* mobile,
* no overflow,
* functionality regression,
* build.

---

# 28. QA Checklist

LM1 must report:

## Visual QA

* `/app` pre-focus state looks minimal.
* Timer is dominant.
* Active focus state is reduced.
* Break state uses green accent.
* Task list is compact.
* Stats are not dashboard-heavy.
* Audio is secondary.

## Mobile QA

* 375px viewport no horizontal overflow.
* Timer visible on initial viewport.
* Start button visible on initial viewport.
* Settings panel works.
* Audio panel does not cover timer badly.
* Task list usable.

## Functional Regression

* start/pause/resume/end focus.
* short break flow.
* long break flow.
* quick durations.
* audio preview.
* focus audio.
* alarm.
* settings persist.
* history updates.
* leaderboard loads.
* ads/consent not in app.

## Public QA

* homepage loads.
* pomodoro page loads.
* frequency page loads.
* noise page loads.
* public widgets still work.
* ad placements still safe.
* no broken layout.

## Build

```bash
npm run build
```

Must pass.

---

# 29. Acceptance Criteria

Sprint 7C can close only if:

```txt
/app feels clearly less cluttered.
Timer is the dominant visual element.
Active focus state removes distractions.
Current task remains visible during focus.
Task list is accessible but not dominant.
Stats are compact and secondary.
Audio remains visible but secondary.
Break mode is visually clear.
Mobile user can start focus without scrolling.
Public pages look brighter and more polished.
Leaderboard remains credible.
No feature regression.
No backend change.
No ad/consent logic change.
No SEO route/content change.
npm run build passes.
```

---

# 30. Final Direction Summary

The correct direction is:

```txt
Bright minimal focus console.
```

Not:

```txt
Bright productivity dashboard.
```

Use the new warm light visual identity, but keep the `/app` workspace sparse, calm, and centered around the timer.

FocusFreq should feel like:

```txt
Open app.
Know what to do.
Start focus.
Stay focused.
Review progress later.
```

That is the UX we want LM1 to build.
