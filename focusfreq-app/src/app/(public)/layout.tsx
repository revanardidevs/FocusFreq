import React from 'react';
import SEOFooter from '@/components/seo/SEOFooter';
import SEODisclaimer from '@/components/seo/SEODisclaimer';
import CookieConsentBanner from '@/components/ads/CookieConsentBanner';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        {children}
      </div>
      <SEODisclaimer />
      <SEOFooter />
      <CookieConsentBanner />
    </div>
  );
}
