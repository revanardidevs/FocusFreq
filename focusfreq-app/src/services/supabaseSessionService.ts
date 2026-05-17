import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface SessionData {
  plannedMinutes: number;
  actualMinutes: number;
  status: 'completed' | 'abandoned';
  audioMode: string | null;
  audioDetail: string | null;
  startedAt: Date;
  endedAt: Date;
  sessionType: 'focus' | 'short_break' | 'long_break';
  taskTitle?: string | null;
}

/**
 * Write a completed/abandoned session to Supabase.
 * Records both focus and break sessions (daily_stats trigger only counts focus).
 * Silently skipped if Supabase is not configured.
 * Never throws — errors are logged to console.
 */
export async function writeSessionToSupabase(session: SessionData): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== 'undefined') {
      console.warn('[FocusFreq] Supabase not configured, skipping session write.');
    }
    return false;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.warn('[FocusFreq] No authenticated user, skipping session write.');
      return false;
    }

    // Rate limit check: max 50 sessions per day
    const today = new Date().toISOString().split('T')[0];
    const { count } = await supabase
      .from('sessions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', `${today}T00:00:00Z`);

    if (count !== null && count >= 50) {
      console.warn('[FocusFreq] Daily session limit reached (50).');
      return false;
    }

    const { error } = await supabase.from('sessions').insert({
      user_id: user.id,
      planned_minutes: session.plannedMinutes,
      actual_minutes: Math.round(session.actualMinutes * 100) / 100,
      status: session.status,
      audio_mode: session.audioMode,
      audio_detail: session.audioDetail,
      started_at: session.startedAt.toISOString(),
      ended_at: session.endedAt.toISOString(),
      session_type: session.sessionType,
      task_title: session.taskTitle || null,
    });

    if (error) {
      console.warn('[FocusFreq] Failed to write session to Supabase:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.warn('[FocusFreq] Session write error:', err);
    return false;
  }
}

/** Typed leaderboard entry matching the get_weekly_leaderboard RPC. */
export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  display_name: string;
  focus_minutes: number;
  completed_sessions: number;
}

/**
 * Fetch leaderboard data via the safe RPC.
 * Returns empty array if Supabase is not configured.
 */
export async function fetchWeeklyLeaderboard(limit: number = 50): Promise<LeaderboardEntry[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase.rpc('get_weekly_leaderboard', {
      limit_count: limit,
    });

    if (error) {
      console.warn('[FocusFreq] Leaderboard fetch failed:', error.message);
      return [];
    }

    return (data as LeaderboardEntry[]) || [];
  } catch (err) {
    console.warn('[FocusFreq] Leaderboard fetch error:', err);
    return [];
  }
}

/**
 * Get the current authenticated user's ID.
 * Returns null if not authenticated or Supabase not configured.
 */
export async function getCurrentUserId(): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  } catch {
    return null;
  }
}

/* ── D4: Community aggregate types ────────────────────── */

/** Aggregate-only: sound label + session count. No user-level data. */
export interface PopularSoundEntry {
  sound_label: string;
  sessions_count: number;
}

/** Aggregate-only: planned duration + session count. No user-level data. */
export interface PopularPomodoroEntry {
  duration_minutes: number;
  sessions_count: number;
}

/**
 * Fetch the most popular sounds this week (aggregate only).
 * Uses SECURITY DEFINER RPC — returns no user_id, task_title, or timestamps.
 */
export async function fetchPopularSounds(limit: number = 5): Promise<PopularSoundEntry[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase.rpc('get_weekly_popular_sounds', {
      limit_count: Math.min(limit, 10),
    });
    if (error) {
      console.warn('[FocusFreq] Popular sounds fetch failed:', error.message);
      return [];
    }
    return (data as PopularSoundEntry[]) || [];
  } catch (err) {
    console.warn('[FocusFreq] Popular sounds fetch error:', err);
    return [];
  }
}

/**
 * Fetch the most popular pomodoro durations this week (aggregate only).
 * Uses SECURITY DEFINER RPC — returns no user_id, task_title, or timestamps.
 */
export async function fetchPopularPomodoros(limit: number = 5): Promise<PopularPomodoroEntry[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase.rpc('get_weekly_popular_pomodoros', {
      limit_count: Math.min(limit, 10),
    });
    if (error) {
      console.warn('[FocusFreq] Popular pomodoros fetch failed:', error.message);
      return [];
    }
    return (data as PopularPomodoroEntry[]) || [];
  } catch (err) {
    console.warn('[FocusFreq] Popular pomodoros fetch error:', err);
    return [];
  }
}
