'use client';

import { useState, useEffect, useCallback } from 'react';

type ConsentState = 'accepted' | 'rejected' | null;

const CONSENT_KEY = 'focusfreq_cookie_consent';

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored);
    }
    setIsLoaded(true);
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
  }, []);

  const reject = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setConsent('rejected');
  }, []);

  return { consent, isLoaded, accept, reject };
}
