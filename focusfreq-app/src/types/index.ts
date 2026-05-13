// ─── Enums ───────────────────────────────────────────

export enum TaskStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export enum SessionStatus {
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
}

export enum TimerState {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
}

export enum TimerType {
  QUICK_FOCUS = 'quick_focus',
  POMODORO = 'pomodoro',
  DEEP_WORK = 'deep_work',
  LONG_FLOW = 'long_flow',
  CUSTOM = 'custom',
}

export type SessionType = 'focus' | 'short_break' | 'long_break';

// Future Sprint 2 enums — defined now for schema readiness
export enum AudioMode {
  NONE = 'none',
  TONE = 'tone',
  BINAURAL = 'binaural',
  NOISE = 'noise',
}

export enum WaveformType {
  SINE = 'sine',
  SQUARE = 'square',
  TRIANGLE = 'triangle',
  SAWTOOTH = 'sawtooth',
}

export enum NoiseType {
  WHITE = 'white',
  PINK = 'pink',
  BROWN = 'brown',
}

// ─── Data Models ─────────────────────────────────────

export interface Guest {
  guestId: string;
  createdAt: string;
  lastSeenAt: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  isPublicProfile: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  userId: string | null;
  guestId: string | null;
  title: string;
  status: TaskStatus;
  totalFocusMinutes: number;
  completedSessions: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface FocusSession {
  id: string;
  userId: string | null;
  guestId: string | null;
  taskId: string | null;
  plannedDurationMinutes: number;
  actualDurationMinutes: number;
  completionPercent: number;
  status: SessionStatus;
  timerType: TimerType;
  startedAt: string;
  endedAt: string;
  countedForLeaderboard: boolean;

  sessionType: SessionType;
  isBreak?: boolean; // Derived optional helper

  // Audio/frequency fields — nullable, ready for Sprint 2
  frequencyHz: number | null;
  waveform: WaveformType | null;
  audioMode: AudioMode | null;
  noiseType: NoiseType | null;
  binauralLeftHz: number | null;
  binauralRightHz: number | null;
  volume: number | null;
}

export interface AudioSettings {
  mode: AudioMode;
  volume: number; // 0.0 to 1.0
  tone: {
    frequencyHz: number;
    waveform: WaveformType;
  };
  binaural: {
    baseHz: number;
    beatHz: number;
  };
  noise: {
    type: NoiseType;
  };
}

// ─── Input Types ─────────────────────────────────────

export interface CreateTaskInput {
  title: string;
}

export interface UpdateTaskInput {
  title?: string;
  status?: TaskStatus;
}

export interface CreateSessionInput {
  taskId: string | null;
  plannedDurationMinutes: number;
  timerType: TimerType;
  audioSettings?: AudioSettings | null;
  sessionType: SessionType;
  isBreak?: boolean;
}

// ─── Stats Types ─────────────────────────────────────

export interface HistoryStats {
  todayFocusMinutes: number;
  todayCompletedSessions: number;
  todayAbandonedSessions: number;
  weeklyFocusMinutes: number;
  weeklyCompletedSessions: number;
  currentStreak: number;
  mostUsedAudio: string | null;
}
