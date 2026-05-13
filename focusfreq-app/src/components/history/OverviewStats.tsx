'use client';

import { historyService } from '@/services/historyService';
import { formatMinutes } from '@/lib/utils';

export default function OverviewStats() {
  const stats = historyService.getHistoryStats();

  const items = [
    { label: 'Today', value: formatMinutes(stats.todayFocusMinutes), accent: 'text-focus' },
    { label: 'Sessions', value: String(stats.todayCompletedSessions), accent: 'text-text-primary' },
    { label: 'Streak', value: `${stats.currentStreak}d`, accent: 'text-break' },
    { label: 'Weekly', value: formatMinutes(stats.weeklyFocusMinutes), accent: 'text-text-primary' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 rounded-[20px] bg-white border border-surface-200 p-4 shadow-soft">
      {items.map((item, i) => (
        <div key={item.label} className={`text-center ${i < items.length - 1 ? 'border-r border-surface-200' : ''}`}>
          <p className="text-xs text-text-muted mb-1">{item.label}</p>
          <p className={`text-lg font-bold ${item.accent}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
