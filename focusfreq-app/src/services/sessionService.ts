/**
 * Session Service — Manages focus session lifecycle.
 *
 * Handles creating, completing, and abandoning focus sessions.
 * Updates task progress on completion.
 */

import { storage } from './storage';
import { guestService } from './guestService';
import { taskService } from './taskService';
import { generateId, nowISO, calcCompletionPercent } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { LEADERBOARD } from '@/lib/constants';
import {
  SessionStatus,
  AudioMode,
  type FocusSession,
  type CreateSessionInput,
} from '@/types';

/**
 * Determine if a session qualifies for leaderboard counting.
 */
function isLeaderboardEligible(session: FocusSession): boolean {
  if (session.status !== SessionStatus.COMPLETED) return false;
  if (session.plannedDurationMinutes < LEADERBOARD.MIN_SESSION_DURATION_MINUTES) return false;
  if (session.completionPercent < LEADERBOARD.MIN_COMPLETION_PERCENT) return false;
  return true;
}

export const sessionService = {
  /**
   * Create a new focus session when the timer starts.
   */
  createSession(input: CreateSessionInput): FocusSession {
    const guestId = guestService.getGuestId();

    const session: FocusSession = {
      id: generateId(),
      userId: null,
      guestId,
      taskId: input.taskId,
      plannedDurationMinutes: input.plannedDurationMinutes,
      actualDurationMinutes: 0,
      completionPercent: 0,
      status: SessionStatus.COMPLETED, // will be updated on end
      timerType: input.timerType,
      startedAt: nowISO(),
      endedAt: '',
      countedForLeaderboard: false,
      sessionType: input.sessionType,
      isBreak: input.isBreak,

      // Audio fields — null for Sprint 1, updated for Sprint 2
      audioMode: input.audioSettings?.mode ?? AudioMode.NONE,
      frequencyHz: input.audioSettings?.mode === AudioMode.TONE ? input.audioSettings.tone.frequencyHz : null,
      waveform: input.audioSettings?.mode === AudioMode.TONE ? input.audioSettings.tone.waveform : null,
      noiseType: input.audioSettings?.mode === AudioMode.NOISE ? input.audioSettings.noise.type : null,
      binauralLeftHz: input.audioSettings?.mode === AudioMode.BINAURAL ? input.audioSettings.binaural.baseHz : null,
      binauralRightHz: input.audioSettings?.mode === AudioMode.BINAURAL ? (input.audioSettings.binaural.baseHz + input.audioSettings.binaural.beatHz) : null,
      volume: input.audioSettings?.mode !== AudioMode.NONE ? (input.audioSettings?.volume ?? 0.2) : null,
    };

    trackEvent({
      name: 'session_started',
      properties: {
        duration: input.plannedDurationMinutes,
        taskExists: input.taskId !== null,
        timerType: input.timerType,
      },
    });

    return session;
  },

  /**
   * Complete a session — timer ran to completion or user finished.
   * Updates task progress with focus minutes.
   */
  completeSession(session: FocusSession, actualMinutes: number): FocusSession {
    const completionPercent = calcCompletionPercent(
      session.plannedDurationMinutes,
      actualMinutes,
    );

    const completed: FocusSession = {
      ...session,
      actualDurationMinutes: actualMinutes,
      completionPercent,
      status: SessionStatus.COMPLETED,
      endedAt: nowISO(),
      countedForLeaderboard: false, // set after eligibility check
    };

    completed.countedForLeaderboard = isLeaderboardEligible(completed);

    // Save to storage
    const sessions = storage.getSessions();
    storage.setSessions([completed, ...sessions]);

    // Update task progress — only completed focus sessions count
    if (completed.taskId && !completed.isBreak && completed.sessionType !== 'short_break' && completed.sessionType !== 'long_break') {
      taskService.addFocusMinutes(completed.taskId, actualMinutes);
    }

    trackEvent({
      name: 'session_completed',
      properties: {
        duration: actualMinutes,
        completionPercent,
        taskId: completed.taskId,
      },
    });

    return completed;
  },

  /**
   * Abandon a session — user stopped before completion.
   * Does NOT update task progress.
   */
  abandonSession(session: FocusSession, actualMinutes: number): FocusSession {
    const completionPercent = calcCompletionPercent(
      session.plannedDurationMinutes,
      actualMinutes,
    );

    const abandoned: FocusSession = {
      ...session,
      actualDurationMinutes: actualMinutes,
      completionPercent,
      status: SessionStatus.ABANDONED,
      endedAt: nowISO(),
      countedForLeaderboard: false,
    };

    // Save to storage
    const sessions = storage.getSessions();
    storage.setSessions([abandoned, ...sessions]);

    trackEvent({
      name: 'session_abandoned',
      properties: {
        duration: actualMinutes,
        completionPercent,
        taskId: abandoned.taskId,
      },
    });

    return abandoned;
  },

  /**
   * Get a single session by ID.
   */
  getSession(id: string): FocusSession | null {
    return storage.getSessions().find((s) => s.id === id) ?? null;
  },

  /**
   * Get recent sessions, ordered newest first.
   */
  getRecentSessions(limit: number = 20): FocusSession[] {
    return storage.getSessions().slice(0, limit);
  },

  /**
   * Get all sessions.
   */
  getAllSessions(): FocusSession[] {
    return storage.getSessions();
  },
};
