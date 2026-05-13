import type { Metadata } from 'next';
import SEOHero from '@/components/seo/SEOHero';
import SEOContent from '@/components/seo/SEOContent';
import SEOFAQ from '@/components/seo/SEOFAQ';
import SEOCta from '@/components/seo/SEOCta';
import EmbeddedAudioPlayer from '@/components/seo/EmbeddedAudioPlayer';
import AdSlot from '@/components/ads/AdSlot';
import { AudioMode, NoiseType } from '@/types';

export const metadata: Metadata = {
  title: 'Background Noise Generator | Brown, White & Pink Noise',
  description: 'Generate endless, seamless background noise for focus, studying, and sleep. Free online brown noise, pink noise, and white noise generator.',
};

export default function NoiseGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FocusFreq Noise Generator",
    "description": "An online background noise generator featuring brown, white, and pink noise.",
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
        h1="Background Noise Generator" 
        description="Block out distractions and instantly find your flow state. Preview our deep, rumbling Brown Noise below."
        badge="Focus Audio"
      />

      <section className="bg-surface-50 py-12 border-b border-surface-200">
        <EmbeddedAudioPlayer 
          title="Pure Brown Noise"
          initialSettings={{
            mode: AudioMode.NOISE,
            noise: { type: NoiseType.BROWN }
          }} 
        />
      </section>

      <AdSlot slotId="after-widget" format="horizontal" className="my-6 mx-auto max-w-5xl px-4" />

      <SEOContent title="How Background Noise Helps You Focus">
        <p>
          It isn't actually noise that distracts you; it's the <em>sudden change</em> in noise. 
          When you are working in a quiet room, the sound of a door slamming, a dog barking, or a sudden conversation triggers your brain's orienting response, breaking your focus.
        </p>
        <p className="mt-4">
          Continuous background noise, like Brown or White noise, works by raising the ambient sound floor. 
          This process, called "sound masking," makes sudden noises blend into the background, preventing them from catching your attention.
        </p>
      </SEOContent>

      <AdSlot slotId="content-mid" format="rectangle" className="my-6 mx-auto max-w-3xl px-4" />

      <SEOFAQ 
        faqs={[
          {
            question: "What is the difference between White, Pink, and Brown noise?",
            answer: "White noise contains all frequencies at equal intensity, sounding like static or a TV with no signal. Pink noise reduces the high frequencies, sounding like heavy rainfall. Brown noise reduces high frequencies even further, creating a deep, rumbling sound similar to a distant waterfall or heavy ocean waves."
          },
          {
            question: "Which noise color is best for studying?",
            answer: "Most users prefer Brown noise for studying and deep work. Its lack of high-pitched frequencies makes it less fatiguing to listen to for long periods compared to White noise."
          }
        ]}
      />

      <SEOCta 
        headline="Focus With Background Noise"
        subheadline="Combine continuous background noise with our built-in focus timer in the free FocusFreq app."
        buttonText="Start Focusing with Brown Noise"
        href="/app?audioMode=noise&noise=brown"
      />
    </>
  );
}
