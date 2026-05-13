'use client';

import { useState } from 'react';
import type { CreateTaskInput } from '@/types';

interface TaskInputProps {
  onCreateTask: (input: CreateTaskInput) => void;
}

export default function TaskInput({ onCreateTask }: TaskInputProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onCreateTask({ title: trimmed });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What will you focus on?"
        className="flex-1 rounded-[14px] border border-surface-200 bg-white px-4 py-3 text-base text-text-primary placeholder-text-muted outline-none transition-all focus:border-focus focus:ring-2 focus:ring-focus/15"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="rounded-[14px] px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ background: 'linear-gradient(135deg, #F05A3C, #FF735C)' }}
      >
        Add
      </button>
    </form>
  );
}
