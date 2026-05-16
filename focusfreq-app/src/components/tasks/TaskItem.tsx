'use client';

import { useState } from 'react';
import type { Task } from '@/types';
import { formatMinutes } from '@/lib/utils';
import styles from './Tasks.module.css';

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

  const isDone = task.status === 'completed';

  return (
    <div
      className={`${styles.taskRow} ${isSelected ? styles.active : ''} ${isDone ? styles.done : ''}`}
      onClick={(e) => {
        // Prevent selection if clicking inside inputs or action buttons
        if ((e.target as HTMLElement).closest('input, [data-action]')) return;
        onSelect(task.id);
      }}
    >
      {/* Circle = complete toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isDone) {
            onComplete(task.id);
          }
        }}
        data-action="complete"
        className={styles.check}
        title={isDone ? 'Completed' : 'Mark complete'}
      />

      {/* Task content */}
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={styles.taskInputEdit}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span
            className={styles.taskTitle}
            onDoubleClick={(e) => {
              if (!isDone) {
                e.stopPropagation();
                setIsEditing(true);
              }
            }}
          >
            {task.title}
          </span>
        )}
        <span className={styles.taskMeta}>
          {task.completedSessions} sessions • {formatMinutes(task.totalFocusMinutes)} focused
        </span>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {!isDone && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete(task.id);
            }}
            data-action="complete"
            className="rounded-lg p-1.5 text-text-muted hover:bg-break-soft hover:text-break"
            title="Mark complete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          data-action="delete"
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

