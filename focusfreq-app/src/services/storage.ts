/**
 * Storage Adapter — Abstraction layer over data persistence.
 *
 * Sprint 1: localStorage implementation.
 * Future: Supabase adapter with identical interface.
 *
 * Components NEVER access localStorage directly.
 * All data flows through services, which use this adapter.
 */

import { STORAGE_KEYS } from '@/lib/constants';

// ─── Generic Storage Operations ──────────────────────

function get<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    console.error(`[Storage] Failed to parse key: ${key}`);
    return null;
  }
}

function set<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`[Storage] Failed to set key: ${key}`, e);
  }
}

function remove(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

// ─── Typed Accessors ─────────────────────────────────

import type { Task, FocusSession, Guest } from '@/types';

export const storage = {
  // Guest
  getGuest: (): Guest | null => get<Guest>(STORAGE_KEYS.GUEST),
  setGuest: (guest: Guest): void => set(STORAGE_KEYS.GUEST, guest),

  // Tasks
  getTasks: (): Task[] => get<Task[]>(STORAGE_KEYS.TASKS) ?? [],
  setTasks: (tasks: Task[]): void => set(STORAGE_KEYS.TASKS, tasks),

  // Sessions
  getSessions: (): FocusSession[] => get<FocusSession[]>(STORAGE_KEYS.SESSIONS) ?? [],
  setSessions: (sessions: FocusSession[]): void => set(STORAGE_KEYS.SESSIONS, sessions),

  // Clear all FocusFreq data (for future migration)
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(remove);
  },
};
