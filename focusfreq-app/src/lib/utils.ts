/**
 * Generate a UUID v4 for use as IDs.
 * Uses crypto.randomUUID when available, falls back to manual generation.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get current ISO timestamp string.
 */
export function nowISO(): string {
  return new Date().toISOString();
}

/**
 * Format minutes into a human-readable string (e.g., "1h 25m" or "25m").
 */
export function formatMinutes(minutes: number): string {
  if (minutes < 1) return '0m';
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Format seconds into MM:SS display string.
 */
export function formatTimerDisplay(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculate completion percentage from planned and actual durations.
 */
export function calcCompletionPercent(
  plannedMinutes: number,
  actualMinutes: number,
): number {
  if (plannedMinutes <= 0) return 0;
  return Math.min(100, Math.round((actualMinutes / plannedMinutes) * 100));
}

/**
 * Check if today matches a given ISO date string.
 */
export function isToday(isoString: string): boolean {
  const date = new Date(isoString);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Format ISO timestamp to a short readable format (e.g., "10:30 AM").
 */
export function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format ISO timestamp to a short date (e.g., "May 9").
 */
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
