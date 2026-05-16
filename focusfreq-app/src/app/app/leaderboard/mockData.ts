export interface UserEntry {
  rank: number;
  name: string;
  handle: string;
  focusMinutes: number;
  sessions: number;
  streak: number;
  change: string;
  you: boolean;
}

export const users: Record<string, UserEntry[]> = {
  week: [
    { rank: 1, name: 'Alex', handle: '@deepworkalex', focusMinutes: 765, sessions: 24, streak: 8, change: '+1', you: false },
    { rank: 2, name: 'Sarah', handle: '@sarahfocus', focusMinutes: 560, sessions: 18, streak: 5, change: 'same', you: false },
    { rank: 3, name: 'You', handle: '@you', focusMinutes: 440, sessions: 14, streak: 3, change: '+2', you: true },
    { rank: 4, name: 'Mike', handle: '@mikeflow', focusMinutes: 375, sessions: 11, streak: 2, change: '-1', you: false },
    { rank: 5, name: 'Emma', handle: '@emmadeep', focusMinutes: 340, sessions: 10, streak: 4, change: 'same', you: false },
    { rank: 6, name: 'Nadia', handle: '@nadiawrites', focusMinutes: 290, sessions: 9, streak: 2, change: '+3', you: false }
  ],
  month: [
    { rank: 1, name: 'Sarah', handle: '@sarahfocus', focusMinutes: 2380, sessions: 76, streak: 11, change: '+2', you: false },
    { rank: 2, name: 'Alex', handle: '@deepworkalex', focusMinutes: 2240, sessions: 70, streak: 8, change: '-1', you: false },
    { rank: 3, name: 'Emma', handle: '@emmadeep', focusMinutes: 1990, sessions: 61, streak: 7, change: '+1', you: false },
    { rank: 4, name: 'You', handle: '@you', focusMinutes: 1740, sessions: 54, streak: 3, change: 'same', you: true },
    { rank: 5, name: 'Nadia', handle: '@nadiawrites', focusMinutes: 1425, sessions: 43, streak: 2, change: '+1', you: false }
  ],
  all: [
    { rank: 1, name: 'Alex', handle: '@deepworkalex', focusMinutes: 18540, sessions: 620, streak: 8, change: 'same', you: false },
    { rank: 2, name: 'Sarah', handle: '@sarahfocus', focusMinutes: 17200, sessions: 588, streak: 11, change: '+1', you: false },
    { rank: 3, name: 'Emma', handle: '@emmadeep', focusMinutes: 15110, sessions: 502, streak: 7, change: '-1', you: false },
    { rank: 4, name: 'You', handle: '@you', focusMinutes: 13240, sessions: 430, streak: 3, change: '+2', you: true },
    { rank: 5, name: 'Mike', handle: '@mikeflow', focusMinutes: 11005, sessions: 360, streak: 2, change: 'same', you: false }
  ]
};

export function userSound(name: string): string {
  const map: Record<string, string> = {
    Alex: 'Brown Noise',
    Sarah: '432 Hz',
    You: 'Brown Noise',
    Mike: 'No Audio',
    Emma: 'Pink Noise',
    Nadia: '528 Hz'
  };
  return map[name] || 'Brown Noise';
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function getInitials(name: string): string {
  return name === 'You' ? 'Y' : name.slice(0, 1).toUpperCase();
}
