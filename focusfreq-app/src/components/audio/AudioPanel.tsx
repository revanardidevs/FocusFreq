import { AudioMode, AudioSettings, NoiseType, WaveformType } from '@/types';

interface AudioPanelProps {
  settings: AudioSettings;
  isPreviewing: boolean;
  updateSettings: (updates: Partial<AudioSettings>) => void;
  updateTone: (updates: Partial<AudioSettings['tone']>) => void;
  updateBinaural: (updates: Partial<AudioSettings['binaural']>) => void;
  updateNoise: (updates: Partial<AudioSettings['noise']>) => void;
  togglePreview: () => void;
  stopPreview: () => void;
  onClose: () => void;
}

export default function AudioPanel({
  settings,
  isPreviewing,
  updateSettings,
  updateTone,
  updateBinaural,
  updateNoise,
  togglePreview,
  stopPreview,
  onClose,
}: AudioPanelProps) {
  const modes = [
    { id: AudioMode.NONE, label: 'None' },
    { id: AudioMode.TONE, label: 'Tone' },
    { id: AudioMode.BINAURAL, label: 'Binaural' },
    { id: AudioMode.NOISE, label: 'Noise' },
  ];

  const presets = [40, 432, 440, 528, 963];

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    if (val < 1) val = 1;
    if (val > 20000) val = 20000;
    updateTone({ frequencyHz: val });
  };

  const handleBaseHzChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    if (val < 1) val = 1;
    if (val > 20000) val = 20000;
    updateBinaural({ baseHz: val });
  };

  const handleBeatHzChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    if (val < 1) val = 1;
    if (val > 1000) val = 1000;
    updateBinaural({ beatHz: val });
  };

  return (
    <div className="rounded-[20px] border border-surface-200 bg-white p-6 shadow-card relative animate-in zoom-in-95 duration-200">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
        title="Close settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      <h3 className="text-lg font-semibold text-text-primary mb-4">Audio Settings</h3>

      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => updateSettings({ mode: mode.id })}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              settings.mode === mode.id
                ? 'bg-focus text-white shadow-sm'
                : 'bg-surface-100 text-text-primary hover:bg-surface-200 border border-surface-200'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Tone Settings */}
      {settings.mode === AudioMode.TONE && (
        <div className="space-y-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Frequency (Hz)
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                min="1"
                max="20000"
                value={settings.tone.frequencyHz}
                onChange={handleFrequencyChange}
                className="w-24 rounded-lg border border-surface-200 bg-white px-3 py-2 text-text-primary font-medium outline-none focus:border-focus focus:ring-1 focus:ring-focus/20"
              />
              <input
                type="range"
                min="1"
                max="2000"
                value={settings.tone.frequencyHz}
                onChange={handleFrequencyChange}
                className="flex-1"
                style={{ accentColor: '#F05A3C' }}
              />
            </div>
            {settings.tone.frequencyHz > 10000 && (
              <p className="text-xs text-warning bg-warning/10 px-3 py-2 rounded-lg mt-3">
                High frequencies may be uncomfortable. Use low volume.
              </p>
            )}
            <div className="flex gap-2 mt-3 flex-wrap">
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => updateTone({ frequencyHz: preset })}
                  className="px-3 py-1.5 text-xs font-medium rounded-md border border-surface-200 bg-white text-text-primary hover:bg-focus-soft hover:border-focus-border hover:text-focus transition-colors"
                >
                  {preset} Hz
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Waveform
            </label>
            <div className="flex gap-2 flex-wrap">
              {Object.values(WaveformType).map((wf) => (
                <button
                  key={wf}
                  onClick={() => updateTone({ waveform: wf })}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors capitalize border ${
                    settings.tone.waveform === wf
                      ? 'bg-focus-soft text-focus font-bold border-focus-border shadow-sm'
                      : 'bg-white text-text-secondary border-surface-200 hover:bg-surface-50 hover:text-text-primary'
                  }`}
                >
                  {wf}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Binaural Settings */}
      {settings.mode === AudioMode.BINAURAL && (
        <div className="space-y-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm text-focus bg-focus-soft px-3 py-2 rounded-lg inline-block mb-2 border border-focus-border">
            🎧 Binaural mode works best with headphones.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Base Freq (Hz)
              </label>
              <input
                type="number"
                min="1"
                max="20000"
                value={settings.binaural.baseHz}
                onChange={handleBaseHzChange}
                className="w-full rounded-lg border border-surface-200 bg-white px-3 py-2 text-text-primary font-medium outline-none focus:border-focus focus:ring-1 focus:ring-focus/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Beat Freq (Hz)
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={settings.binaural.beatHz}
                onChange={handleBeatHzChange}
                className="w-full rounded-lg border border-surface-200 bg-white px-3 py-2 text-text-primary font-medium outline-none focus:border-focus focus:ring-1 focus:ring-focus/20"
              />
            </div>
          </div>
          <div className="text-sm text-text-secondary bg-surface-50 p-3 rounded-lg border border-surface-200 mt-2 flex justify-between">
            <span><strong>Left:</strong> {settings.binaural.baseHz} Hz</span>
            <span><strong>Right:</strong> {settings.binaural.baseHz + settings.binaural.beatHz} Hz</span>
          </div>
        </div>
      )}

      {/* Noise Settings */}
      {settings.mode === AudioMode.NOISE && (
        <div className="space-y-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Noise Type
            </label>
            <div className="flex gap-2 flex-wrap">
              {Object.values(NoiseType).map((type) => (
                <button
                  key={type}
                  onClick={() => updateNoise({ type })}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors capitalize border ${
                    settings.noise.type === type
                      ? 'bg-focus-soft text-focus font-bold border-focus-border shadow-sm'
                      : 'bg-white text-text-secondary border-surface-200 hover:bg-surface-50 hover:text-text-primary'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global Volume & Preview (Only show if a sound mode is selected) */}
      {settings.mode !== AudioMode.NONE && (
        <div className="pt-6 border-t border-surface-200 space-y-5">
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-semibold text-text-primary">
                Volume: {Math.round(settings.volume * 100)}%
              </label>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={settings.volume}
              onChange={(e) => updateSettings({ volume: parseFloat(e.target.value) })}
              className="w-full"
              style={{ accentColor: '#F05A3C' }}
            />
            <p className="text-xs text-text-secondary mt-2">
              Use a comfortable volume. Stop if you feel discomfort.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-0 pt-2">
            <button
              onClick={togglePreview}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:py-2 rounded-xl sm:rounded-lg text-sm font-bold transition-all shadow-sm ${
                isPreviewing 
                  ? 'bg-danger/10 text-danger hover:bg-danger/20 ring-1 ring-danger/30' 
                  : 'bg-surface-100 text-text-primary hover:bg-surface-200 ring-1 ring-surface-200'
              }`}
            >
              {isPreviewing ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-4 sm:h-4">
                    <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
                  </svg>
                  Stop Preview
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-4 sm:h-4">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                  Preview Audio
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
