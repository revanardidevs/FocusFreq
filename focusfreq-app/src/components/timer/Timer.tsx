'use client';

import { formatTimerDisplay } from '@/lib/utils';
import { TimerState } from '@/types';
import styles from './Timer.module.css';

interface TimerProps {
  remainingSeconds: number;
  progress: number; // 0 to 1
  timerState: TimerState;
  isBreak?: boolean;
}

export default function Timer({ remainingSeconds, progress, timerState, isBreak = false }: TimerProps) {
  const isActive = timerState === TimerState.RUNNING || timerState === TimerState.PAUSED;

  const getStatusText = () => {
    if (timerState === TimerState.PAUSED) return 'Paused';
    if (timerState === TimerState.IDLE) {
      return isBreak ? 'Ready for a break' : 'Ready to focus';
    }
    if (timerState === TimerState.RUNNING) {
      return isBreak ? 'Take it easy' : 'Stay focused';
    }
    return '';
  };

  let timerClass = styles.timer;
  if (isActive) timerClass += ` ${styles.timerRunning}`;
  if (timerState === TimerState.PAUSED) timerClass += ` ${styles.timerPaused}`;

  let dotClass = styles.dot;
  if (timerState === TimerState.PAUSED) dotClass += ` ${styles.dotPaused}`;
  else if (isBreak) dotClass += ` ${styles.dotBreak}`;

  let fillClass = styles.fill;
  if (isBreak) fillClass += ` ${styles.fillBreak}`;

  return (
    <div className="w-full">
      <div className={styles.timerBlock}>
        <div className={timerClass}>
          {formatTimerDisplay(remainingSeconds)}
        </div>
        <div className={styles.status}>
          <span className={dotClass}></span>
          <span id="status">{getStatusText()}</span>
        </div>
      </div>
      <div className={styles.progress}>
        <span 
          className={fillClass} 
          style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
        ></span>
      </div>
    </div>
  );
}
