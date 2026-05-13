import type { Metadata } from 'next';
import SEOHero from '@/components/seo/SEOHero';
import SEOContent from '@/components/seo/SEOContent';
import SEOFAQ from '@/components/seo/SEOFAQ';
import SEOCta from '@/components/seo/SEOCta';
import EmbeddedAudioPlayer from '@/components/seo/EmbeddedAudioPlayer';
import AdSlot from '@/components/ads/AdSlot';
import { AudioMode } from '@/types';

export const metadata: Metadata = {
  title: 'Binaural Beat Generator Online | Alpha & Theta Brainwaves',
  description: 'Generate customizable binaural beats for focus, study, and meditation. Free online tool to synthesize brainwave entrainment frequencies.',
};

export default function BinauralBeatGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FocusFreq Binaural Beat Generator",
    "description": "An online binaural beat generator.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <SEOHero 
        h1="Binaural Beat Generator" 
        description="Generate focus-enhancing binaural beats instantly. Preview a 10 Hz Alpha state beat below, or open the app to customize the base and beat frequencies."
        badge="Brainwave Audio"
      />

      <section className="bg-surface-50 py-12 border-b border-surface-200">
        <EmbeddedAudioPlayer 
          title="10 Hz Alpha Binaural Beat (Requires Headphones)"
          initialSettings={{
            mode: AudioMode.BINAURAL,
            binaural: { baseHz: 200, beatHz: 10 }
          }} 
        />
      </section>

      <AdSlot slotId="after-widget" format="horizontal" className="my-6 mx-auto max-w-5xl px-4" />

      <SEOContent title="What are Binaural Beats?">
        <p>
          Binaural beats are an auditory illusion perceived when two different pure-tone sine waves are presented to a listener, one through each ear. 
          For example, if a 200 Hz tone is played in your left ear, and a 210 Hz tone is played in your right ear, your brain perceives a third tone beating at 10 Hz.
        </p>
        <p className="mt-4 text-warning font-semibold">
          Important: Binaural beats require stereo headphones to work. If you listen through a speaker, the tones will mix in the air before reaching your ears, destroying the effect.
        </p>
      </SEOContent>

      <AdSlot slotId="content-mid" format="rectangle" className="my-6 mx-auto max-w-3xl px-4" />

      <SEOFAQ 
        faqs={[
          {
            question: "Do binaural beats actually help you focus?",
            answer: "Many people report that listening to Alpha (8-13 Hz) or Beta (14-30 Hz) binaural beats helps them maintain concentration while studying or working. The repetitive, rhythmic nature of the perceived beat acts similarly to background noise, masking distractions and providing a steady auditory anchor."
          },
          {
            question: "What is the best base frequency to use?",
            answer: "The base frequency is the carrier tone. Most users find a base frequency between 150 Hz and 300 Hz to be the most comfortable to listen to for extended periods. FocusFreq defaults to a soothing 200 Hz base."
          }
        ]}
      />

      <SEOCta 
        headline="Customize Your Brainwaves"
        subheadline="Open the full app to adjust the base and beat frequencies manually, and combine your binaural beats with a focus timer."
        buttonText="Open Binaural Generator"
        href="/app?audioMode=binaural&baseHz=200&beatHz=10"
      />
    </>
  );
}
