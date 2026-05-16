# FocusFreq Master Roadmap v1

## 1. Project Summary

**Project name:** FocusFreq  
**Type:** SEO-first focus utility web app  
**Main monetization:** Google Ads  
**Main growth engine:** SEO pages + public leaderboard/stat pages  
**Core loop:** Task -> Focus Session -> Frequency/Sound -> History -> Leaderboard/Stats -> Return Visit

FocusFreq is not just a Pomodoro timer. It is a focus workspace that combines:

- Focus/Pomodoro timer
- To-do/task progression
- Frequency generator
- Noise generator
- Session history
- Global leaderboard
- Public frequency stats
- SEO utility pages

Main positioning:

> FocusFreq is a focus timer and frequency generator that turns tasks into tracked focus sessions.

Short positioning:

> Turn tasks into focus sessions with custom frequencies.

---

## 2. Strategic Direction

FocusFreq must be built as:

> An SEO-first utility platform with an interactive focus app.

Not as:

> A normal Pomodoro dashboard with extra features.

This distinction is important because the main business model is Google Ads. That means the app needs indexable, useful public pages that can rank on Google.

Examples of important SEO pages:

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

---

## 3. Non-Negotiable Rules

These rules should not be changed without approval.

### Product Rules

- Web-first.
- English-first.
- SEO-first.
- Google Ads-first.
- Guest mode required.
- Login should not block first use.
- Frequency generator is a core feature, not a bonus.
- Session history is a core feature.
- Leaderboard is part of MVP, but should stay simple.

### UX Rules

- No ads during active focus sessions.
- User must be able to start a focus session quickly.
- Task titles are private by default.
- Audio must have an obvious stop button.
- Default audio volume should be safe and comfortable.

### SEO Rules

- Core SEO pages must be indexable.
- SEO pages should provide real utility, not thin content.
- Each SEO page should include a usable tool or interactive element.
- Sitemap is required.
- Metadata is required.
- Internal linking is required.

### Data Rules

- Sessions must store task relation.
- Sessions must store frequency/audio metadata.
- Completed and abandoned sessions must be separate.
- Leaderboard should only count valid sessions.
- Frequency stats must be trackable.

### Compliance Rules

- No medical claims.
- No "healing frequency" claims.
- No "treats ADHD" claims.
- Audio/frequency disclaimer required.
- Privacy policy required before public monetization.
- Cookie policy required before public monetization.
- Terms page required before public monetization.

---

## 4. Development Roadmap

Recommended build order:

```text
Stage 0: Final Alignment
->
Stage 1: Foundation App
->
Stage 2: Frequency Engine
->
Stage 3: Task Progression & History
->
Stage 4: SEO Pages
->
Stage 5: Leaderboard & Public Stats
->
Stage 6: Ads & Compliance
->
Stage 7: Polish & Launch
->
Stage 8: Post-Launch Iteration
```

Important note:

SEO architecture must be considered from Stage 1, even if most SEO pages are built later.

Do not build the foundation in a way that makes SEO difficult later.

---

# Stage 0 - Final Alignment

## Goal

Lock the product direction before major development begins.

## Scope

Confirm:

- Product name: FocusFreq
- Web-first approach
- English-first approach
- SEO-first architecture
- Google Ads-first monetization
- MVP scope
- Out-of-scope features
- Ad placement rules
- Privacy rules
- Basic technical direction

## Deliverables

- Final alignment document
- Approved MVP direction
- Approved development stages
- Sprint 1 build brief

## Acceptance Criteria

Stage 0 is complete when:

- Product direction is approved
- MVP scope is approved
- Technical direction is approved
- LM1 has a clear Sprint 1 brief

---

# Stage 1 - Foundation App

## Goal

Build the basic working app foundation.

The user should be able to:

1. Create a task
2. Start a focus session
3. Complete the session
4. See the session saved in history

## Scope

- Project setup
- Routing
- Basic layout
- Guest mode
- Optional auth foundation
- Database setup
- Task CRUD
- Timer engine
- Session creation
- Session completion
- Basic history
- Basic app navigation

## Must-Have Features

- Create task
- Edit task
- Complete task
- Start timer
- Pause/resume timer
- Stop/abandon timer
- Complete session
- Save session
- Link session to selected task
- Show basic session history

## Out of Scope

Do not build these yet:

- Full frequency generator
- Full leaderboard
- Google Ads integration
- Payment system
- AI coach
- Social features
- Mobile native app
- Advanced analytics dashboard

## Deliverables

- `/app` workspace
- Task system
- Timer system
- Session saving
- Basic history view

## Acceptance Criteria

Stage 1 is complete when:

- User can create a task
- User can start a timer
- User can complete a timer session
- Session is saved
- Session is linked to a task if selected
- Basic history displays completed sessions
- Guest user can use the core app without login

## Key Risks

- Building the app as a pure SPA without SEO-ready architecture
- Not saving enough session data for future leaderboard/history
- Forcing login too early
- Overcomplicating task management

---

# Stage 2 - Frequency Engine

## Goal

Build the main differentiator: a usable frequency/tone/noise generator integrated into focus sessions.

## Scope

- Manual frequency input
- Waveform selection
- Volume control
- Preset frequencies
- Noise generator
- Basic binaural mode
- Audio state management
- Save audio settings to focus session

## Must-Have Features

- Frequency range: 1-20,000 Hz
- Sine wave
- Square wave
- Triangle wave
- Sawtooth wave
- White noise
- Pink noise
- Brown noise
- Volume control
- Basic binaural mode
- Presets:
  - 40 Hz
  - 432 Hz
  - 528 Hz
  - 963 Hz
  - 440 Hz
  - 1000 Hz

## Out of Scope

Do not build these yet:

- Advanced visualizer
- Frequency sweep
- Custom saved sound library
- Complex audio mixing
- Music streaming
- Medical/scientific claim features

## Deliverables

- Frequency generator component
- Noise generator component
- Binaural mode
- Frequency presets
- Audio settings saved to session history

## Acceptance Criteria

Stage 2 is complete when:

- User can play a custom frequency
- User can choose waveform
- User can adjust volume
- User can use white/pink/brown noise
- User can use basic binaural mode
- User can start a focus session with selected audio
- Completed session stores frequency/audio metadata

## Key Risks

- Browser autoplay restrictions
- Mobile browser audio issues
- Audio too loud by default
- Binaural mode confusing users
- Frequency generator being too weak compared to existing tools

## Technical Note

Audio should start only after explicit user interaction, such as clicking:

> Start Focus Session

---

# Stage 3 - Task Progression & History

## Goal

Make FocusFreq valuable after repeated use by showing progress, history, and personal patterns.

## Scope

- Daily stats
- Weekly stats
- Task progress
- Session history
- Most-used frequency
- Completed vs abandoned sessions
- Completion recap screen

## Must-Have Features

- Today's focus minutes
- Today's completed sessions
- This week's focus minutes
- Task-level focus minutes
- Task-level completed sessions
- Most-used frequency today
- Most-used frequency this week
- Session list
- Completion recap

## Out of Scope

Do not build these yet:

- Advanced charts
- Export CSV
- Calendar view
- Project/client tracking
- AI productivity insights
- Deep analytics dashboard

## Deliverables

- History page
- Task progress UI
- Recap screen
- Basic personal stats

## Acceptance Criteria

Stage 3 is complete when:

- User can see daily focus stats
- User can see weekly focus stats
- User can see most-used frequency
- User can see task progress
- User sees recap after completing session
- Abandoned sessions are tracked separately from completed sessions

## Key Risks

- History page feels boring
- Too many stats too early
- Not connecting frequency data to sessions
- Not creating enough reason for users to return

---

# Stage 4 - SEO Pages

## Goal

Build the traffic engine.

FocusFreq must have indexable utility pages that target search demand.

## Scope

Create SEO pages with real tool functionality.

## Priority Pages

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

### Leaderboard / Stat Pages

- `/leaderboard`
- `/leaderboard/today`
- `/leaderboard/week`
- `/leaderboard/frequencies`
- `/stats/most-listened-frequencies`

## Required Page Elements

Each SEO page should include:

- Clear H1
- Meta title
- Meta description
- Usable tool component
- Short explanation
- CTA to start focus session
- Internal links
- Related pages
- FAQ
- Disclaimer if frequency/audio-related

## Out of Scope

Do not build these yet:

- 500+ programmatic pages
- Long blog content calendar
- AI-generated thin pages
- Low-value duplicate pages

## Deliverables

- SEO page templates
- Initial SEO page set
- Sitemap
- Robots.txt
- Metadata
- Internal linking structure

## Acceptance Criteria

Stage 4 is complete when:

- Core SEO pages are indexable
- Each page has real functionality
- Sitemap exists
- Metadata exists
- Internal links exist
- Pages are not locked behind login
- Pages are fast enough for launch

## Key Risks

- Making pages too thin
- Building app first and SEO later
- Duplicate content
- Poor Core Web Vitals
- Weak internal linking

---

# Stage 5 - Leaderboard & Public Stats

## Goal

Create return visits, social proof, and additional monetizable pages.

## Scope

- Daily leaderboard
- Weekly leaderboard
- Top frequencies today
- Top frequencies this week
- User rank
- Basic anti-cheat rules
- Public/private profile rules

## Must-Have Leaderboard Types

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

## Anti-Cheat v1

A session counts for leaderboard if:

- Minimum duration is 5 minutes
- At least 80% of planned timer is completed
- It does not exceed daily counted cap
- Session state is valid

Recommended daily cap:

- 12 counted focus hours per user per day

## Out of Scope

Do not build these yet:

- Friends leaderboard
- Team leaderboard
- Country leaderboard
- Chat
- Public task sharing
- Complex anti-cheat
- Full moderation system

## Deliverables

- Leaderboard pages
- Frequency stats pages
- Valid session logic
- Public display rules
- Basic privacy controls

## Acceptance Criteria

Stage 5 is complete when:

- Daily leaderboard works
- Weekly leaderboard works
- Top frequencies page works
- Private task data is not exposed
- Invalid/abandoned sessions do not count
- User can appear anonymously or with display name

## Key Risks

- Fake focus time
- Privacy mistakes
- Leaderboard discourages new users
- Leaderboard becomes gimmicky
- Public pages have too little data early

---

# Stage 6 - Ads & Compliance

## Goal

Add monetization without damaging the focus experience.

## Scope

- Google AdSense-ready ad slots
- Ad placement rules
- Privacy policy
- Cookie policy
- Terms page
- Audio/frequency disclaimer
- Consent management readiness

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

## Deliverables

- Manual ad slots
- Privacy page
- Cookie page
- Terms page
- Disclaimer
- Consent-ready structure

## Acceptance Criteria

Stage 6 is complete when:

- Ads do not appear during active focus
- Ads do not create layout shift around important controls
- Ads are not misleadingly placed
- Privacy/cookie/terms pages exist
- Frequency/audio disclaimer exists

## Key Risks

- Ads hurt user trust
- Accidental click risk
- Ad layout shift
- AdSense rejection
- Privacy compliance gaps

---

# Stage 7 - Polish & Launch

## Goal

Prepare FocusFreq for public release, indexing, and user acquisition.

## Scope

- Bug fixing
- Mobile responsiveness
- Performance optimization
- SEO final check
- Analytics final check
- Error handling
- UX polish
- Launch checklist
- Initial content polish

## Launch Checklist

- App usable on desktop
- App usable on mobile web
- Timer works reliably
- Audio can start/stop reliably
- Sessions save correctly
- History works
- Leaderboard works
- SEO pages are indexable
- Sitemap works
- Robots.txt works
- Metadata exists
- Analytics events fire
- No ads in active focus mode
- Privacy/terms/disclaimer pages exist

## Out of Scope

Do not delay launch for:

- Perfect UI
- Native app
- Full content library
- Advanced monetization
- Premium plan
- Advanced social features

## Deliverables

- Launch-ready website
- Bug-fixed MVP
- Analytics installed
- SEO-ready pages
- AdSense-ready structure

## Acceptance Criteria

Stage 7 is complete when:

- FocusFreq is publicly usable
- Critical flows work
- No major blocking bugs remain
- Search engines can index pages
- Initial measurement system works

## Key Risks

- Launch delayed by perfectionism
- Too much polish before validation
- Missing analytics
- Weak mobile experience
- Broken audio on key browsers

---

# Stage 8 - Post-Launch Iteration

## Goal

Use real data to decide what to improve next.

Do not add big features blindly after launch.

## Primary Metrics

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

## 30-Day Target Metrics

- Visitor -> session started: above 15%
- Session started -> completed: above 45%
- Returning users 7-day: above 12%
- Pageviews/user: above 3
- Frequency usage per session: above 60%
- Indexed pages: 30-80
- Organic search impressions: visible and growing

## Iteration Rules

If traffic is weak:

- Improve SEO pages
- Expand keyword pages
- Improve internal linking
- Improve page titles/meta
- Add more useful tool pages

If activation is weak:

- Improve landing page CTA
- Reduce friction
- Make timer start faster
- Improve first-use flow

If completion is weak:

- Improve session UX
- Improve timer controls
- Add better default durations
- Reduce distractions

If retention is weak:

- Improve history
- Improve streaks
- Improve weekly recap
- Improve leaderboard motivation

If RPM is weak:

- Analyze RPM by page type
- Improve ad placement on non-focus pages
- Increase high-RPM traffic sources
- Improve content around higher-intent keywords

## Key Risk

Adding features before understanding the data.

---

# 5. High-Level Data Requirements

FocusFreq should track the following from the beginning.

## User / Guest

- User ID or guest ID
- Display name if public
- Public/private profile setting
- Created date

## Task

- Task ID
- User/guest ID
- Title
- Status
- Total focus minutes
- Completed sessions
- Created date
- Completed date

## Focus Session

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

- Date
- User ID
- Focus minutes
- Completed sessions
- Completed tasks
- Streak
- Most-used frequency
- Score/rank

## Frequency Stats

- Date
- Frequency Hz
- Play count
- Completed session count
- Total focus minutes

---

# 6. Suggested Tech Direction

Recommended stack:

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

Important:

The exact tech stack can be discussed, but the architecture must support:

- SEO pages
- Interactive app
- Public leaderboard pages
- Public stats pages
- Audio engine
- Session tracking
- Guest users
- Optional logged-in users

---

# 7. Team Workflow

## User

The user is the decision maker.

Responsibilities:

- Approve scope
- Approve major tradeoffs
- Decide if features move in/out
- Provide final direction when conflicts appear

## ChatGPT

ChatGPT acts as product/strategy brain.

Responsibilities:

- Define strategy
- Critique decisions
- Prioritize features
- Create briefs
- Review LM1's output
- Detect scope creep
- Detect strategic mistakes
- Keep project aligned with aggressive scenario

## LM1

LM1 is the developer.

Responsibilities:

- Build according to brief
- Report implementation status
- Raise technical blockers
- Suggest technical alternatives
- Avoid changing product direction without approval

---

# 8. LM1 Reporting Format

LM1 should report progress using this format:

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
```

---

# 9. Final Strategic Warning

The biggest risk is building FocusFreq as a normal app first and adding SEO later.

That would weaken the Google Ads-first strategy.

From the start, FocusFreq should be treated as:

> An SEO-first utility platform with an interactive focus app.

Not:

> A Pomodoro dashboard with SEO added later.
