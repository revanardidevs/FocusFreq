import type { Metadata } from 'next';
import SEOHero from '@/components/seo/SEOHero';
import SEOContent from '@/components/seo/SEOContent';
import SEOFAQ from '@/components/seo/SEOFAQ';
import SEOCta from '@/components/seo/SEOCta';
import EmbeddedTimer from '@/components/seo/EmbeddedTimer';
import AdSlot from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Study Timer Online | 45-Minute Focus Session',
  description: 'The optimal study timer for students. Use the 45/15 method to maximize retention, avoid burnout, and pass your exams with focused study blocks.',
};

export default function StudyTimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FocusFreq Study Timer",
    "description": "A 45-minute study timer designed for students to maximize retention and avoid burnout.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <SEOHero 
        h1="Online Study Timer" 
        description="Maximize your learning retention with the 45/15 study method. Start your 45-minute focus block below and eliminate distractions."
        badge="Study Tool"
      />

      <section className="bg-surface-50 py-12 border-b border-surface-200">
        <EmbeddedTimer initialMinutes={45} />
        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted">Need background noise for studying?</p>
        </div>
      </section>

      <AdSlot slotId="after-widget" format="horizontal" className="my-6 mx-auto max-w-5xl px-4" />

      <SEOContent title="The 45/15 Study Method">
        <p>
          While the classic 25-minute Pomodoro is great for quick tasks, intense studying often requires longer periods of sustained concentration to grasp complex concepts. 
          The 45/15 method involves studying with zero distractions for 45 minutes, followed by a 15-minute break.
        </p>
        <p className="mt-4">
          During the 45 minutes, your brain has enough time to enter a deep state of learning without the cognitive fatigue that comes from studying for hours on end. 
          The 15-minute break allows your hippocampus to consolidate the information you just learned into long-term memory.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4 text-text-primary">Tips for an effective study block:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Phone in another room:</strong> Physical distance from your phone prevents the subconscious urge to check it.</li>
          <li><strong>Clear your desk:</strong> Only keep the materials you need for the current subject.</li>
          <li><strong>Use Focus Audio:</strong> Continuous ambient noise (like Brown Noise) masks sudden environmental sounds that can break your concentration.</li>
        </ul>
      </SEOContent>

      <AdSlot slotId="content-mid" format="rectangle" className="my-6 mx-auto max-w-3xl px-4" />

      <SEOFAQ 
        faqs={[
          {
            question: "Is 45 minutes better than 25 minutes for studying?",
            answer: "It depends on the subject. For reading dense material, coding, or writing essays, 45-50 minutes is often better because context switching takes time. For flashcards or rapid review, 25 minutes might be enough."
          },
          {
            question: "What should I do during the 15-minute break?",
            answer: "Step away from your screen. Get water, stretch, or look out a window. Giving your eyes a break from close-up focusing is critical to avoid fatigue."
          }
        ]}
      />

      <SEOCta 
        headline="Supercharge Your Study Sessions"
        subheadline="Use our full app to track your study hours, set tasks, and play focus-enhancing binaural beats."
        buttonText="Start 45m Study Session"
        href="/app?timer=45"
      />
    </>
  );
}
