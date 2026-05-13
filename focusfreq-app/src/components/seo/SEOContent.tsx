import React from 'react';

interface SEOContentProps {
  title: string;
  children: React.ReactNode;
}

export default function SEOContent({ title, children }: SEOContentProps) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-6 sm:text-3xl">
          {title}
        </h2>
        <div className="prose prose-stone prose-p:text-text-secondary prose-a:text-focus max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
}
