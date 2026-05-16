import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOFooter from '@/components/seo/SEOFooter';
import SEODisclaimer from '@/components/seo/SEODisclaimer';
import CookieConsentBanner from '@/components/ads/CookieConsentBanner';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-14">
        {children}
      </main>
      <Footer />
      <SEODisclaimer />
      <SEOFooter />
      <CookieConsentBanner />
    </>
  );
}
