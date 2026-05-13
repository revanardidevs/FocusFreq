import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SEOHero from '@/components/seo/SEOHero';
import SEOContent from '@/components/seo/SEOContent';
import SEOFAQ from '@/components/seo/SEOFAQ';
import SEOCta from '@/components/seo/SEOCta';
import EmbeddedAudioPlayer from '@/components/seo/EmbeddedAudioPlayer';
import AdSlot from '@/components/ads/AdSlot';
import { AudioMode, WaveformType } from '@/types';

// P0 frequencies only — high search volume, neutral copy, no spiritual/healing risk
const popularFrequencies = ['432', '528', '40'];

export function generateStaticParams() {
  return popularFrequencies.map((hz) => ({
    hz,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ hz: string }> }): Promise<Metadata> {
  const hz = (await params).hz;
  const title = `${hz} Hz Pure Tone Generator Online`;
  const description = `Listen to a pure ${hz} Hz sine wave tone online. Free frequency generator for audio testing, focus, and personal listening.`;
  
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

export default async function FrequencyPage({ params }: { params: Promise<{ hz: string }> }) {
  const hz = (await params).hz;
  const hzNum = parseInt(hz, 10);
  
  if (isNaN(hzNum) || hzNum < 1 || hzNum > 20000) {
    return <div className="text-center py-24 text-text-muted">Invalid frequency. Please enter a value between 1 and 20000.</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `FocusFreq ${hzNum} Hz Tone`,
    "description": `An online ${hzNum} Hz frequency tone generator.`,
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
        h1={`${hzNum} Hz Pure Tone`} 
        description={`Play a mathematically pure ${hzNum} Hertz sine wave directly in your browser.`}
        badge="Frequency Generator"
      />

      <section className="bg-surface-50 py-12 border-b border-surface-200">
        <EmbeddedAudioPlayer 
          title={`${hzNum} Hz Tone`}
          initialSettings={{
            mode: AudioMode.TONE,
            tone: { frequencyHz: hzNum, waveform: WaveformType.SINE }
          }} 
        />
      </section>

      <AdSlot slotId="after-widget" format="horizontal" className="my-6 mx-auto max-w-5xl px-4" />

      <SEOContent title={`The Science of ${hz} Hz`}>
        <p>
          This page synthesizes a pure {hzNum} Hz sine wave using the Web Audio API. 
          A {hzNum} Hz tone means the sound wave vibrates exactly {hzNum} times per second. 
        </p>
        <p className="mt-4">
          Pure sine waves contain no overtones or harmonics. They are the building blocks of all sound. You can use this {hzNum} Hz tone for testing speakers, tuning instruments, masking background noise, or as a focal point during meditation.
        </p>
      </SEOContent>

      <AdSlot slotId="content-mid" format="rectangle" className="my-6 mx-auto max-w-3xl px-4" />

      <SEOFAQ
        faqs={[
          {
            question: `Is it safe to listen to a ${hzNum} Hz tone?`,
            answer: `Yes, pure tones are safe at comfortable volume levels. Always start with your device volume low and increase gradually. Stop listening if you experience any discomfort.`
          },
          {
            question: `What can I use a ${hzNum} Hz tone for?`,
            answer: `Common uses include testing speakers and headphones, tuning musical instruments, masking distracting background noise, and as an ambient sound during focus sessions.`
          }
        ]}
      />

      <SEOCta 
        headline={`Take the ${hzNum} Hz Tone with You`}
        subheadline={`Open the full FocusFreq app to play the ${hzNum} Hz tone while running a Pomodoro timer and tracking your sessions.`}
        buttonText="Open Full App"
        href={`/app?audioMode=tone&hz=${hzNum}&waveform=sine`}
      />
    </>
  );
}
