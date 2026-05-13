import type { Metadata } from 'next';
import SEOHero from '@/components/seo/SEOHero';
import SEOContent from '@/components/seo/SEOContent';
import SEOFAQ from '@/components/seo/SEOFAQ';
import SEOCta from '@/components/seo/SEOCta';
import EmbeddedAudioPlayer from '@/components/seo/EmbeddedAudioPlayer';
import AdSlot from '@/components/ads/AdSlot';
import { AudioMode, WaveformType } from '@/types';

export const metadata: Metadata = {
  title: 'Online Tone Generator | Pure Sine Wave Frequency Generator',
  description: 'Generate pure tones and frequencies online. A free, easy-to-use tone generator for focus, relaxation, and audio testing.',
};

export default function ToneGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FocusFreq Tone Generator",
    "description": "An online tone and frequency generator.",
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
        h1="Online Tone Generator" 
        description="Generate pure audio frequencies instantly in your browser. Play the 432 Hz focus tone below or launch the app for full frequency control."
        badge="Audio Tool"
      />

      <section className="bg-surface-50 py-12 border-b border-surface-200">
        <EmbeddedAudioPlayer 
          title="432 Hz Pure Tone"
          initialSettings={{
            mode: AudioMode.TONE,
            tone: { frequencyHz: 432, waveform: WaveformType.SINE }
          }} 
        />
      </section>

      <AdSlot slotId="after-widget" format="horizontal" className="my-6 mx-auto max-w-5xl px-4" />

      <SEOContent title="What is an Online Tone Generator?">
        <p>
          An online tone generator uses your browser's built-in Web Audio API to synthesize sound waves mathematically. 
          Unlike playing an MP3 or YouTube video, a synthesized tone is perfectly pure, never compresses, and loops infinitely without any gaps or buffering.
        </p>
        <p className="mt-4">
          People use tone generators for a variety of reasons, including focusing during work, testing audio equipment, tuning instruments, and masking background noise.
        </p>
      </SEOContent>

      <AdSlot slotId="content-mid" format="rectangle" className="my-6 mx-auto max-w-3xl px-4" />

      <SEOFAQ 
        faqs={[
          {
            question: "Is it safe to listen to pure tones?",
            answer: "Yes, but always practice safe listening habits. Start with your device volume at the lowest setting and slowly increase it until it is comfortable. Never listen at maximum volume, especially with headphones."
          },
          {
            question: "What is a sine wave?",
            answer: "A sine wave is the purest and simplest type of sound wave. It has no harmonics or overtones, resulting in a smooth, clean sound. It's the most common waveform used for focus and relaxation."
          }
        ]}
      />

      <SEOCta 
        headline="Unlock All Frequencies"
        subheadline="Need a different frequency? Open the full FocusFreq app to manually input any frequency from 1 Hz to 20,000 Hz."
        buttonText="Open Frequency Generator"
        href="/app?audioMode=tone&hz=432&waveform=sine"
      />
    </>
  );
}
