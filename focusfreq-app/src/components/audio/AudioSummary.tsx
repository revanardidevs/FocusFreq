import { AudioMode, AudioSettings } from '@/types';

interface AudioSummaryProps {
  settings: AudioSettings;
  onOpenPanel: () => void;
}

export default function AudioSummary({ settings, onOpenPanel }: AudioSummaryProps) {
  const getSummaryText = () => {
    const volumeText = `${Math.round(settings.volume * 100)}%`;
    switch (settings.mode) {
      case AudioMode.NONE:
        return 'Audio: No Audio';
      case AudioMode.TONE:
        return `Audio: ${settings.tone.frequencyHz} Hz · ${
          settings.tone.waveform.charAt(0).toUpperCase() + settings.tone.waveform.slice(1)
        } · ${volumeText}`;
      case AudioMode.BINAURAL:
        return `Audio: Binaural ${settings.binaural.baseHz}/${
          settings.binaural.baseHz + settings.binaural.beatHz
        } Hz · ${volumeText}`;
      case AudioMode.NOISE:
        return `Audio: ${
          settings.noise.type.charAt(0).toUpperCase() + settings.noise.type.slice(1)
        } Noise · ${volumeText}`;
    }
  };

  const hasAudio = settings.mode !== AudioMode.NONE;

  return (
    <button
      onClick={onOpenPanel}
      className={`group flex items-center gap-3 text-sm transition-all px-4 py-3 rounded-[16px] border hover:shadow-soft w-full max-w-sm mx-auto ${
        hasAudio ? 'bg-focus-soft border-focus-border' : 'bg-white border-surface-200'
      }`}
      style={
        hasAudio
          ? {
              background: 'linear-gradient(135deg, #FFF7F5, #FFFFFF)',
              borderColor: '#FFC9BA',
            }
          : {}
      }
    >
      {/* Icon block */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
          hasAudio ? 'bg-[#FFC9BA]' : 'bg-surface-100'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${hasAudio ? 'text-focus' : 'text-text-muted'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      </div>

      <span className={`text-[14px] truncate ${hasAudio ? 'text-focus' : 'text-text-primary group-hover:text-text-strong transition-colors'}`}>
        {hasAudio ? (
          <>
            <span className="font-bold text-text-strong mr-1">Audio:</span>
            <span className="font-medium text-focus">{getSummaryText().replace('Audio: ', '')}</span>
          </>
        ) : (
          <span className="font-bold text-text-strong">Audio: No Audio</span>
        )}
      </span>
      <div
        className={`ml-auto font-medium text-[13px] px-3 py-1.5 rounded-[10px] transition-all ${
          hasAudio ? 'bg-white border border-surface-200 text-text-strong hover:bg-surface-50' : 'bg-surface-100 border border-surface-200 text-text-muted hover:text-focus'
        }`}
      >
        {hasAudio ? 'Change' : 'Choose'}
      </div>
    </button>
  );
}
