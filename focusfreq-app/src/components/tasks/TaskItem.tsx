'use client';

import { useState } from 'react';
import type { Task } from '@/types';
import { formatMinutes } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export default function TaskItem({
  task,
  isSelected,
  onSelect,
  onComplete,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== task.title) {
      onUpdate(task.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`group flex items-center gap-3 rounded-[16px] px-4 py-3 transition-all duration-200 min-h-[48px] ${
        isSelected
          ? 'bg-focus-soft shadow-sm border border-focus-border'
          : task.status === 'completed'
          ? 'bg-surface-50 border border-surface-200 opacity-60'
          : 'bg-white border border-surface-200 hover:bg-surface-50 hover:border-surface-300'
      }`}
    >
      {/* Select radio */}
      <button
        onClick={() => onSelect(task.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          isSelected
            ? 'border-focus bg-focus'
            : 'border-surface-300 hover:border-focus'
        }`}
        title="Select for focus session"
      >
        {isSelected && (
          <div className="h-2 w-2 rounded-full bg-white" />
        )}
      </button>

      {/* Task content */}
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-focus/30 bg-white px-2 py-1 text-sm text-text-primary outline-none focus:border-focus focus:ring-1 focus:ring-focus/20"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            disabled={task.status === 'completed'}
            className={`block w-full truncate text-left text-sm font-medium ${
              task.status === 'completed' ? 'text-text-muted line-through' : 'text-text-primary'
            }`}
          >
            {task.title}
          </button>
        )}
        <div className="mt-1 flex items-center gap-1.5 text-xs text-text-muted">
          <span>{task.completedSessions} sessions</span>
          <span className="text-surface-300">•</span>
          <span>{formatMinutes(task.totalFocusMinutes)} focused</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {task.status !== 'completed' && (
          <button
            onClick={() => onComplete(task.id)}
            className="rounded-lg p-1.5 text-text-muted hover:bg-break-soft hover:text-break"
            title="Mark complete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg p-1.5 text-text-muted hover:bg-danger/10 hover:text-danger"
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
