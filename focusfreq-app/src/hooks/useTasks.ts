'use client';

import { useState, useCallback, useEffect } from 'react';
import { type Task, type CreateTaskInput, type UpdateTaskInput } from '@/types';
import { taskService } from '@/services/taskService';
import { useSettings } from './useSettings';

interface UseTasksReturn {
  tasks: Task[];
  isLoading: boolean;
  createTask: (input: CreateTaskInput) => Task;
  updateTask: (id: string, updates: UpdateTaskInput) => void;
  completeTask: (id: string) => void;
  archiveTask: (id: string) => void;
  deleteTask: (id: string) => void;
  refresh: () => void;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { settings } = useSettings();

  const refresh = useCallback(() => {
    const all = taskService.getAllTasks();
    if (settings.checkCompletedTasksToBottom) {
      // Include active and completed tasks
      const filtered = all.filter(t => 
        t.status === 'active' || t.status === 'completed'
      );
      
      // Sort: active first, then completed
      filtered.sort((a, b) => {
        if (a.status === 'active' && b.status === 'completed') return -1;
        if (a.status === 'completed' && b.status === 'active') return 1;
        // Sort active by createdAt desc
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      setTasks(filtered);
    } else {
      const filtered = all.filter(t => 
        t.status === 'active' || t.status === 'completed'
      );
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTasks(filtered);
    }
  }, [settings.checkCompletedTasksToBottom]);

  // Load tasks on mount
  useEffect(() => {
    refresh();
    setIsLoading(false);
  }, [refresh]);

  const createTask = useCallback(
    (input: CreateTaskInput): Task => {
      const task = taskService.createTask(input);
      refresh();
      return task;
    },
    [refresh],
  );

  const updateTask = useCallback(
    (id: string, updates: UpdateTaskInput) => {
      taskService.updateTask(id, updates);
      refresh();
    },
    [refresh],
  );

  const completeTask = useCallback(
    (id: string) => {
      taskService.completeTask(id);
      refresh();
    },
    [refresh],
  );

  const archiveTask = useCallback(
    (id: string) => {
      taskService.archiveTask(id);
      refresh();
    },
    [refresh],
  );

  const deleteTask = useCallback(
    (id: string) => {
      taskService.deleteTask(id);
      refresh();
    },
    [refresh],
  );

  return {
    tasks,
    isLoading,
    createTask,
    updateTask,
    completeTask,
    archiveTask,
    deleteTask,
    refresh,
  };
}
