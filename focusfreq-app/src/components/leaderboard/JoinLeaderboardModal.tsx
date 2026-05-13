'use client';

import { useState } from 'react';

interface JoinLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (displayName: string) => Promise<{ error: string | null }>;
  currentName?: string | null;
}

export default function JoinLeaderboardModal({
  isOpen,
  onClose,
  onSubmit,
  currentName,
}: JoinLeaderboardModalProps) {
  const [name, setName] = useState(currentName || '');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = name.trim();
    if (trimmed.length < 3) {
      setError('Display name must be at least 3 characters');
      return;
    }
    if (trimmed.length > 24) {
      setError('Display name must be 24 characters or less');
      return;
    }
    // Basic character validation: letters, numbers, spaces, underscore, hyphen
    if (!/^[a-zA-Z0-9 _-]+$/.test(trimmed)) {
      setError('Only letters, numbers, spaces, underscores, and hyphens allowed');
      return;
    }

    setIsSubmitting(true);
    const result = await onSubmit(trimmed);
    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/20 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-[28px] border border-surface-200 bg-white p-6 shadow-card animate-fade-in">
        <h2 className="text-xl font-bold text-text-primary">
          Join the Leaderboard
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Choose a display name to appear on the public weekly leaderboard.
          Only your name, focus time, and session count will be visible.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="display-name" className="block text-sm font-medium text-text-secondary mb-1">
              Display Name
            </label>
            <input
              id="display-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. FocusMaster42"
              maxLength={24}
              className="w-full rounded-[14px] border border-surface-200 bg-white px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus/20 transition-colors"
              autoFocus
            />
            <p className="mt-1 text-xs text-text-muted">
              {name.trim().length}/24 characters · Letters, numbers, spaces, underscores, hyphens
            </p>
          </div>

          {error && (
            <p className="text-sm text-danger font-medium">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-[14px] border border-surface-200 bg-white px-4 py-3 text-sm font-medium text-text-secondary hover:bg-surface-50 transition-colors"
            >
              Not Now
            </button>
            <button
              type="submit"
              disabled={isSubmitting || name.trim().length < 3}
              className="flex-1 rounded-[14px] px-4 py-3 text-sm font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ background: 'linear-gradient(135deg, #F05A3C, #FF735C)' }}
            >
              {isSubmitting ? 'Joining...' : 'Join Leaderboard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
