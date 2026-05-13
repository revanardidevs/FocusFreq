import { FocusFreqSettings, FocusFreqSettingsSchema, DEFAULT_SETTINGS } from '@/types/settings';

const SETTINGS_KEY = 'focusfreq_settings';

export const settingsService = {
  getSettings(): FocusFreqSettings {
    if (typeof window === 'undefined') {
      return DEFAULT_SETTINGS;
    }

    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (!stored) {
        return DEFAULT_SETTINGS;
      }
      
      const parsed = JSON.parse(stored);
      // Use Zod safeParse which will automatically catch invalid values and use defaults
      const result = FocusFreqSettingsSchema.safeParse(parsed);
      
      if (result.success) {
        return result.data;
      } else {
        console.warn('Settings validation failed, merging with defaults', result.error);
        return { ...DEFAULT_SETTINGS, ...parsed }; // fallback
      }
    } catch (error) {
      console.error('Failed to parse settings from localStorage', error);
      return DEFAULT_SETTINGS;
    }
  },

  updateSettings(partial: Partial<FocusFreqSettings>): FocusFreqSettings {
    const current = this.getSettings();
    const updated = { ...current, ...partial };
    
    // Safety clamp values with Zod
    const result = FocusFreqSettingsSchema.safeParse(updated);
    let finalSettings = updated as FocusFreqSettings;
    
    if (result.success) {
      finalSettings = result.data;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(finalSettings));
      
      // Dispatch a custom event so hooks can listen to changes across the app
      window.dispatchEvent(new Event('focusfreq_settings_updated'));
    }
    
    return finalSettings;
  }
};
