import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AdScript from '@/components/ads/AdScript';
import { siteConfig } from '@/config/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'FocusFreq — Focus Timer & Frequency Generator',
    template: '%s — FocusFreq',
  },
  description: siteConfig.description,
  keywords: [
    'focus timer',
    'pomodoro timer',
    'frequency generator',
    'tone generator',
    'study timer',
    'productivity',
    'focus tracker',
  ],
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} — Focus Timer & Frequency Generator`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Focus Timer & Frequency Generator`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(process.env.NEXT_PUBLIC_ADSENSE_VERIFICATION
    ? {
        other: {
          'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        {children}
        <AdScript />
      </body>
    </html>
  );
}
