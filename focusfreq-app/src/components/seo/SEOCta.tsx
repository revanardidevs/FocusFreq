import React from 'react';
import Link from 'next/link';

interface SEOCtaProps {
  headline: string;
  subheadline: string;
  buttonText: string;
  href: string;
}

export default function SEOCta({ headline, subheadline, buttonText, href }: SEOCtaProps) {
  return (
    <section className="bg-surface-50 border-t border-surface-200 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {headline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-text-muted">
          {subheadline}
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href={href}
            className="rounded-[16px] px-8 py-4 text-lg font-bold text-white shadow-focus-glow transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            style={{ background: 'linear-gradient(135deg, #F05A3C, #FF735C)' }}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
