'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const adSensePubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

/**
 * Loads the Google AdSense script only when:
 * 1. NEXT_PUBLIC_ADSENSE_PUB_ID env var is set
 * 2. User has explicitly accepted cookie consent
 *
 * If consent is null or rejected, no script is loaded.
 */
export default function AdScript() {
  const { consent } = useCookieConsent();

  // Gate: no env = no script
  if (!adSensePubId) return null;

  // Gate: explicit opt-in required
  if (consent !== 'accepted') return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSensePubId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
