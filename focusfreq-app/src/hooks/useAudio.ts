import { useState, useCallback, useEffect } from 'react';
import { AudioMode, AudioSettings, NoiseType, WaveformType } from '@/types';
import { audioEngine } from '@/lib/audioEngine';

const DEFAULT_SETTINGS: AudioSettings = {
  mode: AudioMode.NONE,
  volume: 0.2, // 20% safe default
  tone: {
    frequencyHz: 432,
    waveform: WaveformType.SINE,
  },
  binaural: {
    baseHz: 200,
    beatHz: 10,
  },
  noise: {
    type: NoiseType.BROWN,
  },
};

export function useAudio() {
  const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS);
  const [isPreviewing, setIsPreviewing] = useState(false);

  // Stop preview automatically if settings change, per requirements
  const updateSettings = useCallback((updates: Partial<AudioSettings>) => {
    setSettings((prev) => {
      const newSettings = { ...prev, ...updates };
      return newSettings;
    });
    
    setIsPreviewing((currentlyPreviewing) => {
      if (currentlyPreviewing) {
        audioEngine.stop();
        return false;
      }
      return currentlyPreviewing;
    });
  }, []);

  const updateTone = useCallback((updates: Partial<AudioSettings['tone']>) => {
    updateSettings({ tone: { ...settings.tone, ...updates } });
  }, [settings.tone, updateSettings]);

  const updateBinaural = useCallback((updates: Partial<AudioSettings['binaural']>) => {
    updateSettings({ binaural: { ...settings.binaural, ...updates } });
  }, [settings.binaural, updateSettings]);

  const updateNoise = useCallback((updates: Partial<AudioSettings['noise']>) => {
    updateSettings({ noise: { ...settings.noise, ...updates } });
  }, [settings.noise, updateSettings]);

  const stopPreview = useCallback(() => {
    if (isPreviewing) {
      audioEngine.stop();
      setIsPreviewing(false);
    }
  }, [isPreviewing]);

  const togglePreview = useCallback(async () => {
    if (isPreviewing) {
      stopPreview();
    } else {
      if (settings.mode !== AudioMode.NONE) {
        setIsPreviewing(true);
        await audioEngine.play(settings);
      }
    }
  }, [isPreviewing, settings, stopPreview]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  return {
    settings,
    isPreviewing,
    updateSettings,
    updateTone,
    updateBinaural,
    updateNoise,
    togglePreview,
    stopPreview,
  };
}
