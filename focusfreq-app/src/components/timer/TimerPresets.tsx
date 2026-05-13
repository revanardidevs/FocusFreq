'use client';

import { SessionType } from '@/types';

interface TimerModesProps {
  currentMode: SessionType;
  onModeChange: (mode: SessionType) => void;
  currentMinutes: number;
  onMinutesChange: (minutes: number) => void;
  disabled?: boolean;
}

const QUICK_DURATIONS: Record<SessionType, { minutes: number; label: string }[]> = {
  focus: [
    { minutes: 15, label: 'Quick' },
    { minutes: 25, label: 'Pomodoro' },
    { minutes: 50, label: 'Deep Work' },
    { minutes: 90, label: 'Long Flow' },
  ],
  short_break: [
    { minutes: 3, label: '' },
    { minutes: 5, label: '' },
    { minutes: 10, label: '' },
  ],
  long_break: [
    { minutes: 10, label: '' },
    { minutes: 15, label: '' },
    { minutes: 30, label: '' },
  ],
};

const MODE_LABELS: Record<SessionType, { label: string; icon: React.ReactNode }> = {
  focus: {
    label: 'Focus',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.99 8.99a.75.75 0 11-1.06 1.06l-1.52-1.52V20.25a.75.75 0 01-.75.75H14.25a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.81a.75.75 0 01-.75-.75v-7.88L3.53 13.89a.75.75 0 11-1.06-1.06l8.99-8.99z" />
      </svg>
    ),
  },
  short_break: {
    label: 'Short Break',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  long_break: {
    label: 'Long Break',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
};

interface ModeTabsProps {
  currentMode: SessionType;
  onModeChange: (mode: SessionType) => void;
  disabled?: boolean;
}

export function ModeTabs({
  currentMode,
  onModeChange,
  disabled = false,
}: ModeTabsProps) {
  return (
    <div className="inline-flex bg-white p-1 rounded-full border border-surface-200 mb-2">
      {(Object.keys(MODE_LABELS) as SessionType[]).map((mode) => {
        const isSelected = currentMode === mode;
        const isModeBreak = mode !== 'focus';
        const modeData = MODE_LABELS[mode];
        return (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            disabled={disabled}
            aria-pressed={isSelected}
            aria-label={`${modeData.label} mode`}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 min-h-[36px] ${
              isSelected
                ? isModeBreak
                  ? 'bg-break-soft text-break border border-break-border/60'
                  : 'bg-focus-soft text-focus border border-focus-border/60'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-50 border border-transparent'
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            {modeData.icon}
            {modeData.label}
          </button>
        );
      })}
    </div>
  );
}

interface DurationPresetsProps {
  currentMode: SessionType;
  currentMinutes: number;
  onMinutesChange: (minutes: number) => void;
  disabled?: boolean;
}

export function DurationPresets({
  currentMode,
  currentMinutes,
  onMinutesChange,
  disabled = false,
}: DurationPresetsProps) {
  const isBreak = currentMode !== 'focus';

  return (
    <div className="flex w-full justify-between gap-3 mt-4 mb-4">
      {QUICK_DURATIONS[currentMode].map(({ minutes, label }) => {
        const isActive = currentMinutes === minutes;
        return (
          <button
            key={minutes}
            onClick={() => onMinutesChange(minutes)}
            disabled={disabled}
            aria-pressed={isActive}
            aria-label={`Set duration to ${minutes} minutes`}
            className={`flex-1 rounded-[16px] py-5 flex flex-col items-center justify-center border transition-all duration-200 ${
              isActive
                ? isBreak
                  ? 'bg-break-soft text-break border-break-border'
                  : 'bg-focus-soft text-focus border-focus-border'
                : 'bg-white text-text-primary border-surface-200 hover:bg-surface-50'
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <span className={`font-bold text-[20px] leading-none ${isActive ? '' : 'text-text-strong'}`}>{minutes}m</span>
            {/* Show descriptive label */}
            {label && (
              <span className={`text-[13px] mt-2 font-medium ${isActive ? '' : 'text-text-secondary'}`}>{label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
