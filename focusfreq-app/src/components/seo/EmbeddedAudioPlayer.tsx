'use client';

import React, { useEffect } from 'react';
import { useAudio } from '@/hooks/useAudio';
import { AudioMode, AudioSettings } from '@/types';

const PlayIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const StopIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
  </svg>
);

interface EmbeddedAudioPlayerProps {
  initialSettings: Partial<AudioSettings>;
  title: string;
}

export default function EmbeddedAudioPlayer({ initialSettings, title }: EmbeddedAudioPlayerProps) {
  const { settings, isPreviewing, updateSettings, togglePreview, stopPreview } = useAudio();

  // Initialize with the provided settings
  useEffect(() => {
    updateSettings(initialSettings);
    // Cleanup on unmount
    return () => {
      stopPreview();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto w-full max-w-md rounded-[20px] border border-surface-200 bg-white p-6 shadow-card">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-muted mb-6">Safe volume pre-configured. Use headphones for best results.</p>
        
        <button
          onClick={togglePreview}
          className={`flex h-20 w-20 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 ${
            isPreviewing ? 'bg-danger text-white' : 'text-white'
          }`}
          aria-label={isPreviewing ? "Stop audio" : "Play audio"}
          style={!isPreviewing ? { background: 'linear-gradient(135deg, #6C63FF, #8B85FF)' } : undefined}
        >
          {isPreviewing ? (
            <StopIcon className="h-10 w-10" />
          ) : (
            <PlayIcon className="h-10 w-10 translate-x-1" />
          )}
        </button>
        <div className="mt-4 text-xs font-medium uppercase tracking-widest text-text-muted">
          {isPreviewing ? 'Playing' : 'Ready'}
        </div>
      </div>
    </div>
  );
}
