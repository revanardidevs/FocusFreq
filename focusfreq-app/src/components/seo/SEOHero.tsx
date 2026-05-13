import React from 'react';
import Link from 'next/link';

interface SEOHeroProps {
  badge?: string;
  h1: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function SEOHero({ badge, h1, description, ctaText = 'Start Focusing', ctaHref = '/app' }: SEOHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32"
      style={{ background: 'radial-gradient(circle at top left, rgba(240, 90, 60, 0.06), transparent 40%), #FAFAF7' }}
    >
      <div className="mx-auto max-w-4xl px-4 text-center">
        {badge && (
          <span className="inline-block rounded-full bg-focus-soft border border-focus-border px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-focus mb-6">
            {badge}
          </span>
        )}
        <h1 className="text-4xl font-[800] tracking-tight text-text-strong sm:text-5xl lg:text-6xl leading-tight">
          {h1}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
          {description}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={ctaHref}
            className="rounded-[16px] px-8 py-4 text-lg font-bold text-white shadow-focus-glow transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #F05A3C, #FF735C)' }}
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
