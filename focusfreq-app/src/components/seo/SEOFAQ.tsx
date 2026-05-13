import React from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface SEOFAQProps {
  faqs: FAQ[];
}

export default function SEOFAQ({ faqs }: SEOFAQProps) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-8 text-center sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-[20px] border border-surface-200 bg-surface-50 p-8 shadow-soft">
              <h3 className="text-lg font-semibold text-text-primary">
                {faq.question}
              </h3>
              <p className="mt-3 text-text-secondary leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
