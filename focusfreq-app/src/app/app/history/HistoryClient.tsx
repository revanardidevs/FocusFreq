'use client';

import { useState } from 'react';
import { useSessions } from '@/hooks/useSessions';
import OverviewStats from '@/components/history/OverviewStats';
import SessionList from '@/components/history/SessionList';

type Tab = 'all' | 'completed' | 'abandoned';

export default function HistoryClient() {
  const { recentSessions, completedSessions, abandonedSessions, isLoading } = useSessions();
  const [activeTab, setActiveTab] = useState<Tab>('all');

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-24 rounded-[20px] bg-surface-100" />
        <div className="space-y-3">
          <div className="h-4 w-32 rounded bg-surface-200" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-surface-100" />
          ))}
        </div>
      </div>
    );
  }

  const getSessionsForTab = () => {
    switch (activeTab) {
      case 'completed': return completedSessions;
      case 'abandoned': return abandonedSessions;
      case 'all':
      default:
        return recentSessions;
    }
  };

  const displayedSessions = getSessionsForTab();

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'completed', label: 'Completed' },
    { key: 'abandoned', label: 'Abandoned' },
  ];

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Your Progress
        </h2>
        <OverviewStats />
      </section>

      {/* Session Log with Tabs */}
      <section>
        <div className="mb-4 flex items-center border-b border-surface-200 pb-2">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-sm font-medium transition-colors pb-2 -mb-[9px] ${
                  activeTab === tab.key 
                    ? 'text-focus border-b-2 border-focus' 
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <SessionList 
          sessions={displayedSessions} 
          title={activeTab === 'all' ? 'Recent Sessions' : activeTab === 'completed' ? 'Completed Sessions' : 'Abandoned Sessions'} 
        />
      </section>
    </div>
  );
}
