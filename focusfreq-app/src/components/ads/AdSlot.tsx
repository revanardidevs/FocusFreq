'use client';

import React, { useEffect, useRef } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

interface AdSlotProps {
  slotId: string;
  format: 'horizontal' | 'rectangle' | 'responsive';
  className?: string;
}

const FORMAT_STYLES: Record<AdSlotProps['format'], React.CSSProperties> = {
  horizontal: { minHeight: 90, minWidth: 300, maxWidth: '100%' },
  rectangle: { minHeight: 250, minWidth: 300, maxWidth: '100%' },
  responsive: { minHeight: 100, width: '100%' },
};

const isProduction = process.env.NODE_ENV === 'production';
const adSensePubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

export default function AdSlot({ slotId, format, className = '' }: AdSlotProps) {
  const { consent, isLoaded } = useCookieConsent();
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Push ad only when all conditions are met and component is mounted
    if (isProduction && adSensePubId && consent === 'accepted' && adRef.current) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {
        // AdSense not yet loaded or blocked — fail silently
      }
    }
  }, [consent]);

  // State 1: Production without env → render nothing
  if (isProduction && !adSensePubId) {
    return null;
  }

  // State 2: Production with env but no consent or rejected → render nothing
  if (isProduction && adSensePubId && isLoaded && consent !== 'accepted') {
    return null;
  }

  // State 3: Production with env + consent → render real ad
  if (isProduction && adSensePubId && consent === 'accepted') {
    return (
      <div
        ref={adRef}
        className={`ad-slot flex items-center justify-center ${className}`}
        style={FORMAT_STYLES[format]}
        data-slot-id={slotId}
        aria-hidden="true"
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={adSensePubId}
          data-ad-slot={slotId}
          data-ad-format={format === 'responsive' ? 'auto' : undefined}
          data-full-width-responsive={format === 'responsive' ? 'true' : undefined}
        />
      </div>
    );
  }

  // State 4: Development → show placeholder for layout QA
  if (!isProduction) {
    return (
      <div
        className={`ad-slot flex items-center justify-center ${className}`}
        style={{
          ...FORMAT_STYLES[format],
          border: '2px dashed rgba(221, 213, 204, 0.6)',
          borderRadius: 24,
          background: 'rgba(234, 230, 223, 0.15)',
        }}
        data-slot-id={slotId}
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(138, 129, 122, 0.5)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Ad — {format} — {slotId}
        </span>
      </div>
    );
  }

  // Fallback: consent not yet loaded in production → render nothing (avoid flash)
  return null;
}
