# FocusFreq Sprint 1 LM1 Build Brief

## 1. Purpose of Sprint 1

Sprint 1 is the foundation sprint.

The goal is not to build the full FocusFreq MVP yet. The goal is to build the correct technical and product foundation so future sprints can add frequency generation, history, SEO pages, leaderboard, ads, and analytics without needing a major rebuild.

FocusFreq must be treated as:

> An SEO-first utility platform with an interactive focus app.

Not:

> A generic Pomodoro dashboard.

Sprint 1 should create the base app structure, routing, data model, task system, timer system, session saving, and basic history.

---

# 2. Strategic Context for LM1

FocusFreq is a web-first, English-first, SEO-first focus utility app.

The main monetization model is Google Ads. Therefore, the architecture must support public indexable pages from the beginning.

FocusFreq combines:

- Focus/Pomodoro timer
- To-do/task progression
- Frequency generator
- Noise generator
- Session history
- Global leaderboard
- Public frequency stats
- SEO utility pages

However, Sprint 1 should only build the foundation.

Do not build the full frequency engine, full leaderboard, ads, or all SEO pages yet.

---

# 3. Sprint 1 Primary Goal

By the end of Sprint 1, a guest user should be able to:

1. Open the app
2. Create a task
3. Start a focus timer
4. Pause/resume the timer
5. Complete or abandon the session
6. Save the session
7. See the session in basic history
8. See task progress updated from completed sessions

This is the minimum foundation needed before adding frequency and leaderboard features.

---

# 4. Recommended Stack

Use this unless there is a strong technical reason to suggest another stack.

- Framework: Next.js
- UI: React + Tailwind
- Database: Supabase/Postgres
- Auth: Supabase Auth or Clerk, optional foundation only
- Audio: Web Audio API later, not required in Sprint 1
- Hosting target: Vercel
- Analytics target: PostHog, Plausible, or similar later
- Ads target: Google AdSense later
- SEO: SSR/SSG-friendly routing, metadata, sitemap later

Important:

Sprint 1 must not be built in a way that blocks SEO pages later.

Avoid a pure SPA-only architecture.

---

# 5. Sprint 1 Scope

## In Scope

Build the following:

### App Foundation

- Next.js project setup
- Basic responsive layout
- App shell
- Basic navigation
- Route structure
- SEO-ready architecture
- Placeholder public routes for future SEO pages if helpful

### Guest Mode

- Guest users can use the app without login
- Guest identity can be stored locally
- Guest session data can be stored locally or in DB depending on implementation choice
- Do not force login before first use

### Optional Auth Foundation

Auth can be scaffolded if simple, but do not overbuild it.

Possible auth-related work:

- Basic user model
- Login/register placeholder
- Auth provider setup
- Future-ready schema

Do not make auth block core usage.

### Task System

- Create task
- Edit task
- Complete task
- Archive/delete task
- Display active tasks
- Select task for focus session
- Track task focus minutes
- Track task completed sessions

### Timer System

- Start timer
- Pause timer
- Resume timer
- Stop/abandon timer
- Complete timer
- Preset durations
- Custom duration if simple

Required presets:

- Quick Focus: 15 minutes
- Classic Pomodoro: 25 minutes
- Deep Work: 50 minutes
- Long Flow: 90 minutes

### Session System

- Create session when timer starts
- Save completed session
- Save abandoned session
- Link session to selected task
- Store planned duration
- Store actual duration
- Store completion percentage
- Store start and end timestamps
- Store session status: completed or abandoned

### Basic History

- Show recent sessions
- Show completed sessions separately from abandoned sessions
- Show total focus minutes today
- Show completed sessions today
- Show basic task progress

### Data Model Foundation

Create database/schema structures that can later support:

- Frequency metadata
- Noise metadata
- Binaural settings
- Leaderboard
- Public stats
- User/guest identity
- Analytics events

Even if frequency is not built yet, the session model should have nullable fields ready for frequency/audio metadata.

---

# 6. Out of Scope for Sprint 1

Do not build these in Sprint 1 unless explicitly approved.

- Full frequency generator
- Web Audio API engine
- Noise generator
- Binaural beats
- Full SEO page set
- Full leaderboard
- Google Ads integration
- AdSense scripts
- Payment or subscription
- AI coach
- Friends system
- Team/class leaderboard
- Chat/focus rooms
- Public profiles
- Advanced analytics dashboard
- Full privacy/compliance pages
- Advanced charts
- CSV export
- Calendar integration
- Todoist/Notion integration
- Native mobile app
- Browser blocker
- Complex anti-cheat

Important:

Do not overbuild Sprint 1. The goal is a clean foundation.

---

# 7. Required Routes for Sprint 1

## Must Build

- `/`
- `/app`
- `/history` or `/app/history`
- `/tasks` or integrated task panel inside `/app`

## Recommended Placeholder Routes

These can be simple placeholders for now, but routing should not block them later.

- `/pomodoro-timer`
- `/focus-timer`
- `/study-timer`
- `/frequency-generator`
- `/tone-generator`
- `/leaderboard`

If creating placeholders slows down Sprint 1, prioritize architecture readiness over content.

## Route Principles

- Public SEO pages should be possible without login
- `/app` should be usable as guest
- Future SEO pages should be SSR/SSG-compatible
- Do not hide all product functionality behind authentication

---

# 8. Data Model Requirements

LM1 should design the schema carefully.

Sprint 1 should include or prepare the following models.

---

## 8.1 User

For logged-in users later.

Fields:

- `id`
- `email`
- `display_name`
- `avatar_url`
- `is_public_profile`
- `created_at`
- `updated_at`

Notes:

- `email` must never be shown publicly
- `display_name` may be used later for leaderboard
- `is_public_profile` controls public visibility later

---

## 8.2 Guest

For guest-first usage.

Fields:

- `guest_id`
- `created_at`
- `last_seen_at`

Implementation can be local-only or DB-backed.

Important:

Guest mode must work without login.

---

## 8.3 Task

Fields:

- `id`
- `user_id` nullable
- `guest_id` nullable
- `title`
- `status`: active / completed / archived
- `total_focus_minutes`
- `completed_sessions`
- `created_at`
- `updated_at`
- `completed_at` nullable

Rules:

- Task title is private
- Task title must never appear on public leaderboard
- A task can have many focus sessions

---

## 8.4 FocusSession

Fields:

- `id`
- `user_id` nullable
- `guest_id` nullable
- `task_id` nullable
- `planned_duration_minutes`
- `actual_duration_minutes`
- `completion_percent`
- `status`: completed / abandoned
- `timer_type`
- `started_at`
- `ended_at`
- `counted_for_leaderboard`

Frequency/audio fields should exist as nullable placeholders:

- `frequency_hz` nullable
- `waveform` nullable
- `audio_mode` nullable: tone / binaural / noise / none
- `noise_type` nullable
- `binaural_left_hz` nullable
- `binaural_right_hz` nullable

Reason:

Sprint 2 will add frequency engine. The session model should already be ready.

---

## 8.5 Future Leaderboard Fields

Do not need full leaderboard in Sprint 1, but schema should not block it.

Future leaderboard will need:

- valid focus minutes
- completed sessions
- streak
- most-used frequency
- score
- daily/weekly aggregation

---

# 9. Timer Rules for Sprint 1

## Timer States

The timer should support:

- idle
- running
- paused
- completed
- abandoned

## Completion Logic

A session is completed if the timer reaches the planned duration.

A session is abandoned if the user stops before completion.

For now, all completed sessions can be saved as completed. Leaderboard validity will be stricter later.

## Future Leaderboard Validity Placeholder

Add logic or field to support this later:

A session counts for leaderboard if:

- Minimum duration is 5 minutes
- At least 80% of planned timer is completed
- It does not exceed daily counted cap
- Session state is valid

In Sprint 1, it is enough to store `counted_for_leaderboard` as a boolean or compute-ready field.

---

# 10. Task Progression Rules

When a session is completed and linked to a task:

- Add actual focus minutes to task total
- Increment task completed session count
- Keep task active unless user marks it complete

When a session is abandoned:

- Save it as abandoned
- Do not increment completed session count
- Either do not add minutes to task total or clearly separate abandoned minutes from completed focus minutes

Recommendation:

Only completed sessions should count toward task progress in Sprint 1.

---

# 11. Basic History Requirements

History should show:

- Recent sessions
- Session status: completed or abandoned
- Task title if linked
- Planned duration
- Actual duration
- Started time
- Completed/abandoned time
- Total focus minutes today
- Completed sessions today

History should not need advanced charts in Sprint 1.

---

# 12. UI Requirements

Sprint 1 UI should be clean but not over-polished.

## Main App Screen

Should include:

- Task list
- Add task input
- Selected task
- Timer
- Preset duration buttons
- Start/pause/resume/stop controls
- Complete session behavior
- Basic today stats
- Recent history preview

## UX Requirements

- User should be able to start a focus session quickly
- Guest user should not be blocked
- Task creation should be simple
- Timer controls should be obvious
- Session completion should be clear
- No ads in Sprint 1

## Do Not Overdo UI

Do not spend too much time on:

- Complex animations
- Advanced dashboard
- Heavy charts
- Full design system
- Social UI
- Leaderboard UI

A simple, clean, functional UI is enough for Sprint 1.

---

# 13. SEO Architecture Requirements

Even though most SEO pages are not built in Sprint 1, the architecture must support them.

## Sprint 1 SEO Requirements

- Use Next.js routing suitable for public pages
- Keep `/app` separate from public SEO pages
- Do not force authentication on public routes
- Add basic metadata for `/` and `/app`
- Ensure future static/SSR pages can be added easily

## Optional Sprint 1 SEO Placeholders

Create simple placeholder pages if fast:

- `/pomodoro-timer`
- `/focus-timer`
- `/study-timer`
- `/frequency-generator`
- `/tone-generator`
- `/leaderboard`

Each can show a simple message like:

> This page will become a public FocusFreq utility page.

Do not spend too much time writing final SEO copy in Sprint 1.

---

# 14. Analytics Preparation

Full analytics implementation can be later, but Sprint 1 should prepare event structure.

If simple, implement basic event tracking abstraction.

Required future events:

- `page_view`
- `task_created`
- `task_completed`
- `session_started`
- `session_completed`
- `session_abandoned`
- `history_viewed`

Sprint 1 should at minimum make it easy to add these events later.

If analytics setup is easy, implement the core events now.

---

# 15. Privacy Requirements

Privacy must be respected from the beginning.

## Rules

- Task titles are private
- Email must never be public
- Guest usage must be possible
- Public leaderboard is not built yet, but future schema must not expose private data
- Do not collect unnecessary sensitive data

---

# 16. Performance Requirements

Sprint 1 does not need perfect optimization, but avoid bad foundations.

Required:

- App should load quickly
- Timer should not lag
- UI should work on desktop and mobile web
- Avoid unnecessary heavy libraries
- Keep architecture compatible with Core Web Vitals optimization later

---

# 17. Acceptance Criteria for Sprint 1

Sprint 1 is complete only if all of the following are true:

## App Foundation

- Next.js app is set up
- Basic layout exists
- `/` route exists
- `/app` route exists
- App is usable on desktop
- App is usable on mobile web at basic level

## Guest Mode

- User can use the app without login
- Guest identity or local persistence exists

## Task System

- User can create task
- User can edit task
- User can complete task
- User can archive/delete task
- User can select task for focus session

## Timer System

- User can start timer
- User can pause timer
- User can resume timer
- User can stop/abandon timer
- Timer can complete session
- Timer supports at least 15, 25, 50, and 90 minute presets

## Session System

- Starting timer creates or prepares a session
- Completed session is saved
- Abandoned session is saved
- Session links to selected task
- Session stores planned duration
- Session stores actual duration
- Session stores status
- Session stores timestamps
- Session has nullable audio/frequency fields ready for Sprint 2

## History

- User can see recent sessions
- User can see total focus minutes today
- User can see completed sessions today
- Completed and abandoned sessions are visually distinguishable

## SEO Readiness

- Architecture supports public SEO pages
- `/app` is not the only route
- Future SEO pages can be added easily
- No login wall on public routes

## Privacy

- Task titles are not public
- Email is not public
- No public leaderboard data is exposed yet

---

# 18. LM1 Reporting Format

After Sprint 1 work, LM1 should report using this format:

```md
## Completed
- ...

## Blocked
- ...

## Questions
- ...

## Tradeoffs / Suggestions
- ...

## Demo / Links
- ...

## Files / Areas Changed
- ...

## Risks Noticed
- ...
```

---

# 19. Questions LM1 Should Answer Before or During Sprint 1

LM1 should answer these:

1. Do you agree with Next.js for this project?
2. Do you recommend Supabase, Clerk, or another auth/data approach?
3. Should guest data be stored locally first or DB-backed from day one?
4. What is the cleanest schema for supporting both guest and logged-in users?
5. Are there any risks in the proposed session data model?
6. How will you keep the architecture SEO-ready?
7. What would you build first in Sprint 1?
8. What do you think may block Sprint 2 frequency engine integration?

---

# 20. Recommended Build Order Inside Sprint 1

LM1 should build in this order:

1. Project setup
2. Routing and layout
3. Data model/schema
4. Guest identity/local persistence
5. Task CRUD
6. Timer engine
7. Session save logic
8. Task progression update
9. Basic history
10. Basic responsive polish
11. SEO-ready route placeholders if time allows
12. Basic event tracking abstraction if time allows

---

# 21. Final Notes for LM1

Do not overbuild Sprint 1.

Do not add features outside the sprint unless approved.

Do not build the app in a way that makes SEO difficult later.

Do not force login before users can start a focus session.

Do not ignore session data structure, because future history, leaderboard, and frequency stats depend on it.

The most important Sprint 1 outcome is:

> A clean foundation where task-based focus sessions can be created, completed, saved, and viewed in history, with an architecture ready for SEO pages and future frequency/leaderboard features.
