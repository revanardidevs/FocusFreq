/**
 * FocusFreq Analytics — Event Tracking Abstraction
 *
 * Sprint 1: console-based logging only.
 * Future sprints: replace with PostHog, Plausible, or custom analytics.
 *
 * Components should call trackEvent() — never interact with analytics providers directly.
 */

// ─── Event Definitions ──────────────────────────────

export type AnalyticsEvent =
  | { name: 'page_view'; properties: { path: string } }
  | { name: 'task_created'; properties: { taskId: string } }
  | { name: 'task_completed'; properties: { taskId: string; totalMinutes: number } }
  | { name: 'session_started'; properties: { duration: number; taskExists: boolean; timerType: string } }
  | { name: 'session_completed'; properties: { duration: number; completionPercent: number; taskId: string | null } }
  | { name: 'session_abandoned'; properties: { duration: number; completionPercent: number; taskId: string | null } }
  | { name: 'history_viewed'; properties: Record<string, never> }
  | { name: 'frequency_played'; properties: { frequencyHz: number; waveform: string; audioMode: string } }
  | { name: 'noise_played'; properties: { noiseType: string } }
  | { name: 'binaural_started'; properties: { leftHz: number; rightHz: number } }
  | { name: 'leaderboard_viewed'; properties: { leaderboardType: string } }
  | { name: 'signup_started'; properties: Record<string, never> }
  | { name: 'signup_completed'; properties: Record<string, never> }
  | { name: 'returning_user_detected'; properties: Record<string, never> };

// ─── Track Event ─────────────────────────────────────

export function trackEvent(event: AnalyticsEvent): void {
  // Sprint 1: Console-based logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `%c[FocusFreq Analytics] ${event.name}`,
      'color: #6366f1; font-weight: bold;',
      event.properties,
    );
  }

  // Future implementation:
  // posthog.capture(event.name, event.properties);
  // plausible(event.name, { props: event.properties });
}
