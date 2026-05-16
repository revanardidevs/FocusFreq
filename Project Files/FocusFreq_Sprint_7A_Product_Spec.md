# FocusFreq Sprint 7A Product Spec
## Pomodoro Cycle, Settings, Sound, Theme, Notifications, and Timer-First UI Polish

**Document type:** Product / Behavior Specification  
**Audience:** User, GPT product brain, LM1 developer  
**Status:** Draft for review before LM1 creates technical implementation plan  
**Important:** This is not a coding brief yet. LM1 should use this document to create a technical implementation plan before coding.

---

# 1. Purpose of Sprint 7A

FocusFreq already has the major product foundation:

- Focus workspace
- Task system
- Timer
- Frequency engine
- Noise and binaural audio
- Session history and progression
- SEO utility pages
- Leaderboard and backend
- Ads/compliance architecture

However, the app still needs a more complete Pomodoro cycle experience before public launch.

Sprint 7A adds the core session-cycle and settings behavior expected from a mature Pomodoro/focus app, while also polishing the UI into a calmer, timer-first experience.

The goal is:

> Make FocusFreq feel like a complete focus app, not just a single-session timer.

FocusFreq should become:

> A timer-first, frequency-aware Pomodoro workspace with task progression, breaks, history, and privacy-safe leaderboard support.

---

# 2. Product Principle

FocusFreq should be inspired by Pomofocus-like simplicity, but it must not become a Pomofocus clone.

FocusFreq's distinct identity is:

- Task-based focus sessions
- Frequency/tone/noise support
- Session history
- Focus progression
- SEO utility pages
- Global leaderboard
- Calm, minimal, audio-aware workspace

The UI and feature behavior should support this identity.

---

# 3. Sprint 7A Goal

By the end of Sprint 7A, a user should be able to:

1. Configure Pomodoro, short break, and long break durations.
2. Run a repeating Pomodoro cycle.
3. Automatically or manually move between focus sessions and breaks.
4. Hear a basic alarm when a session ends.
5. Configure alarm volume and repeat count.
6. Control basic focus sound volume.
7. Use basic task behavior settings.
8. Use a more polished, timer-first workspace UI.
9. Use FocusFreq comfortably on mobile.
10. Maintain all existing features without regression.

---

# 4. High-Level Scope

Sprint 7A includes:

- Pomodoro cycle modes
- Short break
- Long break
- Long break interval
- Auto-start options
- Basic alarm settings
- Focus sound setting polish
- Task behavior settings
- Basic theme/settings options
- Notification basics
- Timer-first UI polish

Sprint 7A does not include integrations, premium, AI, or social features.

---

# 5. Feature Priority

## P0 — Must Have

These are required for Sprint 7A completion.

### Timer Cycle

- Focus / Pomodoro mode
- Short Break mode
- Long Break mode
- Editable Pomodoro duration
- Editable Short Break duration
- Editable Long Break duration
- Long Break interval
- Auto Start Breaks toggle
- Auto Start Pomodoros toggle
- Correct next-session logic
- Clear mode indicator

### Session Rules

- Focus sessions count toward task progress.
- Focus sessions count toward leaderboard if valid.
- Break sessions do not count toward task progress.
- Break sessions do not count toward leaderboard.
- Break sessions can appear in local history, visually separated from focus sessions.
- Break sessions should not be sent to Supabase leaderboard aggregates as focus time.

### Alarm / Sound

- Basic alarm sound at session end.
- Alarm volume.
- Alarm repeat count.
- Focus sound volume remains controllable.
- Breaks default to no focus audio.

### Settings

- Settings panel for timer/sound/task/theme/notification settings.
- Settings persist locally.
- Sensible defaults.
- Settings should not clutter the main workspace.

### UI Polish

- Timer-first layout.
- Active task remains visible.
- Task list compact.
- Audio controls secondary.
- Mobile layout optimized.
- Soft surfaces, not heavy glassmorphism.

---

## P1 — Should Have if Feasible

These are useful and may be included if they do not destabilize P0.

- Auto Check Tasks
- Check completed tasks to bottom
- Theme color presets
- Hour format: 12h / 24h
- Dark mode when running
- Browser notification toggle
- Reminder minutes
- Settings import/export not required, but settings should persist

---

## P2 — Defer Unless Extremely Easy

These are not required for Sprint 7A.

- Small window mode
- Mobile alarm / add this device
- Advanced alarm sound library
- Advanced focus sound library
- Advanced theme system
- Desktop PWA-specific notification behavior
- Complex reminder scheduling

---

## Explicitly Out of Scope

Do not build:

- Todoist integration
- Webhook integration
- Native mobile app
- Premium/ad-free tier
- AI productivity coach
- Friends/team leaderboard
- Social feed
- Comments/chat
- Advanced analytics dashboard
- Calendar integration
- Export CSV
- New backend leaderboard rules
- New ad logic
- Full CMP changes

---

# 6. Core Pomodoro Cycle Behavior

## 6.1 Session Modes

FocusFreq must support three timer modes:

```text
focus
short_break
long_break
```

User-facing labels:

- Focus
- Short Break
- Long Break

Alternative label allowed:

- Pomodoro instead of Focus in settings

Recommendation:

- Main workspace label: Focus
- Settings label: Pomodoro duration

---

## 6.2 Default Durations

Default settings:

```text
Pomodoro / Focus: 25 minutes
Short Break: 5 minutes
Long Break: 15 minutes
Long Break Interval: every 4 completed focus sessions
```

These defaults should be editable.

---

## 6.3 Duration Settings

Settings should include:

```text
Pomodoro: [25] minutes
Short Break: [5] minutes
Long Break: [15] minutes
Long Break Interval: [4] focus sessions
```

Validation:

- Pomodoro duration: 1–180 minutes
- Short Break duration: 1–60 minutes
- Long Break duration: 1–120 minutes
- Long Break interval: 2–12 focus sessions

Recommended UI:

- Numeric inputs
- Small labels
- No complex sliders required

---

## 6.4 Next Session Logic

After a completed Focus session:

```text
if completedFocusSessionsSinceLongBreak >= longBreakInterval:
    next mode = long_break
else:
    next mode = short_break
```

After a completed Short Break:

```text
next mode = focus
```

After a completed Long Break:

```text
reset completedFocusSessionsSinceLongBreak
next mode = focus
```

If the user abandons a focus session:

- Do not increment completed focus session count.
- Do not advance long break interval.
- Next suggested mode should remain focus unless user manually chooses break.

If the user abandons a break:

- Do not affect completed focus count.
- User can manually return to focus.

---

## 6.5 Manual Mode Switching

User should be able to manually switch between:

- Focus
- Short Break
- Long Break

Rules:

- If timer is idle, mode switch is allowed.
- If timer is running, switching mode should require confirmation or be disabled.
- Recommended MVP behavior: disable mode switching while running; allow after stop/reset.
- If timer is paused, changing mode should either:
  - remain disabled, or
  - ask confirmation and abandon current session.

Recommendation:

> Disable mode switching while running or paused. User must stop/reset first.

This is simpler and avoids accidental session corruption.

---

# 7. Auto-Start Behavior

## 7.1 Auto Start Breaks

Setting:

```text
Auto Start Breaks: on/off
Default: off
```

If enabled:

- After a completed Focus session, the appropriate break starts automatically.
- Alarm still plays.
- Short delay of 2–5 seconds is acceptable before auto-start.

If disabled:

- After focus completes, show a prompt:
  - Start Short Break
  - Start Long Break
  - Skip Break
  - Start Next Focus

---

## 7.2 Auto Start Pomodoros

Setting:

```text
Auto Start Pomodoros: on/off
Default: off
```

If enabled:

- After a completed break, the next Focus session starts automatically.
- Alarm still plays.
- Short delay of 2–5 seconds is acceptable.

If disabled:

- After break completes, show prompt:
  - Start Focus
  - Extend Break
  - End Cycle

---

## 7.3 Safety Rule

Auto-start should never surprise the user with loud audio.

Therefore:

- Alarm volume follows user setting.
- Focus audio should only start automatically if Auto Start Pomodoros is enabled.
- Breaks default to no focus audio.

---

# 8. Session Counting Rules

## 8.1 Focus Sessions

Completed focus sessions:

- count toward task progress,
- count toward local history focus stats,
- count toward backend leaderboard if valid,
- increment completedFocusSessionsSinceLongBreak,
- can affect streak,
- can affect most-used audio.

Abandoned focus sessions:

- appear in history as abandoned,
- do not count toward task progress,
- do not count toward leaderboard,
- do not increment Pomodoro count.

---

## 8.2 Break Sessions

Completed break sessions:

- may appear in local history,
- should be visually distinct,
- do not count toward task focused minutes,
- do not count toward leaderboard,
- do not affect focus streak,
- do not affect most-used focus audio.

Abandoned break sessions:

- may appear in local history as abandoned break,
- do not affect focus stats.

---

## 8.3 Leaderboard Rule

Leaderboard counts:

```text
completed focus sessions only
```

Leaderboard does not count:

```text
short_break
long_break
abandoned sessions
sub-5-minute focus sessions
```

Backend dual-write should avoid sending break sessions as focus leaderboard time.

If backend stores break sessions later, they must be clearly typed and excluded. For Sprint 7A, safest approach:

> Do not send break sessions to Supabase leaderboard persistence. Keep breaks local only.

---

# 9. Data Model Impact

## 9.1 Local Session Model

Add or ensure support for:

```text
sessionType: focus | short_break | long_break
cycleNumber?: number
pomodoroCountAtStart?: number
isBreak: boolean
```

If current model uses `timer_type`, update consistently or map safely.

Recommended field:

```typescript
sessionType: 'focus' | 'short_break' | 'long_break'
```

---

## 9.2 Settings Model

Create a local settings model:

```typescript
FocusFreqSettings {
  pomodoroMinutes: number
  shortBreakMinutes: number
  longBreakMinutes: number
  longBreakInterval: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean

  autoCheckTasks: boolean
  checkCompletedTasksToBottom: boolean

  alarmSound: string
  alarmVolume: number
  alarmRepeat: number

  focusSoundVolume: number

  themeColor: string
  hourFormat: '12h' | '24h'
  darkModeWhenRunning: boolean

  notificationsEnabled: boolean
  reminderMinutes: number
}
```

Sprint 7A can store this in localStorage.

Do not require backend settings yet.

---

## 9.3 Settings Storage

Settings should be persisted in:

```text
localStorage key: focusfreq_settings
```

Migration behavior:

- If no settings exist, use defaults.
- If older settings exist, merge with defaults.
- App should not crash on malformed settings.
- Invalid settings should be clamped to safe values.

---

# 10. Task Behavior Settings

## 10.1 Auto Check Tasks

Setting:

```text
Auto Check Tasks: on/off
Default: off
```

If enabled:

- When a focus session completes and the selected task has a target? 
- Problem: FocusFreq currently may not have task estimates or session targets.

Because no task target exists yet, full Auto Check behavior is ambiguous.

MVP interpretation:

> If enabled, completing a focus session does not automatically complete the task unless user explicitly confirms in recap.

Recommended Sprint 7A behavior:

- Add setting UI, but do not auto-complete task silently.
- In Session Recap, if Auto Check Tasks is on, show:
  - "Mark this task complete?"
  - Confirm button.

This avoids accidental task completion.

If this is too much, defer Auto Check Tasks to P1.

---

## 10.2 Check to Bottom

Setting:

```text
Check completed tasks to bottom: on/off
Default: on
```

If enabled:

- completed tasks appear below active tasks.

If disabled:

- tasks remain in original order.

This is simple and useful.

---

# 11. Alarm & Sound Settings

## 11.1 Alarm Sound

Sprint 7A should include basic alarm sound.

Options:

```text
Soft Bell
Digital Beep
None
```

Default:

```text
Soft Bell
```

If no audio assets exist, generate simple Web Audio beeps.

Avoid adding large audio files unless necessary.

---

## 11.2 Alarm Volume

Setting:

```text
Alarm Volume: 0–100
Default: 50
```

Actual engine volume:

```text
volume = alarmVolume / 100
```

---

## 11.3 Alarm Repeat

Setting:

```text
Alarm Repeat: 1–5
Default: 1
```

Behavior:

- Alarm plays repeat count times when session ends.
- Respect volume.
- If user starts next session quickly, stop alarm.

---

## 11.4 Focus Sound Volume

FocusFreq already has audio volume in AudioPanel.

Sprint 7A should ensure:

- Focus sound volume is clear.
- It persists with settings or audio preferences.
- It does not conflict with alarm volume.

Do not merge alarm volume and focus sound volume.

---

# 12. Theme Settings

## 12.1 Color Themes

Sprint 7A can add basic theme color presets if feasible.

Recommended presets:

```text
Slate
Forest
Ocean
Rose
Amber
```

Default:

```text
Slate
```

Rules:

- Theme should affect accent color, buttons, highlights.
- Theme should not break readability.
- Theme should not radically change layout.

---

## 12.2 Dark Mode When Running

Setting:

```text
Dark mode when running: on/off
Default: off or on depending current UI
```

Since FocusFreq already leans dark, this may be less relevant.

Recommended MVP behavior:

- Keep dark UI as default.
- If setting exists, it can subtly dim secondary UI when timer is running.

Do not build a full light/dark theme system in Sprint 7A unless it is already easy.

---

## 12.3 Hour Format

Setting:

```text
Hour Format: 12h | 24h
Default: 24h
```

Affects timestamps in history, if timestamps are shown.

Do not overbuild.

---

# 13. Notifications & Reminders

## 13.1 Browser Notifications

Setting:

```text
Notifications: on/off
Default: off
```

Behavior:

- User must explicitly enable notifications.
- Browser permission requested only when user toggles on.
- Notification can be shown when session ends if browser allows it.

Example notification:

```text
Focus session complete. Time for a short break.
```

For breaks:

```text
Break complete. Ready for your next focus session?
```

---

## 13.2 Reminder Minutes

Setting:

```text
Reminder: [0] minutes
Default: 0
```

Interpretation for Sprint 7A:

- 0 = off.
- If >0, user can receive a reminder after being idle between sessions.
- This is more complex than basic end notification.

Recommended:

> Include the setting UI as P1, but actual reminder scheduling can be deferred unless simple.

Avoid background scheduling complexity.

---

## 13.3 Mobile Alarm / Add Device

This is complex on web.

Do not build device registration.

Do not build mobile alarm device support.

Browser audio alarm and notification permission are enough for MVP.

---

# 14. Small Window

Small Window mode is P2.

Why defer:

- Browser popout/window behavior can be inconsistent.
- It may conflict with mobile.
- It is not required for launch.
- It can distract from UI polish.

Do not build in Sprint 7A unless it is extremely trivial and does not risk regressions.

---

# 15. UI Polish Requirements

## 15.1 App Workspace

The workspace should be redesigned around timer-first hierarchy.

Priority order on screen:

```text
1. Current mode: Focus / Short Break / Long Break
2. Active task
3. Large digital timer
4. Primary action button
5. Audio summary
6. Compact task list
7. Compact stats
8. Settings access
```

The timer should feel like the center.

---

## 15.2 Active Focus Mode

When timer is running:

- Timer remains large.
- Current task remains visible.
- Full task list may collapse or move lower.
- Audio summary remains visible.
- Full audio panel should not dominate.
- Settings should be accessible but not distracting.

Do not hide current task.

---

## 15.3 Break Mode UI

Break mode should feel different but consistent.

Possible visual differences:

- Slightly softer accent color.
- Label clearly says Short Break or Long Break.
- CTA says Start Break / Pause Break / End Break.
- Audio summary should show "No focus audio during break" or be minimized.

Do not make break mode look like a totally different app.

---

## 15.4 Settings Panel

Settings should be accessible from a gear/settings button.

Preferred UX:

- Right side drawer on desktop, or centered panel.
- Bottom sheet / collapsible panel on mobile.
- Group settings into sections:
  - Timer
  - Task
  - Sound
  - Theme
  - Notifications

Do not show all settings in the main workspace by default.

---

## 15.5 Public Pages

Public SEO pages should inherit improved design language:

- cleaner typography,
- better spacing,
- more premium embedded widgets,
- CTA consistency,
- no excessive borders.

Do not rewrite all SEO content.

---

## 15.6 Leaderboard

Leaderboard polish:

- Top 3 ranks visually distinct.
- Empty state motivating.
- Join leaderboard CTA clear.
- Table mobile-readable.

No rule changes.

---

# 16. Audio Behavior Rules

## 16.1 Focus Mode

During focus sessions:

- selected focus audio can play,
- frequency/noise/binaural settings apply,
- audio metadata saved as before,
- focus audio stops on pause/stop/complete.

---

## 16.2 Break Mode

During short/long breaks:

- focus audio is off by default,
- alarm still works at end,
- no audio metadata should count toward focus stats,
- user can manually play preview audio if UI allows, but it should not be treated as focus audio.

Recommended:

> Do not play focus audio automatically during breaks.

---

## 16.3 Alarm vs Focus Audio

Alarm and focus audio must be separate systems.

- Alarm plays at session end.
- Focus audio plays during focus session.
- Alarm should not be saved as session audio.
- Alarm should stop if next session starts.

---

# 17. Backend / Supabase Rules

Sprint 7A should not change backend schema unless absolutely necessary.

Rules:

- Focus sessions continue dual-write as before.
- Break sessions should not be written as leaderboard focus time.
- If break sessions are written to local history only, that is acceptable.
- Do not send task names to backend.
- Do not send break minutes to leaderboard.
- Do not change RLS.
- Do not change leaderboard RPC.
- Do not change anti-cheat caps.

If LM1 believes backend changes are necessary, they must be proposed before coding.

---

# 18. Ads / Consent Rules

Sprint 7A should not change ads/compliance logic.

Rules:

- No ads in `/app`.
- No consent banner in `/app`.
- Public page ad placement rules remain unchanged.
- UI polish must not move ads near controls.
- Legal links remain visible.

---

# 19. Settings Defaults

Default settings:

```json
{
  "pomodoroMinutes": 25,
  "shortBreakMinutes": 5,
  "longBreakMinutes": 15,
  "longBreakInterval": 4,
  "autoStartBreaks": false,
  "autoStartPomodoros": false,

  "autoCheckTasks": false,
  "checkCompletedTasksToBottom": true,

  "alarmSound": "soft_bell",
  "alarmVolume": 50,
  "alarmRepeat": 1,

  "focusSoundVolume": 20,

  "themeColor": "slate",
  "hourFormat": "24h",
  "darkModeWhenRunning": false,

  "notificationsEnabled": false,
  "reminderMinutes": 0
}
```

---

# 20. Acceptance Criteria

Sprint 7A is complete when:

## Timer Cycle

- User can select Focus, Short Break, and Long Break modes.
- User can edit Pomodoro, short break, and long break durations.
- User can edit long break interval.
- After completed focus sessions, the correct break type is suggested.
- After long break, cycle resets correctly.
- Abandoned focus sessions do not advance the cycle.
- Break sessions do not count toward task progress.
- Break sessions do not count toward leaderboard.

## Auto Start

- Auto Start Breaks setting exists and defaults off.
- Auto Start Pomodoros setting exists and defaults off.
- Auto-start behavior works only when enabled.
- Auto-start never surprises user with loud audio.

## Settings

- Settings panel exists.
- Settings persist locally.
- Malformed/missing settings fall back to defaults.
- Timer, task, sound, theme, and notification sections exist.
- Settings do not clutter the main workspace.

## Sound / Alarm

- Alarm plays at session end.
- Alarm volume works.
- Alarm repeat works.
- Alarm can be set to None.
- Focus sound volume remains separate from alarm volume.
- Breaks default to no focus audio.

## Task Behavior

- Auto Check Tasks setting exists or is explicitly deferred.
- Check completed tasks to bottom works if included.
- Task progress only increases from completed focus sessions.

## Notifications

- Notification toggle exists if included.
- Browser permission is requested only when user enables notifications.
- No notification permission request appears on page load.

## UI Polish

- Timer is the visual center of `/app`.
- Current active task remains visible during focus.
- Full task list may collapse but current task is never hidden.
- Audio controls are accessible but secondary.
- Mobile shows timer and main controls in initial viewport.
- Public pages look more polished.
- Leaderboard looks clean and credible.
- Soft surfaces are used instead of heavy glassmorphism.

## Regression

- Existing timer logic still works.
- Existing audio generation still works.
- Existing session history still works.
- Existing leaderboard still works.
- Existing ads/consent rules remain intact.
- No ads or consent banner appear in `/app`.
- `npm run build` passes.

---

# 21. QA Checklist

LM1 should QA:

## Timer Cycle QA

- Complete 1 focus session → short break suggested.
- Complete 4 focus sessions → long break suggested.
- Complete long break → focus cycle resets.
- Abandon focus session → cycle does not advance.
- Abandon break → focus stats unchanged.

## Settings QA

- Change Pomodoro duration → timer uses new duration.
- Change short break duration → break uses new duration.
- Change long break duration → long break uses new duration.
- Change long break interval → cycle follows new interval.
- Refresh browser → settings persist.
- Corrupt settings localStorage → app recovers defaults.

## Auto Start QA

- Auto Start Breaks off → user must click to start break.
- Auto Start Breaks on → break starts automatically.
- Auto Start Pomodoros off → user must click to start focus after break.
- Auto Start Pomodoros on → focus starts automatically after break.

## Sound QA

- Alarm plays at session end.
- Alarm volume changes loudness.
- Repeat count works.
- Alarm None produces no sound.
- Focus audio plays during focus.
- Focus audio does not automatically play during break.

## Data QA

- Focus session updates task progress.
- Short break does not update task progress.
- Long break does not update task progress.
- Focus session eligible for leaderboard as before.
- Break sessions do not write leaderboard time.

## UI QA

- Desktop `/app` timer is central.
- Mobile `/app` timer visible on load.
- Audio panel does not cover timer.
- Settings panel usable on mobile.
- Task list compact.
- Public pages still usable.
- Leaderboard still usable.

## Regression QA

- Supabase still works.
- Leaderboard still loads.
- Ads not in app.
- Consent banner not in app.
- Build passes.

---

# 22. Instructions for LM1

LM1 should not start coding immediately.

First, LM1 should produce a technical implementation plan based on this product spec.

Technical plan should include:

1. Files/components to create or modify.
2. Timer state machine changes.
3. Settings service/storage design.
4. Session type model changes.
5. Alarm implementation details.
6. Notification implementation approach.
7. UI refactor approach.
8. Backend impact assessment.
9. Migration strategy for existing localStorage sessions/settings.
10. QA plan.

LM1 should explicitly flag:

- any required backend changes,
- any risky UI refactors,
- any feature that should be moved from P0 to P1,
- any dependency recommendation.

Do not code until the technical implementation plan is reviewed and approved.

---

# 23. Final Strategic Note

Sprint 7A is important because users arriving from Pomodoro-related SEO pages expect a complete Pomodoro cycle experience.

If FocusFreq lacks short breaks, long breaks, and basic timer settings, it may feel immature compared with established Pomodoro apps.

However, FocusFreq must not become a cluttered clone.

The correct direction is:

> Pomodoro cycle completeness + FocusFreq's unique frequency/audio identity + calm timer-first UI.

