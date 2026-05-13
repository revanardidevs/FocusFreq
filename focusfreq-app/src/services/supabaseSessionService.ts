import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface SessionData {
  plannedMinutes: number;
  actualMinutes: number;
  status: 'completed' | 'abandoned';
  audioMode: string | null;
  audioDetail: string | null;
  startedAt: Date;
  endedAt: Date;
  isBreak?: boolean;
}

/**
 * Write a completed/abandoned session to Supabase.
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

  if (session.isBreak) {
    console.log('[FocusFreq] Skipping break session write to Supabase.');
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

/**
 * Fetch leaderboard data via the safe RPC.
 * Returns empty array if Supabase is not configured.
 */
export async function fetchWeeklyLeaderboard(limit: number = 50) {
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

    return data || [];
  } catch (err) {
    console.warn('[FocusFreq] Leaderboard fetch error:', err);
    return [];
  }
}
