'use client';

import { useState, useCallback, useEffect } from 'react';
import { type FocusSession, type HistoryStats } from '@/types';
import { historyService } from '@/services/historyService';
import { trackEvent } from '@/lib/analytics';

interface UseSessionsReturn {
  historyStats: HistoryStats;
  recentSessions: FocusSession[];
  completedSessions: FocusSession[];
  abandonedSessions: FocusSession[];
  todaySessions: FocusSession[];
  isLoading: boolean;
  refresh: () => void;
}

export function useSessions(): UseSessionsReturn {
  const [historyStats, setHistoryStats] = useState<HistoryStats>({
    todayFocusMinutes: 0,
    todayCompletedSessions: 0,
    todayAbandonedSessions: 0,
    weeklyFocusMinutes: 0,
    weeklyCompletedSessions: 0,
    currentStreak: 0,
    mostUsedAudio: null,
  });
  const [recentSessions, setRecentSessions] = useState<FocusSession[]>([]);
  const [completedSessions, setCompletedSessions] = useState<FocusSession[]>([]);
  const [abandonedSessions, setAbandonedSessions] = useState<FocusSession[]>([]);
  const [todaySessions, setTodaySessions] = useState<FocusSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setHistoryStats(historyService.getHistoryStats());
    setRecentSessions(historyService.getRecentSessions(50));
    setCompletedSessions(historyService.getCompletedSessions());
    setAbandonedSessions(historyService.getAbandonedSessions());
    setTodaySessions(historyService.getTodaySessions());
  }, []);

  useEffect(() => {
    refresh();
    setIsLoading(false);
    trackEvent({ name: 'history_viewed', properties: {} });
  }, [refresh]);

  return {
    historyStats,
    recentSessions,
    completedSessions,
    abandonedSessions,
    todaySessions,
    isLoading,
    refresh,
  };
}
