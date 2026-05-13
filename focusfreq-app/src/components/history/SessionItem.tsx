'use client';

import type { FocusSession } from '@/types';
import { SessionStatus } from '@/types';
import { formatMinutes, formatTime, formatDate } from '@/lib/utils';
import { taskService } from '@/services/taskService';
import { AudioMode } from '@/types';

interface SessionItemProps {
  session: FocusSession;
}

export default function SessionItem({ session }: SessionItemProps) {
  const isCompleted = session.status === SessionStatus.COMPLETED;
  const task = session.taskId ? taskService.getTask(session.taskId) : null;

  const getAudioString = () => {
    if (!session.audioMode || session.audioMode === AudioMode.NONE) return null;
    const vol = session.volume !== null ? Math.round(session.volume * 100) : 20;

    switch (session.audioMode) {
      case AudioMode.TONE:
        return `Tone · ${session.frequencyHz} Hz · ${session.waveform ? session.waveform.charAt(0).toUpperCase() + session.waveform.slice(1) : ''} · ${vol}%`;
      case AudioMode.NOISE:
        return `Noise · ${session.noiseType ? session.noiseType.charAt(0).toUpperCase() + session.noiseType.slice(1) : ''} · ${vol}%`;
      case AudioMode.BINAURAL:
        return `Binaural · ${session.binauralLeftHz}/${session.binauralRightHz} Hz · ${vol}%`;
      default:
        return null;
    }
  };

  const audioString = getAudioString();

  return (
    <div className="flex items-center gap-4 rounded-[16px] border border-surface-200 bg-white px-4 py-3 transition-all hover:bg-surface-50 hover:border-surface-300">
      {/* Status indicator */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isCompleted
            ? session.isBreak
              ? 'bg-break-soft text-break'
              : 'bg-focus-soft text-focus'
            : 'bg-surface-100 text-text-muted'
        }`}
      >
        {isCompleted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>

      {/* Session info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text-primary">
            {session.isBreak 
              ? (session.sessionType === 'short_break' ? '☕ Short Break' : '🛌 Long Break') 
              : (task ? task.title : 'Free Focus')}
          </span>
          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
              isCompleted
                ? session.isBreak 
                  ? 'bg-break-soft text-break' 
                  : 'bg-focus-soft text-focus'
                : 'bg-danger/10 text-danger'
            }`}
          >
            {isCompleted ? 'Done' : 'Abandoned'}
          </span>
        </div>
        <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-muted">
          <span>{formatMinutes(session.actualDurationMinutes)} / {formatMinutes(session.plannedDurationMinutes)}</span>
          <span>{session.completionPercent}%</span>
          {audioString && (
            <>
              <span className="text-surface-300">•</span>
              <span>{audioString}</span>
            </>
          )}
        </div>
      </div>

      {/* Time */}
      <div className="shrink-0 text-right">
        <p className="text-xs text-text-secondary">{formatTime(session.startedAt)}</p>
        <p className="text-[10px] text-text-muted">{formatDate(session.startedAt)}</p>
      </div>
    </div>
  );
}
