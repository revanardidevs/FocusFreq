import type { Metadata } from 'next';
import LeaderboardClient from './LeaderboardClient';

export const metadata: Metadata = {
  title: 'Weekly Focus Leaderboard',
  description:
    'See who is focusing the hardest this week. Join the FocusFreq community leaderboard by completing focus sessions and setting a display name.',
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FocusFreq Leaderboard',
  description: 'Weekly focus time leaderboard for the FocusFreq productivity community.',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'All',
};

export default function LeaderboardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LeaderboardClient />
    </>
  );
}
