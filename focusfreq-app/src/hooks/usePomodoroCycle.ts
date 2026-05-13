import { useState, useCallback, useEffect, useRef } from 'react';
import { SessionType, FocusSession } from '@/types';
import { useSettings } from '@/hooks/useSettings';
import { alarmService } from '@/lib/audio/alarmService';

interface UsePomodoroCycleReturn {
  currentMode: SessionType;
  pomodorosCompleted: number;
  currentMinutes: number;
  autoStartCountdown: number | null;
  setMode: (mode: SessionType) => void;
  setMinutes: (mins: number) => void;
  handleSessionComplete: (session: FocusSession) => void;
  cancelAutoStart: () => void;
}

interface UsePomodoroCycleOptions {
  onAutoStart: () => void;
}

export function usePomodoroCycle(options: UsePomodoroCycleOptions): UsePomodoroCycleReturn {
  const { settings } = useSettings();
  
  const [currentMode, setCurrentMode] = useState<SessionType>('focus');
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(settings.pomodoroMinutes);
  const [autoStartCountdown, setAutoStartCountdown] = useState<number | null>(null);

  // Sync currentMinutes whenever the settings duration for the current mode changes
  const prevSettingsRef = useRef(settings);
  useEffect(() => {
    const prev = prevSettingsRef.current;
    prevSettingsRef.current = settings;

    if (currentMode === 'focus' && settings.pomodoroMinutes !== prev.pomodoroMinutes) {
      setCurrentMinutes(settings.pomodoroMinutes);
    } else if (currentMode === 'short_break' && settings.shortBreakMinutes !== prev.shortBreakMinutes) {
      setCurrentMinutes(settings.shortBreakMinutes);
    } else if (currentMode === 'long_break' && settings.longBreakMinutes !== prev.longBreakMinutes) {
      setCurrentMinutes(settings.longBreakMinutes);
    }
  }, [settings.pomodoroMinutes, settings.shortBreakMinutes, settings.longBreakMinutes, currentMode]);
  
  const autoStartTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync default minutes when mode changes manually
  const setMode = useCallback((mode: SessionType) => {
    setCurrentMode(mode);
    if (mode === 'focus') setCurrentMinutes(settings.pomodoroMinutes);
    else if (mode === 'short_break') setCurrentMinutes(settings.shortBreakMinutes);
    else if (mode === 'long_break') setCurrentMinutes(settings.longBreakMinutes);
  }, [settings.pomodoroMinutes, settings.shortBreakMinutes, settings.longBreakMinutes]);

  const setMinutes = useCallback((mins: number) => {
    setCurrentMinutes(mins);
  }, []);

  const cancelAutoStart = useCallback(() => {
    if (autoStartTimerRef.current) {
      clearInterval(autoStartTimerRef.current);
      autoStartTimerRef.current = null;
    }
    setAutoStartCountdown(null);
  }, []);

  useEffect(() => {
    if (autoStartCountdown === null) return;
    
    if (autoStartCountdown === 0) {
      cancelAutoStart();
      options.onAutoStart();
      return;
    }

    autoStartTimerRef.current = setTimeout(() => {
      setAutoStartCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => {
      if (autoStartTimerRef.current) {
        clearTimeout(autoStartTimerRef.current);
        autoStartTimerRef.current = null;
      }
    };
  }, [autoStartCountdown, cancelAutoStart, options]);

  useEffect(() => {
    return cancelAutoStart;
  }, [cancelAutoStart]);

  const handleSessionComplete = useCallback((session: FocusSession) => {
    // 1. Play Alarm
    alarmService.play(settings.alarmSound, settings.alarmVolume, settings.alarmRepeat);

    // 2. State Machine Transitions
    let nextMode: SessionType = 'focus';
    let newPomodoros = pomodorosCompleted;
    let shouldAutoStart = false;

    if (session.sessionType === 'focus' && !session.isBreak) {
      newPomodoros += 1;
      setPomodorosCompleted(newPomodoros);
      
      if (newPomodoros % settings.longBreakInterval === 0) {
        nextMode = 'long_break';
      } else {
        nextMode = 'short_break';
      }
      shouldAutoStart = settings.autoStartBreaks;
    } else {
      // It was a break, go back to focus
      nextMode = 'focus';
      shouldAutoStart = settings.autoStartPomodoros;
    }

    setCurrentMode(nextMode);
    
    // Set duration for the new mode
    if (nextMode === 'focus') setCurrentMinutes(settings.pomodoroMinutes);
    else if (nextMode === 'short_break') setCurrentMinutes(settings.shortBreakMinutes);
    else if (nextMode === 'long_break') setCurrentMinutes(settings.longBreakMinutes);

    // 3. Auto-start logic
    if (shouldAutoStart) {
      setAutoStartCountdown(3);
    }
  }, [
    pomodorosCompleted,
    settings.longBreakInterval,
    settings.autoStartBreaks,
    settings.autoStartPomodoros,
    settings.pomodoroMinutes,
    settings.shortBreakMinutes,
    settings.longBreakMinutes,
    settings.alarmSound,
    settings.alarmVolume,
    settings.alarmRepeat
  ]);

  return {
    currentMode,
    pomodorosCompleted,
    currentMinutes,
    autoStartCountdown,
    setMode,
    setMinutes,
    handleSessionComplete,
    cancelAutoStart,
  };
}
