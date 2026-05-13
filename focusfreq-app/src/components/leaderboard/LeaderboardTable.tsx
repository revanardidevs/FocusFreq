'use client';

interface LeaderboardEntry {
  rank: number;
  display_name: string;
  focus_minutes: number;
  completed_sessions: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  isConfigured: boolean;
}

function formatFocusTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function getRankBadge(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
}

export default function LeaderboardTable({ entries, isLoading, isConfigured }: LeaderboardTableProps) {
  if (!isConfigured) {
    return (
      <div className="rounded-[28px] border border-surface-200 bg-white p-12 text-center shadow-card">
        <p className="text-text-muted text-lg">Leaderboard is not available yet.</p>
        <p className="text-text-muted text-sm mt-2">Backend configuration required.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-[28px] border border-surface-200 bg-white p-12 text-center shadow-card">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-surface-300 border-t-focus" />
        <p className="text-text-muted mt-4">Loading leaderboard...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-[28px] border border-surface-200 bg-white p-12 text-center shadow-card">
        <div className="text-4xl mb-4">🏆</div>
        <p className="text-text-primary text-lg font-semibold">No entries yet</p>
        <p className="text-text-muted text-sm mt-2">
          Complete a focus session and set a display name to be the first on the leaderboard!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-surface-200 bg-white shadow-card overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-surface-200 text-xs font-semibold text-text-muted uppercase tracking-wider sm:px-6">
        <div className="col-span-2">Rank</div>
        <div className="col-span-5">Name</div>
        <div className="col-span-3 text-right">Focus Time</div>
        <div className="col-span-2 text-right">Sessions</div>
      </div>

      {/* Entries */}
      <div className="divide-y divide-surface-200">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className={`grid grid-cols-12 gap-2 px-4 py-4 items-center transition-colors hover:bg-surface-50 sm:px-6 ${
              entry.rank <= 3 ? 'bg-focus-soft' : ''
            }`}
          >
            <div className="col-span-2 text-lg font-bold text-text-primary">
              {getRankBadge(entry.rank)}
            </div>
            <div className="col-span-5 font-medium text-text-primary truncate">
              {entry.display_name}
            </div>
            <div className="col-span-3 text-right font-semibold text-focus">
              {formatFocusTime(entry.focus_minutes)}
            </div>
            <div className="col-span-2 text-right text-text-muted text-sm">
              {entry.completed_sessions}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-surface-200 text-center sm:px-6">
        <p className="text-xs text-text-muted">
          Top {entries.length} users by weekly focus time · Updated in real-time
        </p>
      </div>
    </div>
  );
}
