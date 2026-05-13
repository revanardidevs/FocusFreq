import type { Metadata } from 'next';
import HistoryClient from './HistoryClient';

export const metadata: Metadata = {
  title: 'History & Stats',
  description: 'View your FocusFreq session history, focus minutes, and completion stats.',
};

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">History & Stats</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Track your focus sessions and productivity over time.
        </p>
      </div>

      <HistoryClient />
    </div>
  );
}
