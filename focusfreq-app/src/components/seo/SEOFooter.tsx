import React from 'react';
import Link from 'next/link';

export default function SEOFooter() {
  return (
    <section className="border-t border-surface-200 bg-surface-50 py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase mb-4">Focus Timers</h3>
            <ul className="space-y-3">
              <li><Link href="/pomodoro-timer" className="text-sm text-text-muted hover:text-focus">Pomodoro Timer</Link></li>
              <li><Link href="/study-timer" className="text-sm text-text-muted hover:text-focus">Study Timer</Link></li>
              <li><Link href="/focus-timer" className="text-sm text-text-muted hover:text-focus">Focus Timer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase mb-4">Audio Tools</h3>
            <ul className="space-y-3">
              <li><Link href="/frequency-generator" className="text-sm text-text-muted hover:text-focus">Frequency Generator</Link></li>
              <li><Link href="/tone-generator" className="text-sm text-text-muted hover:text-focus">Tone Generator</Link></li>
              <li><Link href="/binaural-beat-generator" className="text-sm text-text-muted hover:text-focus">Binaural Beat Generator</Link></li>
              <li><Link href="/noise-generator" className="text-sm text-text-muted hover:text-focus">Noise Generator</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase mb-4">Popular Frequencies</h3>
            <ul className="space-y-3">
              <li><Link href="/frequency/432" className="text-sm text-text-muted hover:text-focus">432 Hz Tone</Link></li>
              <li><Link href="/frequency/528" className="text-sm text-text-muted hover:text-focus">528 Hz Tone</Link></li>
              <li><Link href="/frequency/40" className="text-sm text-text-muted hover:text-focus">40 Hz Tone</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase mb-4">Focus Noise</h3>
            <ul className="space-y-3">
              <li><Link href="/noise/brown" className="text-sm text-text-muted hover:text-focus">Brown Noise</Link></li>
              <li><Link href="/noise/white" className="text-sm text-text-muted hover:text-focus">White Noise</Link></li>
              <li><Link href="/noise/pink" className="text-sm text-text-muted hover:text-focus">Pink Noise</Link></li>
            </ul>
          </div>
        </div>

        {/* Community row */}
        <div className="mt-8 flex flex-wrap gap-6 border-t border-surface-200 pt-6">
          <Link href="/leaderboard" className="text-sm text-text-muted hover:text-focus">
            🏆 Weekly Leaderboard
          </Link>
          <Link href="/app" className="text-sm text-text-muted hover:text-focus">
            Launch Workspace
          </Link>
        </div>
      </div>
    </section>
  );
}
