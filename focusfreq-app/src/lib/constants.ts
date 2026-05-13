import { TimerType } from '@/types';

// ─── Timer Presets ───────────────────────────────────

export interface TimerPreset {
  type: TimerType;
  label: string;
  minutes: number;
  description: string;
}

export const TIMER_PRESETS: TimerPreset[] = [
  {
    type: TimerType.QUICK_FOCUS,
    label: 'Quick Focus',
    minutes: 15,
    description: 'A short burst of focused work',
  },
  {
    type: TimerType.POMODORO,
    label: 'Pomodoro',
    minutes: 25,
    description: 'Classic Pomodoro technique',
  },
  {
    type: TimerType.DEEP_WORK,
    label: 'Deep Work',
    minutes: 50,
    description: 'Extended deep focus session',
  },
  {
    type: TimerType.LONG_FLOW,
    label: 'Long Flow',
    minutes: 90,
    description: 'Maximum focus for complex tasks',
  },
];

// ─── Storage Keys ────────────────────────────────────

export const STORAGE_KEYS = {
  GUEST_ID: 'focusfreq_guest_id',
  TASKS: 'focusfreq_tasks',
  SESSIONS: 'focusfreq_sessions',
  GUEST: 'focusfreq_guest',
} as const;

// ─── App Constants ───────────────────────────────────

export const APP_NAME = 'FocusFreq';
export const APP_DESCRIPTION = 'Turn tasks into focus sessions with custom frequencies.';
export const APP_URL = 'https://focusfreq.com';

// ─── Leaderboard Constants (future use) ──────────────

export const LEADERBOARD = {
  MIN_SESSION_DURATION_MINUTES: 5,
  MIN_COMPLETION_PERCENT: 80,
  MAX_DAILY_COUNTED_HOURS: 12,
} as const;

// ─── Timer Constants ─────────────────────────────────

export const TIMER = {
  TICK_INTERVAL_MS: 1000,
  MIN_CUSTOM_MINUTES: 1,
  MAX_CUSTOM_MINUTES: 180,
} as const;
