import type { Metadata } from 'next';
import SEOHero from '@/components/seo/SEOHero';
import SEOContent from '@/components/seo/SEOContent';
import SEOFAQ from '@/components/seo/SEOFAQ';
import SEOCta from '@/components/seo/SEOCta';
import EmbeddedTimer from '@/components/seo/EmbeddedTimer';
import AdSlot from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Minimalist Focus Timer Online',
  description: 'A free, minimalist focus timer for deep work. Customize your timer, block distractions, and track your focus hours effortlessly.',
};

export default function FocusTimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FocusFreq Focus Timer",
    "description": "A customizable focus timer for deep work and productivity.",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "All"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <SEOHero 
        h1="Online Focus Timer" 
        description="A beautiful, distraction-free focus timer designed to help you drop into deep work instantly."
        badge="Deep Work"
      />

      <section className="bg-surface-50 py-12 border-b border-surface-200">
        <EmbeddedTimer initialMinutes={50} />
      </section>

      <AdSlot slotId="after-widget" format="horizontal" className="my-6 mx-auto max-w-5xl px-4" />

      <SEOContent title="Mastering Deep Work">
        <p>
          Deep work is the ability to focus without distraction on a cognitively demanding task. 
          In a world full of notifications and instant gratification, the ability to sustain focus for extended periods is a rare and highly valuable skill.
        </p>
        <p className="mt-4">
          Using a dedicated focus timer creates a psychological contract with yourself: until the timer rings, you will not switch tabs, check email, or look at your phone.
        </p>
      </SEOContent>

      <AdSlot slotId="content-mid" format="rectangle" className="my-6 mx-auto max-w-3xl px-4" />

      <SEOFAQ 
        faqs={[
          {
            question: "How long should a focus session be?",
            answer: "Beginners often start with 25 minutes (Pomodoro). As you build your 'focus muscle', aim to extend this to 50 or 90 minutes for true deep work blocks."
          },
          {
            question: "Why does FocusFreq look so minimal?",
            answer: "Visual clutter creates cognitive load. We designed FocusFreq to be as minimal and calm as possible so your brain can allocate 100% of its resources to your task, not our interface."
          }
        ]}
      />

      <SEOCta 
        headline="Ready to Track Your Focus?"
        subheadline="Launch the full workspace to save your session history, view your streaks, and listen to focus-enhancing audio."
        buttonText="Enter Focus Workspace"
        href="/app?timer=50"
      />
    </>
  );
}
