# FocusFreq UI + Below-Timer Content Execution Plan for LM1

## Status
This is an execution plan for LM1.

## Objective
We want to revise the FocusFreq UI direction and add a Pomofocus-style educational/content section below the timer/home screen.

The goal is not to add new product logic. The goal is to improve the presentation, UX, SEO value, and user understanding of FocusFreq.

This plan covers:

1. UI structure direction for the main Focus/Home screen.
2. Placement and behavior of the section below the timer.
3. Copy/content to add below the timer.
4. Technical implementation guidance.
5. What must not be changed.
6. QA requirements.

---

# 1. Product Context

FocusFreq is not only a Pomodoro timer.

FocusFreq combines:

- Pomodoro-style focus sessions
- Short Break and Long Break cycle
- Task tracking
- Focus audio tools
- Frequency/tone/noise generator
- Session history
- Weekly leaderboard
- SEO utility pages
- Ads/compliance-ready public pages

However, the main user experience should still feel simple.

The `/app` or main Focus page should help the user start focusing quickly.

The UI should feel:

- bright
- clean
- calm
- focused
- not dashboard-heavy
- not visually empty
- not overcomplicated

The content below the timer should work like Pomofocus: useful, readable, SEO-friendly, and educational.

---

# 2. Core UX Direction

## Main Principle

Focus-first, not dashboard-first.

The first screen should prioritize:

1. Current task or task input
2. Mode: Focus / Short Break / Long Break
3. Large timer
4. Start / Pause / End action
5. Audio summary
6. Quick duration buttons
7. Supporting task/progress panels
8. Educational content below the fold

The user should not feel overwhelmed before starting a session.

---

# 3. Main Screen UI Direction

## 3.1 Desktop Layout

The desktop layout should follow a structured focus console:

```text
Left Sidebar       Center Timer Console        Right Support Panel
```

### Left Sidebar

Contains:

- FocusFreq logo
- Navigation:
  - Focus
  - History
  - Leaderboard
- Settings button
- + New Task button
- small motivational/ready card if needed

Important:
- Sidebar is desktop-only.
- Do not show permanent sidebar on mobile.

### Center Timer Console

This is the main visual focus.

Contains:

1. Current task or task input
2. Mode tabs:
   - Focus
   - Short Break
   - Long Break
3. Large timer
4. Status text
5. Progress bar
6. Quick duration buttons
7. Compact audio summary
8. Primary CTA button

Example structure:

```text
Working on
Landing page copy

[ Focus ] [ Short Break ] [ Long Break ]

25:00

Ready to focus

[15m Quick] [25m Pomodoro] [50m Deep Work] [90m Long Flow]

Audio: Brown Noise · 20%    Change

[ Start Focusing ]
```

### Right Support Panel

Contains compact supporting information only.

Do include:

- Today stats
- Compact task list
- Need a break? static card

Do not include:

- large charts
- quote cards
- top audio card
- weekly graphs
- analytics-heavy dashboard elements

Example:

```text
Today
1h 35m focus time
3 sessions
Streak 3

Tasks
○ Landing page copy
○ Read 20 pages
✓ Review notes

Need a break?
Short breaks help maintain focus.
```

---

# 4. Mobile Layout

Mobile must be single-column.

Do not show a permanent left sidebar.

Mobile priority:

```text
Current task / task input
Timer
Start button
Audio summary
Tasks collapsed
Today summary collapsed
```

Requirements:

- Timer visible without much scrolling.
- Start button easy to reach.
- No horizontal overflow.
- Task list and stats should be below the main timer.
- Settings panel must not trap scrolling.

---

# 5. Active Focus State

When the timer is running, reduce UI.

Show only:

- Current task or Free Focus
- Current mode
- Large timer
- Pause / End controls
- Compact audio summary

Hide or collapse:

- full task list
- right support panel
- duration buttons
- settings detail
- large stats
- educational content

Active focus should feel like a calm focus room.

---

# 6. Break State

Break mode should feel distinct but consistent.

Use green/teal accent for breaks.

Short Break copy example:

```text
Short Break
05:00
Relax your eyes. Breathe.
```

Long Break copy example:

```text
Long Break
15:00
Step away and recharge.
```

Audio behavior:

- Focus audio should be off by default during breaks.
- Show: `Focus audio is off during breaks`.
- Alarm still works.

---

# 7. Visual Style

## 7.1 Color Direction

Use warm light focus theme.

Recommended tokens:

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

--color-focus: #F05A3C;
--color-focus-hover: #E24A31;
--color-focus-soft: #FFF0EA;
--color-focus-border: #FFC9BA;

--color-break: #2FAE75;
--color-break-hover: #269764;
--color-break-soft: #EAF8F1;
--color-break-border: #BFEBD5;

--color-audio: #6C63FF;
--color-audio-hover: #5B54E8;
--color-audio-soft: #F1EEFF;
--color-audio-border: #D8D2FF;
```

## 7.2 Typography

Use Inter or existing app font.

Timer:

```css
font-size: clamp(64px, 10vw, 112px);
font-weight: 800;
letter-spacing: -0.06em;
line-height: 0.95;
```

If Inter 800 is not available, use 700.

Do not add a new font dependency unless absolutely necessary.

## 7.3 Shape and Surface

Use:

- rounded cards
- soft borders
- warm shadows
- no harsh dark surfaces

Recommended card:

```css
background: #FFFFFF;
border: 1px solid #EAE6DF;
border-radius: 24px;
box-shadow: 0 18px 50px rgba(31, 24, 16, 0.06);
```

---

# 8. Below-Timer / Below-Screen Content Section

## 8.1 Purpose

The section below the timer should work like Pomofocus:

- explain what FocusFreq is
- educate users about Pomodoro
- explain how to use the app
- highlight features
- support SEO
- increase trust

This section should be below the main focus/timer area, not inside the active focus mode.

It should be visible on the public/home or main timer landing experience, but it should not distract during active focus.

## 8.2 Placement

Place the section below the main timer/focus area.

Possible locations:

- Homepage `/`
- Public focus/timer page
- If `/app` is treated as workspace, keep this educational section outside active workspace or below the fold only.

Recommended:

- Put this section on the public home/timer landing page.
- Do not show it during active focus.
- If shown under `/app`, place it far below the main timer so it does not affect focus.

## 8.3 Layout

Use a clean content column.

Recommended width:

```css
max-width: 860px;
margin: 0 auto;
padding: 64px 24px;
```

On desktop, sections can be arranged as:

```text
Headline
What is FocusFreq?
What is the Pomodoro Technique?
How to use FocusFreq
Core Features
Focus Audio & Frequency Tools
Why use FocusFreq?
FAQ
```

Do not make it look like a dense blog wall.

Use:

- clear headings
- short paragraphs
- bullet lists
- enough spacing
- readable line height

---

# 9. Below-Timer Content Copy

Use the following copy.

## Main Headline

```text
An online focus timer with calming sound tools to help you stay productive
```

## What is FocusFreq?

```md
## What is FocusFreq?

FocusFreq is a web-based focus timer designed to help you work, study, write, code, or complete deep work sessions with fewer distractions. It combines a Pomodoro-style timer, task tracking, focus session history, and optional sound tools such as tones, noise, and binaural-style audio.

You can use FocusFreq directly in your browser without installing an app. Start a focus session, choose a task, optionally add background audio, and review your progress over time.
```

## What is the Pomodoro Technique?

```md
## What is the Pomodoro Technique?

The Pomodoro Technique is a time management method that breaks work into focused intervals followed by short breaks. A common cycle is 25 minutes of focused work followed by a 5-minute break, with a longer break after several focus sessions.

This structure can make large tasks feel easier to start, reduce mental fatigue, and create a steady rhythm for productive work.
```

## How to use FocusFreq

```md
## How to use FocusFreq

1. Add a task you want to focus on.
2. Choose a focus mode: Focus, Short Break, or Long Break.
3. Pick a timer duration, such as 25 minutes for a standard Pomodoro session.
4. Choose optional focus audio, such as brown noise, white noise, a tone, or binaural-style audio.
5. Start the timer and focus on one task until the session ends.
6. Take a short break when the timer finishes.
7. Repeat the cycle and track your progress in your session history.
```

## Core Features

```md
## Core Features

- **Pomodoro-style focus timer** — Use Focus, Short Break, and Long Break modes to build a steady work rhythm.
- **Task tracking** — Add tasks, select what you are working on, and track completed focus sessions.
- **Focus audio tools** — Use optional tones, noise, and binaural-style audio while you work.
- **Session history** — Review your completed sessions, abandoned sessions, break sessions, and daily progress.
- **Progress insights** — See your focus time, session count, streak, and most-used audio.
- **Custom settings** — Adjust focus duration, break duration, long break interval, alarm sound, volume, and auto-start behavior.
- **Weekly leaderboard** — Join the public focus leaderboard if you want extra motivation.
- **No login required to start** — Begin focusing quickly with a browser-based workspace.
```

## Focus Audio & Frequency Tools

```md
## Focus Audio & Frequency Tools

FocusFreq includes optional sound tools for users who prefer working with background audio. You can choose simple tones, white noise, pink noise, brown noise, or binaural-style left/right frequency settings.

These audio tools are intended for personal focus, relaxation, and background sound preference. FocusFreq does not make medical, healing, or therapeutic claims. Use a comfortable volume and stop listening if you feel discomfort.
```

## Why use FocusFreq?

```md
## Why use FocusFreq?

FocusFreq is built for people who want a simple timer, but also want more context around their work sessions. Instead of only counting down time, FocusFreq connects your timer with tasks, audio preferences, session history, and optional community motivation.

It is useful for studying, writing, coding, reading, planning, admin work, or any task that benefits from a clear start and finish.
```

## FAQ

```md
## Frequently Asked Questions

### Is FocusFreq free?

Yes. FocusFreq is designed as a free browser-based focus timer. Some pages may display ads, but ads are not shown during active focus sessions.

### Do I need an account?

No account is required to start using FocusFreq. You can create tasks, run focus sessions, and use the timer directly in your browser.

### Does FocusFreq work on mobile?

Yes. FocusFreq works on desktop and mobile browsers, so you can use it on your laptop, tablet, or phone.

### Can I use FocusFreq without sound?

Yes. Audio is completely optional. You can use FocusFreq as a simple Pomodoro timer with no sound.

### Are the frequencies medical or therapeutic?

No. FocusFreq does not diagnose, treat, cure, or prevent any medical condition. The audio tools are provided for personal productivity, relaxation, and background listening only.

### What counts toward the leaderboard?

Only completed focus sessions that meet the leaderboard rules count. Breaks, abandoned sessions, and very short sessions do not count toward public leaderboard rankings.
```

---

# 10. Technical Below-Screen Implementation

## 10.1 Recommended Component

Create a reusable component:

```text
src/components/home/FocusFreqInfoSection.tsx
```

If LM1 believes the component belongs in `seo`, this is also acceptable:

```text
src/components/seo/FocusFreqInfoSection.tsx
```

Recommendation:

> Use `src/components/home/FocusFreqInfoSection.tsx` if this is mainly homepage content.

## 10.2 Component Responsibilities

This component should:

- render the content sections below the timer
- use semantic HTML
- use accessible headings
- not depend on app state
- not change timer logic
- not interact with Supabase
- not create client-side state unless needed

It should be server-renderable if possible.

## 10.3 Semantic HTML

Use:

```html
<section>
  <h2>...</h2>
  <article>
    <h3>...</h3>
    <p>...</p>
  </article>
</section>
```

Important:

- If the page already has an `h1`, use `h2` for section headings.
- Do not create multiple conflicting `h1`s.
- FAQ questions can be `h3`.

## 10.4 Styling

Suggested wrapper:

```tsx
<section className="mx-auto max-w-4xl px-6 py-16 text-text-primary">
  ...
</section>
```

Suggested card style:

```tsx
<div className="rounded-[24px] border border-[#EAE6DF] bg-white p-6 shadow-[0_18px_50px_rgba(31,24,16,0.06)]">
  ...
</div>
```

Suggested article spacing:

```tsx
<div className="space-y-10">
  ...
</div>
```

Suggested paragraph:

```tsx
<p className="mt-3 text-base leading-7 text-text-secondary">
```

Suggested list:

```tsx
<ul className="mt-4 space-y-3 text-text-secondary">
```

## 10.5 FAQ Markup

Use visible FAQ content.

Do not add FAQ schema unless already part of existing SEO architecture and accurate.

If adding structured data later, make sure it matches visible content exactly.

## 10.6 Internal Links

Add subtle internal links where useful:

- `/app`
- `/app/history`
- `/leaderboard`
- `/frequency-generator`
- `/noise-generator`
- `/pomodoro-timer`

Do not over-link.

Suggested CTA after content:

```text
Ready to focus?
Start a focus session with FocusFreq.
[Launch Workspace]
```

## 10.7 Ads Placement

Do not place ads too close to the timer or CTA.

If ads exist on public pages, keep existing safe ad placement rules.

Do not add new ad placements unless already approved.

## 10.8 Active App Workspace Warning

Do not show this long content inside active focus state.

If this section is on `/app`, hide it when timer is running.

Better:

- show it on public homepage/timer page
- not inside app workspace

---

# 11. Routing Recommendation

## Best Option

Use this educational section on:

```text
/
```

and possibly:

```text
/pomodoro-timer
```

Do not duplicate the full section on every SEO page.

For other SEO pages, use shorter page-specific content.

## If using on `/app`

Only show below the main workspace when idle and far below the fold.

Do not show during running/paused focus sessions.

---

# 12. Visual Relationship to Timer

The below-timer content should visually feel connected but clearly secondary.

Do:

- enough top margin
- lighter content card
- readable text
- clear headings

Do not:

- make it visually compete with the timer
- add large illustrations above the timer
- add excessive gradients
- add dashboard cards
- add autoplay media

---

# 13. Implementation Order

LM1 should execute in this order:

1. Confirm target page for below-timer section.
2. Create `FocusFreqInfoSection` component.
3. Add copy with semantic HTML.
4. Style section using warm light tokens.
5. Add CTA/link to workspace.
6. Verify no duplicate H1.
7. Verify mobile readability.
8. Verify public page layout does not break.
9. Run build.

---

# 14. QA Checklist

LM1 must verify:

## Content QA

- Copy appears correctly.
- No typo.
- No medical/healing claims.
- No duplicate H1.
- FAQ headings are readable.
- Lists render correctly.

## Layout QA

- Section appears below the timer/main hero.
- It does not push the timer out of initial viewport.
- Mobile content is readable.
- Spacing is comfortable.
- No horizontal overflow.

## SEO QA

- Page title still exists.
- Meta description still exists.
- Section uses semantic headings.
- Internal links work.
- No hidden/duplicated content.

## Functionality QA

- Timer still works.
- App workspace still works.
- Audio still works.
- Ads/consent logic unchanged.
- Build passes.

Run:

```bash
npm run build
```

---

# 15. Hard Restrictions

Do not:

- change timer logic
- change backend
- change leaderboard
- change ads/consent logic
- add new tracking
- add medical claims
- duplicate full content across all pages
- use fake claims like “proven to cure focus issues”
- add premium feature copy unless features exist

---

# 16. Final Desired Result

The page should feel like:

```text
At the top:
A focused, clean timer experience.

Below:
Helpful explanation and SEO-friendly content like Pomofocus, but original to FocusFreq.
```

The user should be able to:

1. immediately start a focus session,
2. scroll down to learn what FocusFreq is,
3. understand how to use it,
4. trust the app,
5. discover features like audio, history, and leaderboard.
