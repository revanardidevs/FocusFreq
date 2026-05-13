'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
}

interface Profile {
  display_name: string | null;
  is_public: boolean;
}

/**
 * Hook for anonymous auth + profile management.
 * Only initializes when Supabase is configured.
 * Falls back gracefully when backend is unavailable.
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: isSupabaseConfigured,
    isConfigured: isSupabaseConfigured,
  });
  const [profile, setProfile] = useState<Profile | null>(null);

  // Initialize anonymous auth
  useEffect(() => {
    if (!supabase) return;
    const client = supabase; // Narrow type for TS inside async closure

    const initAuth = async () => {
      try {
        // Check for existing user (getUser validates JWT server-side)
        const { data: { user: existingUser } } = await client.auth.getUser();

        if (existingUser) {
          setAuthState({ user: existingUser, isLoading: false, isConfigured: true });
          await fetchProfile(existingUser.id);
        } else {
          // Sign in anonymously
          const { data, error } = await client.auth.signInAnonymously();
          if (error) {
            console.warn('[FocusFreq] Anonymous auth failed:', error.message);
            setAuthState({ user: null, isLoading: false, isConfigured: true });
            return;
          }
          if (data.user) {
            setAuthState({ user: data.user, isLoading: false, isConfigured: true });
            await fetchProfile(data.user.id);
          }
        }
      } catch (err) {
        console.warn('[FocusFreq] Auth initialization failed:', err);
        setAuthState({ user: null, isLoading: false, isConfigured: true });
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = client.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user ?? null;
        setAuthState(prev => ({ ...prev, user }));
        if (user) await fetchProfile(user.id);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, is_public')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data);
      }
    } catch (err) {
      console.warn('[FocusFreq] Failed to fetch profile:', err);
    }
  };

  const updateDisplayName = useCallback(async (displayName: string) => {
    if (!supabase || !authState.user) return { error: 'Not authenticated' };

    const trimmed = displayName.trim();
    if (trimmed.length < 3 || trimmed.length > 24) {
      return { error: 'Display name must be 3-24 characters' };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: trimmed,
          is_public: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', authState.user.id);

      if (error) return { error: error.message };

      setProfile(prev => prev ? { ...prev, display_name: trimmed, is_public: true } : { display_name: trimmed, is_public: true });
      return { error: null };
    } catch (err) {
      return { error: 'Failed to update profile' };
    }
  }, [authState.user]);

  const togglePublic = useCallback(async (isPublic: boolean) => {
    if (!supabase || !authState.user) return;

    try {
      await supabase
        .from('profiles')
        .update({ is_public: isPublic, updated_at: new Date().toISOString() })
        .eq('id', authState.user.id);

      setProfile(prev => prev ? { ...prev, is_public: isPublic } : null);
    } catch (err) {
      console.warn('[FocusFreq] Failed to toggle public:', err);
    }
  }, [authState.user]);

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    isConfigured: authState.isConfigured,
    profile,
    updateDisplayName,
    togglePublic,
  };
}
