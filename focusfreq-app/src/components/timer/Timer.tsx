'use client';

import { formatTimerDisplay } from '@/lib/utils';
import { TimerState } from '@/types';

interface TimerProps {
  remainingSeconds: number;
  progress: number; // 0 to 1
  timerState: TimerState;
  isBreak?: boolean;
}

export default function Timer({ remainingSeconds, progress, timerState, isBreak = false }: TimerProps) {
  const isActive = timerState === TimerState.RUNNING || timerState === TimerState.PAUSED;
  const accentColor = isBreak ? 'bg-break' : 'bg-focus';
  const dotColor = isBreak ? 'bg-break' : 'bg-focus';

  const getStatusText = () => {
    if (timerState === TimerState.PAUSED) return 'Paused';
    if (timerState === TimerState.IDLE) {
      return isBreak ? 'Time for a break' : 'Ready to focus';
    }
    if (timerState === TimerState.RUNNING) {
      return isBreak ? 'Take it easy' : 'Stay focused';
    }
    return '';
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2">
      {/* Timer display */}
      <div className="flex flex-col items-center mb-4 mt-0">
        <span
          className={`font-sans font-[900] tracking-[-0.05em] leading-[0.9] transition-colors duration-300 ${
            timerState === TimerState.PAUSED
              ? 'animate-pulse text-text-muted'
              : 'text-[#1F1A14]'
          }`}
          style={{ fontSize: 'clamp(80px, 16vw, 120px)' }}
        >
          {formatTimerDisplay(remainingSeconds)}
        </span>

        {/* Status with colored dot */}
        <div className="mt-4 flex items-center gap-2">
          <div className={`w-[14px] h-[14px] rounded-full flex items-center justify-center ${
            timerState === TimerState.PAUSED 
              ? 'bg-warning/20 animate-pulse' 
              : isBreak 
                ? 'bg-break-soft' 
                : 'bg-focus-soft'
          }`}>
            <div className={`w-[6px] h-[6px] rounded-full ${
              timerState === TimerState.PAUSED 
                ? 'bg-warning' 
                : isBreak 
                  ? 'bg-break' 
                  : 'bg-focus'
            }`} />
          </div>
          <span className={`text-[15px] font-semibold ${
            timerState === TimerState.PAUSED
              ? 'uppercase tracking-widest text-warning text-xs'
              : 'text-[#3D3830]'
          }`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Slim horizontal progress bar / separator */}
      <div className="w-full h-[1px] bg-surface-200 overflow-hidden relative mb-2">
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-linear ${accentColor}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
