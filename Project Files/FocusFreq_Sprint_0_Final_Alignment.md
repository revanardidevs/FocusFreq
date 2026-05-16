# FocusFreq Sprint 0 Final Alignment Doc

## Purpose of This Document

This document aligns the product, business, technical, SEO, data, privacy, and execution direction before development begins.

LM1 should read this before writing major code.

The goal is not only to build a working Pomodoro app. The goal is to build FocusFreq in a way that gives it the best possible chance to reach the aggressive scenario:

- Large organic search traffic
- High repeat usage
- High pageviews per user
- Monetizable public pages
- Strong Google Ads potential
- Useful focus workflow
- Differentiated frequency-generator experience

FocusFreq must be built from the start as:

> An SEO-first focus utility platform with an interactive focus app.

Not as:

> A normal Pomodoro dashboard with SEO added later.

---

# 1. Project Identity

## Project Name

FocusFreq

## Product Type

SEO-first focus utility web app.

## Primary Monetization

Google Ads.

## Primary Growth Engine

Search traffic from indexable public utility pages, plus repeat visits from history, leaderboard, and public stats pages.

## Core Product Loop

```text
Task
-> Focus Session
-> Frequency/Sound
-> Session History
-> Leaderboard/Stats
-> Return Visit
```

## Product Positioning

Main positioning:

> FocusFreq is a focus timer and frequency generator that turns tasks into tracked focus sessions.

Short positioning:

> Turn tasks into focus sessions with custom frequencies.

---

# 2. Strategic Goal

The strategic goal is to maximize the probability of entering the aggressive growth scenario.

This means FocusFreq should not only be useful. It should also be discoverable, repeatable, and monetizable.

## Aggressive Scenario Requirements

To support the aggressive scenario, FocusFreq must have:

1. SEO-first architecture from the start
2. Indexable public utility pages
3. High-quality frequency/tone/noise tools
4. Task-based focus sessions
5. Session history and progress tracking
6. Public leaderboard and public frequency stats
7. Ad inventory on non-focus pages
8. No ads during active focus
9. Analytics from day one
10. Data structure that supports future scaling

## What Would Make Us Fail

FocusFreq is likely to fail if:

- It is built as a generic Pomodoro app
- SEO pages are added as an afterthought
- Frequency generator is too basic
- Session/frequency data is not saved properly
- Leaderboard exposes private data
- Ads interrupt active focus sessions
- Login is forced before users experience value
- Analytics are missing
- The app launches without indexable pages
- We add too many advanced features before validation

---

# 3. Final Product Direction

## FocusFreq Is

- A focus timer
- A Pomodoro/custom timer
- A task progression tool
- A frequency/tone generator
- A noise generator
- A personal session history tracker
- A global focus leaderboard
- A public frequency stats platform
- An SEO-driven utility website

## FocusFreq Is Not

- Not just another Pomodoro timer
- Not a medical or therapeutic tool
- Not a music streaming app
- Not a full project management app
- Not a social network
- Not a native mobile app for v1
- Not an AI productivity coach for v1
- Not a premium SaaS first product for v1

---

# 4. Business Model Alignment

## Primary Business Model

Google Ads-first.

This means FocusFreq needs many useful public pages that can receive search traffic and display ads without hurting the core focus experience.

## Secondary Future Model

Premium features may be considered later, but should not be the main v1 focus.

Possible future premium features:

- Advanced analytics
- CSV export
- Project/client tracking
- Saved custom frequency presets
- Advanced history
- Cloud sync improvements
- Integrations

For v1, do not prioritize payment, subscriptions, or premium gating.

---

# 5. Platform and Language Alignment

## Platform

Web-first.

Do not build a native mobile app for v1.

## Language

English-first.

Reason:

The aggressive Google Ads scenario requires global search traffic, especially from higher-RPM markets.

Indonesian localization can be considered later, but should not be the initial focus.

---

# 6. Technical Direction

## Recommended Stack

Recommended:

- Framework: Next.js
- UI: React + Tailwind
- Database: Supabase/Postgres
- Auth: Supabase Auth or Clerk
- Audio: Web Audio API
- Hosting: Vercel
- Analytics: PostHog, Plausible, or similar
- Ads: Google AdSense manual placements
- SEO: SSR/SSG pages, sitemap, metadata
- Consent: CMP-ready structure

The exact tools can be discussed if LM1 has a strong technical reason, but the architecture must support:

- SEO pages
- Interactive app
- Public leaderboard pages
- Public stats pages
- Audio engine
- Session tracking
- Guest users
- Optional logged-in users
- Future scaling

## Important Technical Requirement

FocusFreq must not be built as a pure SPA.

It needs indexable pages from the beginning.

---

# 7. Architecture Alignment

## Required Architecture Concept

FocusFreq should have two connected layers:

### 1. Public SEO Utility Layer

Examples:

- `/pomodoro-timer`
- `/focus-timer`
- `/study-timer`
- `/frequency-generator`
- `/tone-generator`
- `/binaural-beat-generator`
- `/frequency/40-hz`
- `/frequency/432-hz`
- `/frequency/528-hz`
- `/noise/brown-noise`
- `/noise/white-noise`
- `/noise/pink-noise`
- `/leaderboard`
- `/leaderboard/today`
- `/leaderboard/week`
- `/stats/most-listened-frequencies`

These pages should be:

- Indexable
- Fast
- Useful without login
- Internally linked
- Monetizable with ads where appropriate
- Not thin/duplicate pages

### 2. Interactive Focus App Layer

Main app route:

- `/app`

The app layer should include:

- Task creation
- Timer
- Frequency/sound selection
- Session completion
- History
- Progress tracking
- Optional login
- Leaderboard participation

## Critical Rule

The public SEO layer and the app layer must be connected.

Example:

A user landing on `/frequency/432-hz` should be able to:

1. Play the 432 Hz tone
2. Start a focus session with that frequency
3. Create/select a task
4. Complete the session
5. Save history
6. Join leaderboard or continue as guest

---

# 8. MVP Scope Alignment

## MVP Must Include

### Core App

- Guest mode
- Optional auth foundation
- Task/to-do system
- Timer
- Session saving
- Basic history
- Task progression
- Frequency generator
- Noise generator
- Basic binaural mode
- Completion recap
- Daily/weekly stats
- Leaderboard
- Public frequency stats
- SEO pages
- Analytics events
- Ad-ready non-focus pages
- Privacy/disclaimer pages before monetization

## MVP Should Not Include

- Native mobile app
- AI productivity coach
- Payment system
- Premium subscription
- Friends system
- Social feed
- Chat/focus rooms
- Team/class leaderboard
- Advanced visualizer
- Advanced frequency sweep
- Full project management
- Browser blocker
- Todoist/Notion integrations
- CSV export
- Complex anti-cheat
- Overly detailed analytics dashboard

---

# 9. UX Alignment

## Core UX Principle

The app should help users start focusing quickly.

The user should not have to configure too many things before starting.

## Ideal First-Use Flow

```text
Land on page
-> Choose or enter task
-> Choose timer duration
-> Choose frequency/sound
-> Start focus session
-> Complete session
-> See recap/history
```

## Guest-First Rule

Users should be able to use the core app without login.

Login should be encouraged only after value is demonstrated, for example:

- Save history across devices
- Join leaderboard
- Keep streaks
- Public profile

## Active Focus Screen Rule

The active focus screen must be clean.

It should prioritize:

- Timer
- Current task
- Audio controls
- Pause/stop
- Minimal distractions

It should not include:

- Ads
- Heavy leaderboard elements
- Blog content
- Popups
- Excessive settings

---

# 10. Frequency Generator Alignment

The frequency generator is a core differentiator.

It must be useful enough to compete with standalone tone generator tools.

## Required v1 Features

- Manual frequency input
- Frequency range: 1-20,000 Hz
- Sine wave
- Square wave
- Triangle wave
- Sawtooth wave
- Volume control
- White noise
- Pink noise
- Brown noise
- Basic binaural mode
- Preset frequencies
- Save audio settings to session history

## Required Presets

- 40 Hz
- 432 Hz
- 528 Hz
- 963 Hz
- 440 Hz
- 1000 Hz

## Audio Safety Rules

- Default volume should be low/moderate
- There must be a clear stop button
- Warn users to use comfortable volume
- Warn users that binaural mode works best with headphones
- Audio should start only after explicit user action

## Out of Scope for v1

- Advanced visualizer
- Frequency sweep
- Complex audio mixing
- User-created sound library
- Medical/scientific claims

---

# 11. Claims and Disclaimer Alignment

FocusFreq must avoid medical and pseudo-scientific claims.

## Allowed Wording

- Focus tone
- Ambient frequency
- Custom tone
- Personal focus sound
- Popular frequency
- Experiment with sounds that help you focus
- Most used by FocusFreq users

## Avoid Wording

- Heals
- Treats ADHD
- Repairs brain
- Guaranteed focus
- Cures anxiety
- Medical benefit
- Scientifically proven productivity frequency
- Brain optimization guarantee

## Required Disclaimer

Use this disclaimer or a similar version:

> FocusFreq provides customizable tones, noise, and focus timers for personal productivity and relaxation. It is not a medical tool and does not diagnose, treat, or cure any condition. Use comfortable volume levels and stop listening if you feel discomfort.

---

# 12. Task and Session Alignment

## Task System v1

Tasks should be simple.

Required:

- Create task
- Edit task
- Complete task
- Archive/delete task
- Link task to session
- Track task focus minutes
- Track task completed sessions

Do not build full project management yet.

## Session System v1

Sessions should store:

- Planned duration
- Actual duration
- Completion percent
- Status: completed or abandoned
- Task relation
- Frequency/audio metadata
- Started time
- Ended time
- Leaderboard validity

Completed and abandoned sessions must be tracked separately.

---

# 13. History and Progress Alignment

History is a retention feature.

## Required v1 History

- Today focus minutes
- Today completed sessions
- This week focus minutes
- This week completed sessions
- Session list
- Task progress
- Most-used frequency today
- Most-used frequency this week
- Completion recap after each session

## Goal of History

History should make the user feel:

- "I made progress."
- "I know what I focused on."
- "I can continue tomorrow."
- "I have personal focus data."

---

# 14. Leaderboard Alignment

Leaderboard is a growth and retention feature.

It should be simple in v1.

## Required Leaderboards

- Daily global focus leaderboard
- Weekly global focus leaderboard
- Top frequencies today
- Top frequencies this week

## Leaderboard Display Fields

Allowed:

- Display name
- Focus minutes
- Completed sessions
- Streak
- Most-used frequency
- Rank

Not allowed:

- Task title
- Email
- Private notes
- Exact private history
- Personal sensitive data

## Anti-Cheat v1 Rules

A session counts for leaderboard if:

- Minimum duration is 5 minutes
- At least 80% of planned timer is completed
- It does not exceed daily counted cap
- Session state is valid

Recommended daily cap:

- 12 counted focus hours per user per day

## Important Leaderboard Note

Do not overbuild leaderboard in v1.

Avoid for now:

- Friends leaderboard
- Country leaderboard
- Team/class leaderboard
- Chat
- Social feed
- Public task sharing

---

# 15. SEO Alignment

SEO is not optional.

It is part of the business model.

## Required SEO Principles

- Public pages must be indexable
- Pages should be useful without login
- Pages should include real tools, not just text
- Metadata is required
- Sitemap is required
- Robots.txt is required
- Internal linking is required
- Avoid thin programmatic pages

## Initial SEO Page Set

### Core Pages

- `/`
- `/app`
- `/pomodoro-timer`
- `/focus-timer`
- `/study-timer`
- `/deep-work-timer`
- `/task-timer`
- `/frequency-generator`
- `/tone-generator`
- `/binaural-beat-generator`
- `/noise-generator`

### Frequency Pages

- `/frequency/40-hz`
- `/frequency/432-hz`
- `/frequency/528-hz`
- `/frequency/963-hz`
- `/frequency/440-hz`
- `/frequency/1000-hz`

### Noise Pages

- `/noise/brown-noise`
- `/noise/white-noise`
- `/noise/pink-noise`
- `/noise/rain`
- `/noise/cafe`

### Leaderboard and Stats Pages

- `/leaderboard`
- `/leaderboard/today`
- `/leaderboard/week`
- `/leaderboard/frequencies`
- `/stats/most-listened-frequencies`

## Required SEO Page Elements

Each SEO page should include:

- Clear H1
- Meta title
- Meta description
- Usable tool/component
- Short explanation
- CTA to start focus session
- Related internal links
- FAQ
- Disclaimer if frequency/audio-related

---

# 16. Ads Alignment

Google Ads is the primary monetization method, but ads must not damage focus.

## Allowed Ad Areas

- Homepage
- SEO timer pages
- SEO frequency pages
- SEO noise pages
- Leaderboard pages
- Public stats pages
- Completion/recap page, lightly

## Disallowed Ad Areas

- Active focus session screen
- Frequency controls during active session
- Task editing area
- Login/settings
- Critical timer controls

## Ad Rules

- No ads during active focus
- No ads near critical timer buttons
- No misleading placements
- No accidental-click traps
- Avoid layout shift
- Prefer manual ad slots first

---

# 17. Privacy Alignment

Privacy must be handled from the beginning because FocusFreq has public leaderboard/stats.

## Public Data Allowed

- Display name
- Focus minutes
- Completed sessions
- Streak
- Most-used public frequency
- Rank

## Private Data

Never expose publicly:

- Task title
- Email
- Private notes
- Exact private history
- Abandoned session details
- Personal sensitive information

## Required Controls

- Public/private profile setting
- Anonymous leaderboard option if possible
- Basic privacy policy
- Basic cookie policy
- Terms page
- Audio/frequency disclaimer

---

# 18. Data Model Alignment

LM1 should build the data structure to support future leaderboard, history, and frequency stats.

## User / Guest

Required fields:

- User ID or guest ID
- Display name if public
- Public/private profile setting
- Created date

## Task

Required fields:

- Task ID
- User/guest ID
- Title
- Status
- Total focus minutes
- Completed sessions
- Created date
- Completed date

## Focus Session

Required fields:

- Session ID
- User/guest ID
- Task ID
- Planned duration
- Actual duration
- Completion percent
- Status: completed/abandoned
- Started time
- Ended time
- Frequency Hz
- Waveform
- Audio mode
- Noise type
- Binaural left Hz
- Binaural right Hz
- Counted for leaderboard or not

## Leaderboard Stats

Required fields:

- Date
- User ID
- Focus minutes
- Completed sessions
- Completed tasks
- Streak
- Most-used frequency
- Score/rank

## Frequency Stats

Required fields:

- Date
- Frequency Hz
- Play count
- Completed session count
- Total focus minutes

---

# 19. Analytics Alignment

Analytics must be implemented early.

Without analytics, we cannot optimize for the aggressive scenario.

## Required Events

- `page_view`
- `task_created`
- `task_completed`
- `session_started`
- `session_completed`
- `session_abandoned`
- `frequency_played`
- `frequency_changed`
- `noise_played`
- `binaural_started`
- `leaderboard_viewed`
- `history_viewed`
- `signup_started`
- `signup_completed`
- `ad_slot_rendered`
- `focus_recap_viewed`
- `returning_user_detected`

## Key Metrics

- Organic search impressions
- Organic clicks
- Pageviews
- Pageviews per user
- Visitor to session-start conversion
- Session-start to completion conversion
- Returning users
- Frequency usage rate
- Task usage rate
- Leaderboard views
- History views
- Ad RPM by page type
- Revenue per 1,000 pageviews

---

# 20. Sprint 0 Deliverables

Sprint 0 is complete when the following are approved:

1. Product direction
2. MVP scope
3. Out-of-scope list
4. Technical direction
5. Data model direction
6. SEO-first architecture rule
7. Ad placement rules
8. Frequency generator requirements
9. Leaderboard rules
10. Privacy rules
11. Sprint 1 brief

---

# 21. Acceptance Criteria for Sprint 0

Sprint 0 is complete when:

- LM1 understands that FocusFreq is SEO-first
- LM1 understands this is not a generic Pomodoro app
- LM1 understands Google Ads-first monetization
- LM1 understands no ads during active focus
- LM1 understands frequency generator is core MVP
- LM1 understands session/frequency data must be saved
- LM1 understands SEO pages must be supported architecturally
- LM1 understands guest-first usage
- LM1 understands privacy boundaries
- LM1 is ready to receive Sprint 1 Build Brief

---

# 22. Immediate Next Step After Sprint 0

After this alignment is approved, create the Sprint 1 LM1 Build Brief.

Sprint 1 should focus on foundation only:

- Project setup
- Routing
- Guest identity
- Optional auth foundation
- Database schema
- Task CRUD
- Timer engine
- Session creation
- Session completion
- Basic history
- SEO-ready structure

Do not build the full frequency engine or full leaderboard in Sprint 1 unless explicitly approved.

---

# 23. Final Warning for LM1

The most dangerous mistake is building FocusFreq as a normal app first and trying to add SEO later.

That would weaken the entire Google Ads-first strategy.

From the first sprint, the architecture must support:

- Public indexable pages
- Interactive app
- Session tracking
- Frequency stats
- Leaderboards
- Ads on non-focus pages
- Fast page performance

FocusFreq should be built as:

> An SEO-first utility platform with an interactive focus app.

Not:

> A Pomodoro dashboard with SEO added later.
