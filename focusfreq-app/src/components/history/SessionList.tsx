'use client';

import type { FocusSession } from '@/types';
import SessionItem from './SessionItem';

interface SessionListProps {
  sessions: FocusSession[];
  title?: string;
}

export default function SessionList({
  sessions,
  title = 'Recent Sessions',
}: SessionListProps) {
  if (sessions.length === 0) {
    let emptyMsg = "No sessions yet";
    if (title.toLowerCase().includes('completed')) {
      emptyMsg = "No completed sessions yet";
    } else if (title.toLowerCase().includes('abandoned')) {
      emptyMsg = "No abandoned sessions yet";
    }

    return (
      <div className="rounded-xl border border-dashed border-surface-300 py-10 text-center">
        <p className="text-sm text-text-muted">{emptyMsg}</p>
        <p className="mt-1 text-xs text-text-muted">
          {title.toLowerCase().includes('abandoned') 
            ? "Sessions you cancel early will appear here" 
            : "Complete a focus session to see it here"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
        {title}
      </h2>
      <div className="space-y-2">
        {sessions.map((session) => (
          <SessionItem key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
