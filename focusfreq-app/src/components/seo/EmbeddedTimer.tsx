'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { formatTimerDisplay } from '@/lib/utils';

const PlayIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const PauseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
  </svg>
);

const ArrowPathIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

interface EmbeddedTimerProps {
  initialMinutes: number;
}

export default function EmbeddedTimer({ initialMinutes }: EmbeddedTimerProps) {
  const initialSeconds = initialMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  return (
    <div className="mx-auto w-full max-w-md rounded-[28px] border border-surface-200 bg-white p-8 shadow-card">
      <div className="flex flex-col items-center justify-center">
        <div className="font-sans font-[800] tracking-[-0.06em] text-text-primary tabular-nums" style={{ fontSize: 'clamp(48px, 8vw, 72px)' }}>
          {formatTimerDisplay(timeLeft)}
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={toggleTimer}
            className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-focus-glow transition-all hover:scale-105 active:scale-95"
            aria-label={isRunning ? "Pause timer" : "Start timer"}
            style={{ background: 'linear-gradient(135deg, #F05A3C, #FF735C)' }}
          >
            {isRunning ? (
              <PauseIcon className="h-8 w-8" />
            ) : (
              <PlayIcon className="h-8 w-8 translate-x-0.5" />
            )}
          </button>
          
          <button
            onClick={resetTimer}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-100 border border-surface-200 text-text-muted transition-all hover:bg-surface-200 hover:text-text-primary active:scale-95"
            aria-label="Reset timer"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
