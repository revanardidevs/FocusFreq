import { AudioMode, AudioSettings } from '@/types';
import styles from './AudioSummary.module.css';

interface AudioSummaryProps {
  settings: AudioSettings;
  isPreviewing?: boolean;
  onOpenPanel: () => void;
  onTogglePreview?: () => void;
  onQuickMode?: (mode: AudioMode, noiseType?: string) => void;
  /** If true, render as a compact pill instead of the full card */
  compact?: boolean;
}

const SoundIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

function getSoundTitle(settings: AudioSettings): string {
  switch (settings.mode) {
    case AudioMode.NOISE:
      return `${settings.noise.type.charAt(0).toUpperCase() + settings.noise.type.slice(1)} Noise`;
    case AudioMode.TONE:
      return `${settings.tone.frequencyHz} Hz`;
    case AudioMode.BINAURAL:
      return 'Binaural';
    default:
      return 'No Audio';
  }
}

function getSoundDesc(settings: AudioSettings): string {
  const vol = `${Math.round(settings.volume * 100)}% volume`;
  switch (settings.mode) {
    case AudioMode.NOISE:
      return `Steady background noise · ${vol}`;
    case AudioMode.TONE:
      return `${settings.tone.waveform.charAt(0).toUpperCase() + settings.tone.waveform.slice(1)} · ${vol}`;
    case AudioMode.BINAURAL:
      return `${settings.binaural.baseHz}/${settings.binaural.baseHz + settings.binaural.beatHz} Hz · ${vol}`;
    default:
      return 'Start silently or choose a focus sound';
  }
}

function getModeLabel(settings: AudioSettings): string {
  switch (settings.mode) {
    case AudioMode.NOISE: return 'Noise';
    case AudioMode.TONE: return 'Tone';
    case AudioMode.BINAURAL: return 'Binaural';
    default: return 'Off';
  }
}

export default function AudioSummary({
  settings,
  isPreviewing,
  onOpenPanel,
  onTogglePreview,
  onQuickMode,
  compact,
}: AudioSummaryProps) {
  const hasAudio = settings.mode !== AudioMode.NONE;

  // Compact pill for running state
  if (compact) {
    return (
      <div className={styles.runningSound}>
        Sound: {getSoundTitle(settings)} · {Math.round(settings.volume * 100)}%
      </div>
    );
  }

  // Quick-select presets matching the mockup
  const presets: { label: string; mode: AudioMode; noise?: string; tone?: number }[] = [
    { label: 'Brown Noise', mode: AudioMode.NOISE, noise: 'brown' },
    { label: 'Pink Noise', mode: AudioMode.NOISE, noise: 'pink' },
    { label: '432 Hz', mode: AudioMode.TONE, tone: 432 },
    { label: '40 Hz', mode: AudioMode.TONE, tone: 40 },
    { label: 'No Audio', mode: AudioMode.NONE },
  ];

  function isPresetActive(p: typeof presets[number]): boolean {
    if (p.mode !== settings.mode) return false;
    if (p.mode === AudioMode.NOISE && p.noise !== settings.noise.type) return false;
    if (p.mode === AudioMode.TONE && p.tone !== settings.tone.frequencyHz) return false;
    return true;
  }

  return (
    <div className={styles.soundCard}>
      {/* Top label row */}
      <div className={styles.soundTop}>
        <div className={styles.soundLabel}>
          <span className={styles.live} />
          Focus Sound
        </div>
        <span className={styles.modeLabel}>{getModeLabel(settings)}</span>
      </div>

      {/* Body: icon + info + actions */}
      <div className={styles.soundBody}>
        <div className={styles.soundMain}>
          <div className={styles.soundIcon}>
            <SoundIcon />
          </div>
          <div>
            <p className={styles.soundTitle}>{getSoundTitle(settings)}</p>
            <p className={styles.soundDesc}>{getSoundDesc(settings)}</p>
          </div>
        </div>
        <div className={styles.soundActions}>
          {onTogglePreview && hasAudio && (
            <button className={styles.preview} onClick={onTogglePreview}>
              {isPreviewing ? 'Playing...' : 'Preview'}
            </button>
          )}
          <button className={styles.change} onClick={onOpenPanel}>
            Change
          </button>
        </div>
      </div>

      {/* Quick presets */}
      {onQuickMode && (
        <div className={styles.soundPresets}>
          {presets.map((p) => (
            <button
              key={p.label}
              className={`${styles.preset} ${isPresetActive(p) ? styles.active : ''}`}
              onClick={() => {
                if (p.mode === AudioMode.NOISE && p.noise) {
                  onQuickMode(AudioMode.NOISE, p.noise);
                } else if (p.mode === AudioMode.TONE && p.tone) {
                  onQuickMode(AudioMode.TONE, String(p.tone));
                } else {
                  onQuickMode(AudioMode.NONE);
                }
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
