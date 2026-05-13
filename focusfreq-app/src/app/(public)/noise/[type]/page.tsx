import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SEOHero from '@/components/seo/SEOHero';
import SEOContent from '@/components/seo/SEOContent';
import SEOFAQ from '@/components/seo/SEOFAQ';
import SEOCta from '@/components/seo/SEOCta';
import EmbeddedAudioPlayer from '@/components/seo/EmbeddedAudioPlayer';
import AdSlot from '@/components/ads/AdSlot';
import { AudioMode, NoiseType } from '@/types';

const noiseTypes = ['brown', 'white', 'pink'];

export function generateStaticParams() {
  return noiseTypes.map((type) => ({
    type,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const type = (await params).type;
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)} Noise Generator Online`;
  const description = `Listen to pure ${type} noise online. Free, seamless background noise generator for deep work, studying, and relaxation.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    }
  };
}

export default async function NoisePage({ params }: { params: Promise<{ type: string }> }) {
  const type = (await params).type as NoiseType;
  
  if (!noiseTypes.includes(type)) {
    return <div className="text-center py-24 text-text-muted">Invalid noise type.</div>;
  }

  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `FocusFreq ${capitalizedType} Noise`,
    "description": `An online ${capitalizedType} noise generator.`,
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
        h1={`${capitalizedType} Noise Generator`} 
        description={`Play seamless, mathematically generated ${type} noise in your browser to mask distractions.`}
        badge="Focus Noise"
      />

      <section className="bg-surface-50 py-12 border-b border-surface-200">
        <EmbeddedAudioPlayer 
          title={`${capitalizedType} Noise`}
          initialSettings={{
            mode: AudioMode.NOISE,
            noise: { type }
          }} 
        />
      </section>

      <AdSlot slotId="after-widget" format="horizontal" className="my-6 mx-auto max-w-5xl px-4" />

      <SEOContent title={`About ${capitalizedType} Noise`}>
        <p>
          This tool generates pure {type} noise dynamically using your browser's audio engine. 
          Because it is generated on the fly, it never loops, never buffers, and will play continuously as long as you leave the tab open.
        </p>
        <p className="mt-4">
          <strong>White Noise</strong> contains all frequencies across the spectrum of human hearing in equal measure. <br/>
          <strong>Pink Noise</strong> is louder at low frequencies and softer at high frequencies. <br/>
          <strong>Brown Noise</strong> drops off even faster at high frequencies, creating a deep, rumbling sound.
        </p>
      </SEOContent>

      <AdSlot slotId="content-mid" format="rectangle" className="my-6 mx-auto max-w-3xl px-4" />

      <SEOFAQ
        faqs={[
          {
            question: `Is ${type} noise safe to listen to for long periods?`,
            answer: `Yes, ${type} noise is safe at comfortable volume levels. Always start at a low volume and increase gradually. Take breaks if you experience any discomfort or ringing in your ears.`
          },
          {
            question: `Can I use ${type} noise while sleeping?`,
            answer: `Many people use background noise as a sleep aid. However, FocusFreq is designed primarily as a productivity tool. If you use it for sleep, keep the volume low and comfortable.`
          }
        ]}
      />

      <SEOCta 
        headline={`Combine ${capitalizedType} Noise with a Timer`}
        subheadline={`Open the full FocusFreq app to run a focus session while listening to ${type} noise.`}
        buttonText="Open Focus Workspace"
        href={`/app?audioMode=noise&noise=${type}`}
      />
    </>
  );
}
