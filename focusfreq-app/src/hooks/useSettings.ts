import { useState, useEffect, useCallback } from 'react';
import { FocusFreqSettings, DEFAULT_SETTINGS } from '@/types/settings';
import { settingsService } from '@/services/settingsService';

export function useSettings() {
  const [settings, setSettings] = useState<FocusFreqSettings>(DEFAULT_SETTINGS);

  const loadSettings = useCallback(() => {
    setSettings(settingsService.getSettings());
  }, []);

  useEffect(() => {
    loadSettings();

    // Listen for custom event triggered by settingsService
    const handleSettingsUpdate = () => {
      loadSettings();
    };

    window.addEventListener('focusfreq_settings_updated', handleSettingsUpdate);
    return () => {
      window.removeEventListener('focusfreq_settings_updated', handleSettingsUpdate);
    };
  }, [loadSettings]);

  const updateSettings = useCallback((partial: Partial<FocusFreqSettings>) => {
    settingsService.updateSettings(partial);
  }, []);

  return {
    settings,
    updateSettings
  };
}
