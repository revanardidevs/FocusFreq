/**
 * Guest Service — Manages guest identity.
 *
 * Creates a persistent guest ID so anonymous users can track their sessions
 * within the same browser. This ID links tasks and sessions to the guest.
 */

import { storage } from './storage';
import { generateId, nowISO } from '@/lib/utils';
import type { Guest } from '@/types';

export const guestService = {
  /**
   * Get the current guest, or create one if none exists.
   */
  getOrCreateGuest(): Guest {
    const existing = storage.getGuest();
    if (existing) {
      // Update last seen
      const updated: Guest = { ...existing, lastSeenAt: nowISO() };
      storage.setGuest(updated);
      return updated;
    }

    const guest: Guest = {
      guestId: generateId(),
      createdAt: nowISO(),
      lastSeenAt: nowISO(),
    };
    storage.setGuest(guest);
    return guest;
  },

  /**
   * Get the current guest ID. Returns null if no guest exists.
   */
  getGuestId(): string | null {
    return storage.getGuest()?.guestId ?? null;
  },
};
