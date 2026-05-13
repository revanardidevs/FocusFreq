'use client';

import { useEffect } from 'react';
import { guestService } from '@/services/guestService';

/**
 * Hook to initialize guest identity on app mount.
 * Creates a persistent guest ID if none exists.
 */
export function useGuest() {
  useEffect(() => {
    guestService.getOrCreateGuest();
  }, []);

  return {
    getGuestId: guestService.getGuestId,
  };
}
