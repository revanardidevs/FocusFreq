/**
 * Task Service — CRUD operations for tasks.
 *
 * All task data flows through this service. Components never access storage directly.
 */

import { storage } from './storage';
import { guestService } from './guestService';
import { generateId, nowISO } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { TaskStatus, type Task, type CreateTaskInput, type UpdateTaskInput } from '@/types';

export const taskService = {
  /**
   * Create a new task.
   */
  createTask(input: CreateTaskInput): Task {
    const tasks = storage.getTasks();
    const guestId = guestService.getGuestId();

    const task: Task = {
      id: generateId(),
      userId: null,
      guestId,
      title: input.title.trim(),
      status: TaskStatus.ACTIVE,
      totalFocusMinutes: 0,
      completedSessions: 0,
      createdAt: nowISO(),
      updatedAt: nowISO(),
      completedAt: null,
    };

    storage.setTasks([task, ...tasks]);
    trackEvent({ name: 'task_created', properties: { taskId: task.id } });
    return task;
  },

  /**
   * Update an existing task.
   */
  updateTask(id: string, updates: UpdateTaskInput): Task | null {
    const tasks = storage.getTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const updated: Task = {
      ...tasks[index],
      ...updates,
      updatedAt: nowISO(),
    };
    tasks[index] = updated;
    storage.setTasks(tasks);
    return updated;
  },

  /**
   * Mark a task as completed.
   */
  completeTask(id: string): Task | null {
    const tasks = storage.getTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const updated: Task = {
      ...tasks[index],
      status: TaskStatus.COMPLETED,
      updatedAt: nowISO(),
      completedAt: nowISO(),
    };
    tasks[index] = updated;
    storage.setTasks(tasks);
    trackEvent({
      name: 'task_completed',
      properties: { taskId: id, totalMinutes: updated.totalFocusMinutes },
    });
    return updated;
  },

  /**
   * Archive a task (soft delete).
   */
  archiveTask(id: string): Task | null {
    return this.updateTask(id, { status: TaskStatus.ARCHIVED });
  },

  /**
   * Permanently delete a task.
   */
  deleteTask(id: string): void {
    const tasks = storage.getTasks().filter((t) => t.id !== id);
    storage.setTasks(tasks);
  },

  /**
   * Get all active tasks (not completed, not archived).
   */
  getActiveTasks(): Task[] {
    return storage.getTasks().filter((t) => t.status === TaskStatus.ACTIVE);
  },

  /**
   * Get all tasks regardless of status.
   */
  getAllTasks(): Task[] {
    return storage.getTasks();
  },

  /**
   * Get a single task by ID.
   */
  getTask(id: string): Task | null {
    return storage.getTasks().find((t) => t.id === id) ?? null;
  },

  /**
   * Add focus minutes to a task after a completed session.
   * Only completed sessions should call this.
   */
  addFocusMinutes(id: string, minutes: number): void {
    const tasks = storage.getTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return;

    tasks[index] = {
      ...tasks[index],
      totalFocusMinutes: tasks[index].totalFocusMinutes + minutes,
      completedSessions: tasks[index].completedSessions + 1,
      updatedAt: nowISO(),
    };
    storage.setTasks(tasks);
  },
};
