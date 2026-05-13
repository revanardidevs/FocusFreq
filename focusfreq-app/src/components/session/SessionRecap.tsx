'use client';

import type { FocusSession } from '@/types';
import { SessionStatus, AudioMode, TaskStatus } from '@/types';
import { formatMinutes } from '@/lib/utils';
import { taskService } from '@/services/taskService';
import { historyService } from '@/services/historyService';
import { useSettings } from '@/hooks/useSettings';
import { useState } from 'react';

interface SessionRecapProps {
  session: FocusSession;
  onDismiss: () => void;
  onCompleteTask?: (taskId: string) => void;
}

export default function SessionRecap({ session, onDismiss, onCompleteTask }: SessionRecapProps) {
  const { settings } = useSettings();
  const isCompleted = session.status === SessionStatus.COMPLETED;
  const task = session.taskId ? taskService.getTask(session.taskId) : null;
  const [taskMarkedDone, setTaskMarkedDone] = useState(false);
  
  const showTaskPrompt = settings.autoCheckTasks && task && task.status !== TaskStatus.COMPLETED && isCompleted && !session.isBreak;

  const handleMarkTaskDone = () => {
    if (task && onCompleteTask) {
      onCompleteTask(task.id);
      setTaskMarkedDone(true);
    }
  };

  const primaryGradient = session.isBreak
    ? 'linear-gradient(135deg, #2FAE75, #46C98D)'
    : 'linear-gradient(135deg, #F05A3C, #FF735C)';

  return (
    <div className="animate-in zoom-in-95 duration-300 rounded-[28px] border border-surface-200 bg-white p-8 shadow-card">
      {/* Status icon */}
      <div className="mb-4 flex justify-center">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full ${
            isCompleted ? 'bg-break-soft text-break' : 'bg-warning/15 text-warning'
          }`}
        >
          {isCompleted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-center text-lg font-bold text-text-primary">
        {isCompleted ? 'Session Complete!' : 'Session Ended'}
      </h3>
      <p className="mt-1 text-center text-sm text-text-secondary">
        {isCompleted
          ? 'Great work! Your focus session has been saved.'
          : 'Session was stopped early. Progress has been recorded.'}
      </p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-[20px] bg-surface-50 border border-surface-200 p-4 text-center">
          <p className="text-xs text-text-muted">Duration</p>
          <p className="text-xl font-bold text-text-primary mt-1">
            {formatMinutes(session.actualDurationMinutes)}
          </p>
        </div>
        <div className="rounded-[20px] bg-surface-50 border border-surface-200 p-4 text-center">
          <p className="text-xs text-text-muted">Status</p>
          <p className="text-sm font-bold mt-1 text-text-primary">
            {isCompleted ? `Session #${historyService.getHistoryStats().todayCompletedSessions} today` : 'Abandoned'}
          </p>
        </div>
      </div>

      {/* Task & Audio Info */}
      <div className="mt-3 space-y-3">
        {task && (
          <div className="rounded-[20px] bg-surface-50 border border-surface-200 p-4 text-center">
            <p className="text-xs text-text-muted mb-1">Task</p>
            <p className="text-sm font-semibold text-text-primary">{task.title}</p>
            <p className="mt-1 text-xs text-text-muted">
              Total time on this task: {formatMinutes(task.totalFocusMinutes)}
            </p>
          </div>
        )}
        
        {session.audioMode && session.audioMode !== AudioMode.NONE && (
          <div className="rounded-[16px] bg-audio-soft border border-audio-border p-3 text-center">
            <p className="text-xs text-audio">
              Powered by {
                session.audioMode === AudioMode.TONE ? `${session.frequencyHz} Hz Tone` :
                session.audioMode === AudioMode.NOISE ? `${session.noiseType?.charAt(0).toUpperCase()}${session.noiseType?.slice(1)} Noise` :
                session.audioMode === AudioMode.BINAURAL ? `${session.binauralLeftHz}/${session.binauralRightHz} Hz Binaural` :
                'Audio'
              }
            </p>
          </div>
        )}
      </div>

      {/* Auto Check Task Prompt */}
      {showTaskPrompt && !taskMarkedDone && (
        <div className="mt-4 rounded-xl border border-focus-border bg-focus-soft p-4 text-center">
          <p className="text-sm font-medium text-text-primary mb-3">Did you finish this task?</p>
          <button
            onClick={handleMarkTaskDone}
            className="w-full rounded-lg bg-focus/10 px-4 py-2 text-sm font-bold text-focus hover:bg-focus/20 transition-colors"
          >
            Yes, mark as completed
          </button>
        </div>
      )}
      
      {taskMarkedDone && (
        <div className="mt-4 text-center text-sm font-medium text-break animate-fade-in">
          Task marked as completed!
        </div>
      )}

      {/* Action */}
      <button
        onClick={onDismiss}
        className="mt-6 w-full rounded-[16px] py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5"
        style={{ background: primaryGradient }}
      >
        Continue
      </button>
    </div>
  );
}
