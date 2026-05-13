'use client';

import React from 'react';
import Link from 'next/link';
import { useCookieConsent } from '@/hooks/useCookieConsent';

/**
 * Minimal cookie consent banner — thin bottom bar.
 * Only rendered inside the (public) layout, never in /app.
 *
 * Behavior:
 * - consent === null  → show banner
 * - consent === 'accepted' or 'rejected' → hidden
 */
export default function CookieConsentBanner() {
  const { consent, isLoaded, accept, reject } = useCookieConsent();

  // Don't show until localStorage is read (avoid flash)
  if (!isLoaded) return null;

  // Already made a choice
  if (consent !== null) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-surface-200 bg-white/95 backdrop-blur-sm"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between">
        <p className="text-xs text-text-muted text-center sm:text-left">
          We use cookies to serve ads and improve your experience.{' '}
          <Link href="/cookies" className="underline hover:text-focus">
            Learn more
          </Link>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={reject}
            className="rounded-[10px] border border-surface-200 bg-white px-4 py-1.5 text-xs font-medium text-text-muted transition-colors hover:bg-surface-50 hover:text-text-primary"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-[10px] bg-focus px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-focus-hover"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
