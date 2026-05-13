import type { Metadata } from 'next';
import Link from 'next/link';
import EmbeddedTimer from '@/components/seo/EmbeddedTimer';
import AdSlot from '@/components/ads/AdSlot';
import FocusFreqInfoSection from '@/components/home/FocusFreqInfoSection';

export const metadata: Metadata = {
  title: 'Free Pomodoro Timer Online — FocusFreq',
  description:
    'A free, minimalist Pomodoro timer with task tracking, focus audio, and session history. Use the 25-minute focus cycle to build better work habits — no account required.',
};

export default function PomodoroTimerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FocusFreq Pomodoro Timer',
    description:
      'A free, minimalist 25-minute Pomodoro timer for focus and productivity. Includes task tracking, focus audio, and session history.',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'All',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Timer Hero ───────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-24"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(240,90,60,0.07) 0%, transparent 55%), #FAFAF7',
        }}
      >
        <div className="mx-auto max-w-2xl px-4 text-center">
          {/* Eyebrow */}
          <span className="inline-block rounded-full border border-focus-border bg-focus-soft px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-focus mb-6">
            Focus Tool
          </span>

          {/* H1 — single per page */}
          <h1 className="text-4xl font-[800] tracking-tight text-text-strong sm:text-5xl lg:text-6xl leading-tight">
            Free Pomodoro Timer
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-text-secondary leading-relaxed">
            Master your time with the classic 25-minute Pomodoro cycle.
            Start the timer below — no account required.
          </p>

          {/* Timer card */}
          <div className="mt-12">
            <EmbeddedTimer initialMinutes={25} />
          </div>

          {/* Subtle workspace CTA */}
          <p className="mt-6 text-sm text-text-muted">
            Want tasks, history &amp; focus audio?{' '}
            <Link href="/app" className="font-semibold text-focus hover:underline">
              Open full workspace →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Pomofocus-style educational section ─────────────────── */}
      {/* No ad before headline — timer flows directly into content */}
      <FocusFreqInfoSection />

      {/* ── Ad: content-mid (after all content, before footer) ──── */}
      <AdSlot
        slotId="content-mid"
        format="rectangle"
        className="mx-auto max-w-3xl px-6 pb-8"
      />
    </>
  );
}
