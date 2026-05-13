'use client';

import { TimerState } from '@/types';

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
  const primaryGradient = isBreak
    ? 'linear-gradient(135deg, #2FAE75, #46C98D)'
    : 'linear-gradient(135deg, #F05A3C, #FF735C)';
  const primaryShadow = isBreak
    ? '0 14px 30px rgba(47, 174, 117, 0.22)'
    : '0 14px 30px rgba(240, 90, 60, 0.22)';

  if (timerState === TimerState.COMPLETED || timerState === TimerState.ABANDONED) {
    return (
      <div className="flex justify-center">
        <button
          onClick={onReset}
          aria-label="Start new session"
          className="rounded-[16px] px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5"
          style={{ background: primaryGradient, boxShadow: primaryShadow }}
        >
          Start New Session
        </button>
      </div>
    );
  }

  if (timerState === TimerState.IDLE) {
    return (
      <div className="w-full mt-2">
        <button
          onClick={onStart}
          disabled={!canStart}
          aria-label={startLabel}
          className="w-full flex items-center justify-center gap-2 rounded-[14px] px-12 py-3.5 text-[16px] font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 min-h-[52px]"
          style={{ background: primaryGradient }}
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
    <div className="flex items-center justify-center gap-3">
      {timerState === TimerState.RUNNING ? (
        <button
          onClick={onPause}
          aria-label="Pause timer"
          className="rounded-[16px] bg-white border border-surface-200 px-8 py-3.5 text-base font-bold text-text-primary transition-all hover:bg-surface-50 hover:border-surface-300 hover:-translate-y-0.5 shadow-soft"
        >
          Pause
        </button>
      ) : (
        <button
          onClick={onResume}
          aria-label="Resume timer"
          className="rounded-[16px] px-8 py-3.5 text-base font-bold text-white transition-all hover:-translate-y-0.5"
          style={{ background: primaryGradient, boxShadow: primaryShadow }}
        >
          Resume
        </button>
      )}
      <button
        onClick={onAbandon}
        aria-label="Stop and end session"
        className="rounded-[16px] border border-danger/30 bg-white px-8 py-3.5 text-base font-bold text-danger transition-all hover:bg-danger/5 hover:-translate-y-0.5"
      >
        End
      </button>
    </div>
  );
}
