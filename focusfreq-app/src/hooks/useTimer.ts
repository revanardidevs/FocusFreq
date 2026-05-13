'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { TimerState, TimerType, type CreateSessionInput, type FocusSession } from '@/types';
import { sessionService } from '@/services/sessionService';

interface UseTimerOptions {
  onComplete?: (session: FocusSession) => void;
  onAbandon?: (session: FocusSession) => void;
}

interface UseTimerReturn {
  timerState: TimerState;
  remainingSeconds: number;
  elapsedSeconds: number;
  plannedMinutes: number;
  timerType: TimerType;
  progress: number; // 0 to 1
  start: (minutes: number, timerType: TimerType, taskId: string | null, sessionType: any, isBreak: boolean, audioSettings?: any) => void;
  pause: () => void;
  resume: () => void;
  abandon: () => void;
  reset: () => void;
}

export function useTimer(options: UseTimerOptions = {}): UseTimerReturn {
  const [timerState, setTimerState] = useState<TimerState>(TimerState.IDLE);
  const [plannedMinutes, setPlannedMinutes] = useState(0);
  const [timerType, setTimerType] = useState<TimerType>(TimerType.POMODORO);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Use refs for values needed inside intervals to avoid stale closures
  const startTimeRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionRef = useRef<FocusSession | null>(null);
  const plannedSecondsRef = useRef<number>(0);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Calculate elapsed using Date.now() for accuracy (handles tab backgrounding)
  const tick = useCallback(() => {
    const now = Date.now();
    const totalElapsed = Math.floor((now - startTimeRef.current) / 1000) + pausedElapsedRef.current;
    const planned = plannedSecondsRef.current;

    if (totalElapsed >= planned) {
      // Timer completed
      setElapsedSeconds(planned);
      clearTimer();
      setTimerState(TimerState.COMPLETED);

      if (sessionRef.current) {
        const actualMinutes = planned / 60;
        const completed = sessionService.completeSession(sessionRef.current, actualMinutes);
        options.onComplete?.(completed);
      }
    } else {
      setElapsedSeconds(totalElapsed);
    }
  }, [clearTimer, options]);

  // Start a new focus session
  const start = useCallback(
    (minutes: number, type: TimerType, taskId: string | null, sessionType: any, isBreak: boolean, audioSettings?: any) => {
      clearTimer();

      const plannedSecs = minutes * 60;
      setPlannedMinutes(minutes);
      setTimerType(type);
      setElapsedSeconds(0);
      plannedSecondsRef.current = plannedSecs;
      pausedElapsedRef.current = 0;
      startTimeRef.current = Date.now();

      // Create session via service
      const input: CreateSessionInput = {
        taskId,
        plannedDurationMinutes: minutes,
        timerType: type,
        audioSettings,
        sessionType,
        isBreak,
      };
      sessionRef.current = sessionService.createSession(input);

      setTimerState(TimerState.RUNNING);
      intervalRef.current = setInterval(tick, 1000);
    },
    [clearTimer, tick],
  );

  const pause = useCallback(() => {
    if (timerState !== TimerState.RUNNING) return;
    clearTimer();
    // Save elapsed time so far
    const now = Date.now();
    pausedElapsedRef.current += Math.floor((now - startTimeRef.current) / 1000);
    setTimerState(TimerState.PAUSED);
  }, [timerState, clearTimer]);

  const resume = useCallback(() => {
    if (timerState !== TimerState.PAUSED) return;
    startTimeRef.current = Date.now();
    setTimerState(TimerState.RUNNING);
    intervalRef.current = setInterval(tick, 1000);
  }, [timerState, tick]);

  const abandon = useCallback(() => {
    if (timerState !== TimerState.RUNNING && timerState !== TimerState.PAUSED) return;
    clearTimer();

    const actualMinutes = elapsedSeconds / 60;
    setTimerState(TimerState.ABANDONED);

    if (sessionRef.current) {
      const abandoned = sessionService.abandonSession(sessionRef.current, actualMinutes);
      options.onAbandon?.(abandoned);
    }
  }, [timerState, clearTimer, elapsedSeconds, options]);

  const reset = useCallback(() => {
    clearTimer();
    setTimerState(TimerState.IDLE);
    setElapsedSeconds(0);
    setPlannedMinutes(0);
    pausedElapsedRef.current = 0;
    sessionRef.current = null;
  }, [clearTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const plannedSeconds = plannedMinutes * 60;
  const remainingSeconds = Math.max(0, plannedSeconds - elapsedSeconds);
  const progress = plannedSeconds > 0 ? elapsedSeconds / plannedSeconds : 0;

  return {
    timerState,
    remainingSeconds,
    elapsedSeconds,
    plannedMinutes,
    timerType,
    progress,
    start,
    pause,
    resume,
    abandon,
    reset,
  };
}
