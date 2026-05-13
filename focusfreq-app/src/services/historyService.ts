/**
 * History Service — Aggregates session data for display.
 *
 * Provides today's stats, recent sessions, and filtered views.
 */

import { storage } from './storage';
import { isToday } from '@/lib/utils';
import { SessionStatus, AudioMode, type FocusSession, type HistoryStats } from '@/types';

function getAudioStringForAggregation(session: FocusSession): string | null {
  if (!session.audioMode || session.audioMode === AudioMode.NONE) return 'No audio';
  
  switch (session.audioMode) {
    case AudioMode.TONE:
      return `${session.frequencyHz} Hz Tone`;
    case AudioMode.NOISE:
      return `${session.noiseType ? session.noiseType.charAt(0).toUpperCase() + session.noiseType.slice(1) : ''} Noise`;
    case AudioMode.BINAURAL:
      return `${session.binauralLeftHz}/${session.binauralRightHz} Hz Binaural`;
    default:
      return null;
  }
}

export const historyService = {
  getHistoryStats(): HistoryStats {
    const sessions = storage.getSessions();
    const isFocus = (s: FocusSession) => !s.isBreak && s.sessionType !== 'short_break' && s.sessionType !== 'long_break';
    
    const focusSessions = sessions.filter(isFocus);
    const completedFocus = focusSessions.filter(s => s.status === SessionStatus.COMPLETED);
    
    const completedSessions = sessions.filter(s => s.status === SessionStatus.COMPLETED);
    const abandonedSessions = sessions.filter(s => s.status === SessionStatus.ABANDONED);

    const todaySessions = sessions.filter((s) => isToday(s.endedAt || s.startedAt));
    const completedToday = todaySessions.filter((s) => s.status === SessionStatus.COMPLETED);
    const abandonedToday = todaySessions.filter((s) => s.status === SessionStatus.ABANDONED);
    const todayFocusMinutes = completedToday.filter(isFocus).reduce((sum, s) => sum + s.actualDurationMinutes, 0);

    // Weekly Stats (last 7 days including today)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const completedWeekly = completedSessions.filter(s => new Date(s.endedAt || s.startedAt) >= sevenDaysAgo);
    const weeklyFocusMinutes = completedWeekly.filter(isFocus).reduce((sum, s) => sum + s.actualDurationMinutes, 0);

    // Current Streak (based on focus sessions only)
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Sort completed focus sessions descending
    const sortedCompleted = [...completedFocus].sort((a, b) => 
      new Date(b.endedAt || b.startedAt).getTime() - new Date(a.endedAt || a.startedAt).getTime()
    );

    if (sortedCompleted.length > 0) {
      let checkDate = new Date(today);
      
      // Check if we have a session today
      const hasSessionToday = sortedCompleted.some(s => {
        const d = new Date(s.endedAt || s.startedAt);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === checkDate.getTime();
      });

      if (!hasSessionToday) {
        // If no session today, streak might still be active from yesterday
        checkDate.setDate(checkDate.getDate() - 1);
        const hasSessionYesterday = sortedCompleted.some(s => {
          const d = new Date(s.endedAt || s.startedAt);
          d.setHours(0, 0, 0, 0);
          return d.getTime() === checkDate.getTime();
        });
        if (!hasSessionYesterday) {
          // Streak is 0
          checkDate = new Date(0); // break logic
        }
      }

      while (checkDate.getTime() > 0) {
        const hasSessionOnDate = sortedCompleted.some(s => {
          const d = new Date(s.endedAt || s.startedAt);
          d.setHours(0, 0, 0, 0);
          return d.getTime() === checkDate.getTime();
        });

        if (hasSessionOnDate) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Most-used Audio (based on focus sessions only)
    let mostUsedAudio: string | null = null;
    if (completedFocus.length > 0) {
      const audioCounts: Record<string, { count: number, lastUsed: number }> = {};
      
      completedFocus.forEach(s => {
        const audioStr = getAudioStringForAggregation(s);
        if (audioStr) {
          if (!audioCounts[audioStr]) {
            audioCounts[audioStr] = { count: 0, lastUsed: 0 };
          }
          audioCounts[audioStr].count++;
          const sessionTime = new Date(s.endedAt || s.startedAt).getTime();
          if (sessionTime > audioCounts[audioStr].lastUsed) {
            audioCounts[audioStr].lastUsed = sessionTime;
          }
        }
      });

      // Ignore "No audio" if there are other audios used
      const audioKeys = Object.keys(audioCounts);
      const hasOtherAudios = audioKeys.some(k => k !== 'No audio');
      if (hasOtherAudios) {
        delete audioCounts['No audio'];
      }

      const validKeys = Object.keys(audioCounts);
      if (validKeys.length > 0) {
        mostUsedAudio = validKeys.reduce((a, b) => {
          if (audioCounts[a].count === audioCounts[b].count) {
            return audioCounts[a].lastUsed > audioCounts[b].lastUsed ? a : b;
          }
          return audioCounts[a].count > audioCounts[b].count ? a : b;
        });
      }
    }

    return {
      todayFocusMinutes,
      todayCompletedSessions: completedToday.length,
      todayAbandonedSessions: abandonedToday.length,
      weeklyFocusMinutes,
      weeklyCompletedSessions: completedWeekly.length,
      currentStreak,
      mostUsedAudio
    };
  },

  getTaskStats(taskId: string) {
    const isFocus = (s: FocusSession) => !s.isBreak && s.sessionType !== 'short_break' && s.sessionType !== 'long_break';
    const sessions = storage.getSessions().filter(s => s.taskId === taskId && s.status === SessionStatus.COMPLETED && isFocus(s));
    const totalMinutes = sessions.reduce((sum, s) => sum + s.actualDurationMinutes, 0);
    return {
      completedSessions: sessions.length,
      totalFocusMinutes: totalMinutes,
    };
  },

  getTodaySessions(): FocusSession[] {
    return storage.getSessions().filter((s) => isToday(s.endedAt || s.startedAt));
  },

  getRecentSessions(limit: number = 20): FocusSession[] {
    return storage.getSessions().slice(0, limit);
  },

  getCompletedSessions(): FocusSession[] {
    return storage.getSessions().filter((s) => s.status === SessionStatus.COMPLETED);
  },

  getAbandonedSessions(): FocusSession[] {
    return storage.getSessions().filter((s) => s.status === SessionStatus.ABANDONED);
  },
};

