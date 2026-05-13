'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import { fetchWeeklyLeaderboard } from '@/services/supabaseSessionService';
import { isSupabaseConfigured } from '@/lib/supabase';
import AdSlot from '@/components/ads/AdSlot';

interface LeaderboardEntry {
  rank: number;
  display_name: string;
  focus_minutes: number;
  completed_sessions: number;
}

export default function LeaderboardClient() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchWeeklyLeaderboard(50);
      setEntries(data);
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-surface-0 border-b border-surface-200">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
          <span className="inline-block rounded-full bg-primary-600/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary-400 uppercase mb-4">
            Community
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Weekly Focus Leaderboard
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            See who is putting in the most focus time this week.
            Complete sessions in the workspace to climb the ranks.
          </p>
        </div>
      </section>

      <AdSlot slotId="after-widget" format="horizontal" className="my-6 mx-auto max-w-5xl px-4" />

      {/* Leaderboard */}
      <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
        <LeaderboardTable
          entries={entries}
          isLoading={isLoading}
          isConfigured={isSupabaseConfigured}
        />

        <AdSlot slotId="content-mid" format="rectangle" className="my-10 mx-auto max-w-3xl px-4" />

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-text-muted mb-4">
            Want to join the leaderboard? Start a focus session and set your display name.
          </p>
          <Link
            href="/app"
            className="inline-block rounded-[32px] bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-primary-500 hover:shadow-primary-600/30 hover:scale-105 active:scale-95"
          >
            Launch Focus Workspace
          </Link>
        </div>
      </section>
    </div>
  );
}
