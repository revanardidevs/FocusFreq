import type { Metadata } from 'next';
import SEOHero from '@/components/seo/SEOHero';
import SEOContent from '@/components/seo/SEOContent';
import SEOFAQ from '@/components/seo/SEOFAQ';
import SEOCta from '@/components/seo/SEOCta';
import EmbeddedAudioPlayer from '@/components/seo/EmbeddedAudioPlayer';
import AdSlot from '@/components/ads/AdSlot';
import { AudioMode, WaveformType } from '@/types';

export const metadata: Metadata = {
  title: 'Frequency Generator | Play Frequencies 1Hz to 20000Hz',
  description: 'Free online frequency generator. Input any specific frequency between 1 Hz and 20,000 Hz, choose your waveform, and synthesize pure audio instantly.',
};

export default function FrequencyGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FocusFreq Frequency Generator",
    "description": "An online audio frequency generator supporting 1 Hz to 20,000 Hz.",
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
        h1="Free Frequency Generator" 
        description="Synthesize pure audio frequencies from 1 Hz up to 20,000 Hz. Preview a 440 Hz standard tuning tone below, or open the app to input any custom frequency."
        badge="Audio Tool"
      />

      <section className="bg-surface-50 py-12 border-b border-surface-200">
        <EmbeddedAudioPlayer 
          title="440 Hz Pure Tone"
          initialSettings={{
            mode: AudioMode.TONE,
            tone: { frequencyHz: 440, waveform: WaveformType.SINE }
          }} 
        />
      </section>

      <AdSlot slotId="after-widget" format="horizontal" className="my-6 mx-auto max-w-5xl px-4" />

      <SEOContent title="How Does a Frequency Generator Work?">
        <p>
          A frequency generator creates electrical or digital waveforms of a specific frequency, measured in Hertz (Hz). 
          Our online frequency generator uses the Web Audio API to create mathematically perfect waveforms directly in your browser, without needing to download audio files.
        </p>
        <p className="mt-4">
          The human ear can typically hear frequencies ranging from 20 Hz (a deep sub-bass) up to 20,000 Hz (a very high-pitched whine). 
          As we age, our ability to hear the highest frequencies naturally decreases.
        </p>
      </SEOContent>

      <AdSlot slotId="content-mid" format="rectangle" className="my-6 mx-auto max-w-3xl px-4" />

      <SEOFAQ 
        faqs={[
          {
            question: "Can I input custom frequencies?",
            answer: "Yes. While the widget above plays a pre-set 440 Hz tone, opening the full FocusFreq app allows you to type in any exact frequency you need, accurate to 1 Hz."
          },
          {
            question: "What is 440 Hz used for?",
            answer: "440 Hz (often referred to as A440) is the general tuning standard for musical pitch. It serves as the reference frequency for tuning acoustic equipment and musical instruments."
          }
        ]}
      />

      <SEOCta 
        headline="Generate Any Custom Frequency"
        subheadline="Open the full app to access the manual frequency input tool, choose different waveforms, and save your favorite tones."
        buttonText="Open Full Frequency Generator"
        href="/app?audioMode=tone&hz=440&waveform=sine"
      />
    </>
  );
}
