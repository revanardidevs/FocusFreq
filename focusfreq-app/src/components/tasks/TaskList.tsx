'use client';

import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types';
import TaskItem from './TaskItem';
import TaskInput from './TaskInput';

interface TaskListProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onSelectTask: (id: string | null) => void;
  onCreateTask: (input: CreateTaskInput) => void;
  onUpdateTask: (id: string, updates: UpdateTaskInput) => void;
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskList({
  tasks,
  selectedTaskId,
  onSelectTask,
  onCreateTask,
  onUpdateTask,
  onCompleteTask,
  onDeleteTask,
}: TaskListProps) {
  const handleSelect = (id: string) => {
    onSelectTask(selectedTaskId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          Tasks
        </h2>
        {tasks.length > 0 && (
          <span className="text-xs text-text-muted">{tasks.length} active</span>
        )}
      </div>

      <TaskInput onCreateTask={onCreateTask} />

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-surface-300 py-8 text-center">
          <p className="text-sm text-text-muted">No tasks yet</p>
          <p className="mt-1 text-xs text-text-muted">
            Add a task above to start tracking your focus
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isSelected={selectedTaskId === task.id}
              onSelect={handleSelect}
              onComplete={onCompleteTask}
              onDelete={onDeleteTask}
              onUpdate={(id, title) => onUpdateTask(id, { title })}
            />
          ))}
        </div>
      )}

      {selectedTaskId && (
        <button
          onClick={() => onSelectTask(null)}
          className="w-full text-center text-xs text-text-muted hover:text-text-secondary"
        >
          Clear task selection (focus without task)
        </button>
      )}
    </div>
  );
}
