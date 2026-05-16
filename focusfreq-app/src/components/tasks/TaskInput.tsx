'use client';

import { useState } from 'react';
import type { CreateTaskInput } from '@/types';
import styles from './Tasks.module.css';

interface TaskInputProps {
  onCreateTask: (input: CreateTaskInput) => void;
}

export default function TaskInput({ onCreateTask }: TaskInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreateTask({ title: title.trim() });
    setTitle('');
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTitle('');
  };

  return (
    <div className={styles.addTaskArea}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className={styles.addSmall}
        >
          + Add new task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className={styles.addForm}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you working on?"
            className={styles.addInput}
            autoFocus
          />
          <div className={styles.addActions}>
            <button type="submit" className={styles.save}>
              Save
            </button>
            <button type="button" onClick={handleCancel} className={styles.cancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
