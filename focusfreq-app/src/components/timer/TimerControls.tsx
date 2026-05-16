'use client';

import { TimerState } from '@/types';
import styles from './TimerControls.module.css';

interface TimerControlsProps {
  timerState: TimerState;
  canStart: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onAbandon: () => void;
  onReset: () => void;
  startLabel?: string;
  isBreak?: boolean;
}

export default function TimerControls({
  timerState,
  canStart,
  onStart,
  onPause,
  onResume,
  onAbandon,
  onReset,
  startLabel = 'Start Focusing',
  isBreak = false,
}: TimerControlsProps) {
  
  if (timerState === TimerState.COMPLETED || timerState === TimerState.ABANDONED) {
    return (
      <div className={styles.controls}>
        <button
          onClick={onReset}
          aria-label="Start new session"
          className={`${styles.start} ${isBreak ? styles.startBreak : ''}`}
        >
          Start New Session
        </button>
      </div>
    );
  }

  if (timerState === TimerState.IDLE) {
    return (
      <div className={styles.controls}>
        <button
          onClick={onStart}
          disabled={!canStart}
          aria-label={startLabel}
          className={`${styles.start} ${isBreak ? styles.startBreak : ''}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
            <path d="M8 5v14l11-7z" />
          </svg>
          {startLabel}
        </button>
      </div>
    );
  }

  // Running or Paused
  return (
    <div className={styles.controls}>
      <div className={styles.runControls}>
        {timerState === TimerState.RUNNING ? (
          <button
            onClick={onPause}
            aria-label="Pause timer"
            className={`${styles.pause} ${isBreak ? styles.pauseBreak : ''}`}
          >
            Pause
          </button>
        ) : (
          <button
            onClick={onResume}
            aria-label="Resume timer"
            className={`${styles.resume} ${isBreak ? styles.resumeBreak : ''}`}
          >
            Resume
          </button>
        )}
        <button
          onClick={onAbandon}
          aria-label="Stop and end session"
          className={styles.end}
        >
          End
        </button>
      </div>
    </div>
  );
}
