'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './leaderboard.module.css';
import {
  fetchWeeklyLeaderboard,
  getCurrentUserId,
  fetchPopularSounds,
  fetchPopularPomodoros,
  LeaderboardEntry,
  PopularSoundEntry,
  PopularPomodoroEntry,
} from '@/services/supabaseSessionService';

/* ── helpers ────────────────────────────────────────────── */

function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)}m`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return m ? `${h}h ${m}m` : `${h}h`;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/* ── component ──────────────────────────────────────────── */

export default function AppLeaderboardPage() {
  const [query, setQuery] = useState('');
  const [metric, setMetric] = useState<'focus_minutes' | 'completed_sessions'>('focus_minutes');
  const [toastMessage, setToastMessage] = useState('');

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [popularSounds, setPopularSounds] = useState<PopularSoundEntry[]>([]);
  const [popularPomodoros, setPopularPomodoros] = useState<PopularPomodoroEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const router = useRouter();

  /* ── fetch data ─────────────────────────────────── */
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      setHasError(false);
      try {
        const [data, userId, sounds, pomodoros] = await Promise.all([
          fetchWeeklyLeaderboard(50),
          getCurrentUserId(),
          fetchPopularSounds(5),
          fetchPopularPomodoros(5),
        ]);
        if (!cancelled) {
          setLeaderboard(data);
          setCurrentUserId(userId);
          setPopularSounds(sounds);
          setPopularPomodoros(pomodoros);
        }
      } catch {
        if (!cancelled) setHasError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  /* ── derived state ──────────────────────────────── */
  const myEntry = useMemo(
    () => (currentUserId ? leaderboard.find((e) => e.user_id === currentUserId) : null),
    [leaderboard, currentUserId]
  );

  const userAbove = useMemo(() => {
    if (!myEntry || myEntry.rank <= 1) return null;
    return leaderboard.find((e) => e.rank === myEntry.rank - 1) ?? null;
  }, [leaderboard, myEntry]);

  const gapMinutes = useMemo(() => {
    if (!myEntry || !userAbove) return 0;
    return Math.max(0, Math.round(userAbove.focus_minutes - myEntry.focus_minutes));
  }, [myEntry, userAbove]);

  const percentile = useMemo(() => {
    if (!myEntry || leaderboard.length === 0) return null;
    return Math.round(((leaderboard.length - myEntry.rank + 1) / leaderboard.length) * 100);
  }, [myEntry, leaderboard]);

  const progressPercent = useMemo(() => {
    if (!myEntry || !userAbove) return 0;
    const total = myEntry.focus_minutes + gapMinutes;
    return total > 0 ? Math.round((myEntry.focus_minutes / total) * 100) : 0;
  }, [myEntry, userAbove, gapMinutes]);

  /* ── podium (top 3) ─────────────────────────────── */
  const topUsers = useMemo(() => {
    const sorted = [...leaderboard].sort((a, b) => a.rank - b.rank).slice(0, 3);
    // Podium order: #2 left, #1 center, #3 right
    return [sorted[1], sorted[0], sorted[2]].filter(Boolean);
  }, [leaderboard]);

  /* ── filtered table ─────────────────────────────── */
  const filteredUsers = useMemo(() => {
    return leaderboard
      .filter((u) => u.display_name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        const valA = a[metric];
        const valB = b[metric];
        return valB - valA;
      });
  }, [leaderboard, query, metric]);

  /* ── actions ────────────────────────────────────── */
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2000);
  };

  const copySummary = () => {
    const lines = ['FocusFreq weekly summary:'];
    if (myEntry) {
      lines.push(`Rank: #${myEntry.rank}`);
      lines.push(`Focus time: ${formatMinutes(myEntry.focus_minutes)}`);
      lines.push(`Sessions: ${myEntry.completed_sessions}`);
      if (gapMinutes > 0 && userAbove) {
        lines.push(`Gap to #${userAbove.rank}: ${gapMinutes}m`);
      }
    } else {
      lines.push('Not yet ranked');
    }
    const summary = lines.join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary).then(() => showToast('Summary copied')).catch(() => showToast('Failed to copy'));
    } else {
      showToast('Summary copied');
    }
  };

  /* ── loading state ──────────────────────────────── */
  if (isLoading) {
    return (
      <div className={styles.page}>
        <section className={styles.hero}>
          <div>
            <div className={styles.eyebrow}>Weekly Focus Leaderboard</div>
            <h1>Loading leaderboard…</h1>
            <p>Fetching this week&apos;s community rankings.</p>
          </div>
        </section>
      </div>
    );
  }

  /* ── error state ────────────────────────────────── */
  if (hasError) {
    return (
      <div className={styles.page}>
        <section className={styles.hero}>
          <div>
            <div className={styles.eyebrow}>Weekly Focus Leaderboard</div>
            <h1>Something went wrong.</h1>
            <p>We couldn&apos;t load the leaderboard. Please try again later.</p>
          </div>
          <div className={styles.heroActions}>
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </section>
      </div>
    );
  }

  /* ── hero text ──────────────────────────────────── */
  const isRanked = !!myEntry;
  const isFirst = isRanked && myEntry!.rank === 1;
  const isEmptyCommunity = leaderboard.length === 0;

  let heroTitle: string;
  let heroDesc: string;

  if (isEmptyCommunity) {
    heroTitle = 'Be the first to focus.';
    heroDesc = 'No one has completed enough focus sessions this week yet. Start a session to claim #1!';
  } else if (!currentUserId) {
    heroTitle = 'Community leaderboard';
    heroDesc = 'Sign in to see your rank and compete with the community.';
  } else if (!isRanked) {
    heroTitle = 'Join the leaderboard.';
    heroDesc = 'Complete focus sessions (≥5 min) to appear on the weekly rankings. Your task names stay private.';
  } else if (isFirst) {
    heroTitle = "You're leading this week! 🏆";
    heroDesc = `You've focused for ${formatMinutes(myEntry!.focus_minutes)} with ${myEntry!.completed_sessions} completed sessions. Keep going!`;
  } else {
    heroTitle = `You're #${myEntry!.rank} this week.`;
    heroDesc = gapMinutes > 0 && userAbove
      ? `Complete ${gapMinutes} more focus minutes to reach #${userAbove.rank}. Your private task names stay hidden — only completed focus totals are shown.`
      : 'Your private task names stay hidden — only completed focus totals are shown.';
  }

  return (
    <div className={styles.page}>
      {/* ── Hero ───────────────────────────────── */}
      <section className={styles.hero}>
        <div>
          <div className={styles.eyebrow}>Weekly Focus Leaderboard</div>
          <h1>{heroTitle}</h1>
          {(() => {
            const gapMatch = heroDesc.match(/(\d+ more focus minutes)/);
            if (!gapMatch) return <p>{heroDesc}</p>;
            const [before, after] = heroDesc.split(gapMatch[1]);
            return <p>{before}<strong>{gapMatch[1]}</strong>{after}</p>;
          })()}

          {isRanked && (
            <div className={styles.pills}>
              <span className={styles.pill}>#{myEntry!.rank} current rank</span>
              {gapMinutes > 0 && (
                <span className={`${styles.pill} ${styles.pillGold}`}>{gapMinutes}m to #{myEntry!.rank - 1}</span>
              )}
              {isFirst && (
                <span className={`${styles.pill} ${styles.pillGold}`}>👑 Leading</span>
              )}
            </div>
          )}

          <div className={styles.privacy}>🔒 Privacy-safe: task names are never shown on the leaderboard.</div>
        </div>

        <div className={styles.heroActions}>
          <button className={styles.btn} onClick={copySummary}>Copy Summary</button>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => router.push('/app')}>Start Focus</button>
        </div>
      </section>

      {/* ── Summary cards ──────────────────────── */}
      <section className={styles.summary}>
        <div className={`${styles.stat} ${styles.statFocus}`}>
          <strong>{isRanked ? `#${myEntry!.rank}` : '—'}</strong>
          <span>Your current rank</span>
        </div>
        <div className={`${styles.stat} ${styles.statGold}`}>
          <strong>{isRanked && gapMinutes > 0 ? `${gapMinutes}m` : isFirst ? '👑' : '—'}</strong>
          <span>{isFirst ? 'You\'re leading' : 'To next rank'}</span>
        </div>
        <div className={styles.stat}>
          <strong>{isRanked ? myEntry!.completed_sessions : 0}</strong>
          <span>Your sessions</span>
        </div>
        <div className={`${styles.stat} ${styles.statAudio}`}>
          <strong>{percentile !== null ? `Top ${100 - percentile + 1}%` : '—'}</strong>
          <span>Weekly pace</span>
        </div>
      </section>

      {/* ── Race card ──────────────────────────── */}
      {isRanked && !isFirst && userAbove && gapMinutes > 0 && (
        <section className={styles.race}>
          <div>
            <div className={styles.eyebrow}>Your race</div>
            <h2>{userAbove.display_name} is {gapMinutes} minutes ahead.</h2>
            <p>Finish about {Math.ceil(gapMinutes / 25)} more Pomodoros to move from #{myEntry!.rank} to #{userAbove.rank} this week.</p>
          </div>

          <div className={styles.raceSteps}>
            <div className={styles.raceStep}>
              <span>Target user</span>
              <strong>{userAbove.display_name} · #{userAbove.rank}</strong>
            </div>
            <div className={styles.raceStep}>
              <span>Gap to close</span>
              <strong className={styles.hot}>{gapMinutes}m</strong>
            </div>
            <div className={styles.raceStep}>
              <span>Suggested effort</span>
              <strong>{Math.ceil(gapMinutes / 25)} Pomodoros</strong>
            </div>
          </div>
        </section>
      )}

      {isFirst && (
        <section className={styles.race}>
          <div>
            <div className={styles.eyebrow}>Your race</div>
            <h2>You&apos;re #1 this week! 🏆</h2>
            <p>You&apos;re leading the community with {formatMinutes(myEntry!.focus_minutes)} of focused time. Keep the momentum!</p>
          </div>
          <div className={styles.raceSteps}>
            <div className={styles.raceStep}>
              <span>Your position</span>
              <strong>#1 Leader</strong>
            </div>
            <div className={styles.raceStep}>
              <span>Focus time</span>
              <strong className={styles.hot}>{formatMinutes(myEntry!.focus_minutes)}</strong>
            </div>
            <div className={styles.raceStep}>
              <span>Sessions</span>
              <strong>{myEntry!.completed_sessions} completed</strong>
            </div>
          </div>
        </section>
      )}

      {/* ── Main layout ────────────────────────── */}
      <section className={styles.layout}>
        <div className="main-col">
          {/* Podium */}
          {topUsers.length > 0 && (
            <section className={styles.card}>
              <div className={styles.cardHead}>
                <div>
                  <div className={styles.eyebrow}>Top Focusers</div>
                  <h2>This week&apos;s podium</h2>
                </div>
                <button className={styles.btn} onClick={copySummary}>Share rank</button>
              </div>

              <div className={styles.podium}>
                {topUsers.map((user) => {
                  const isYou = currentUserId === user.user_id;
                  return (
                    <div
                      key={user.user_id}
                      className={`${styles.podiumCard} ${
                        user.rank === 1 ? styles.podiumFirst : user.rank === 2 ? styles.podiumSecond : styles.podiumThird
                      }`}
                    >
                      <div
                        className={`${styles.medal} ${
                          user.rank === 1 ? styles.medalFirst : user.rank === 2 ? styles.medalSecond : styles.medalThird
                        }`}
                      >
                        {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                      </div>
                      <div className={styles.avatar}>{getInitials(user.display_name)}</div>
                      <h3>{user.display_name}</h3>
                      <div className={styles.podiumScore}>
                        <span className={`${styles.podiumFocus} ${user.rank === 1 ? styles.podiumFirstFocus : ''}`}>
                          {formatMinutes(user.focus_minutes)}
                        </span>
                        <span className={`${styles.podiumMeta} ${user.rank === 1 ? styles.podiumFirstMeta : ''}`}>
                          {user.completed_sessions} completed sessions
                        </span>
                      </div>
                      {isYou && <span className={styles.youTag}>You</span>}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Table */}
          <section className={styles.card} style={{ marginTop: '18px' }}>
            <div className={styles.cardHead}>
              <div>
                <div className={styles.eyebrow}>Rankings</div>
                <h2>Leaderboard table</h2>
              </div>
            </div>

            <div className={styles.privacyStrip}>
              🔒 Ranked by completed focus minutes. Task titles stay private.
            </div>

            <div className={styles.toolbar}>
              <div className={styles.filters}>
                <button className={`${styles.filter} ${styles.filterActive}`}>
                  Weekly
                </button>
              </div>

              <div className={styles.tools}>
                <input
                  className={styles.search}
                  placeholder="Search names..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <select
                  className={styles.select}
                  value={metric}
                  onChange={(e) => setMetric(e.target.value as typeof metric)}
                >
                  <option value="focus_minutes">Focus time</option>
                  <option value="completed_sessions">Sessions</option>
                </select>
                <button
                  className={styles.btn}
                  onClick={() => {
                    setQuery('');
                    setMetric('focus_minutes');
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            {isEmptyCommunity && (
              <div className={styles.empty}>
                <h3>No community data yet</h3>
                <p>Be the first to focus! Complete a session (≥5 min) to claim #1.</p>
              </div>
            )}

            {!isEmptyCommunity && filteredUsers.length === 0 && (
              <div className={styles.empty}>
                <h3>No users found</h3>
                <p>Try another search query.</p>
              </div>
            )}

            <div className={styles.leaderboard}>
              {filteredUsers.length > 0 && (
                <div className={`${styles.lbRow} ${styles.lbRowHeader}`}>
                  <div>Rank</div>
                  <div>Member</div>
                  <div>Focus</div>
                  <div>Sessions</div>
                </div>
              )}
              {filteredUsers.map((user, idx) => {
                const isYou = currentUserId === user.user_id;
                return (
                  <div key={user.user_id} className={`${styles.lbRow} ${isYou ? styles.lbRowYou : ''}`}>
                    <div className={styles.lbRank}>#{idx + 1}</div>
                    <div className={styles.lbMember}>
                      <div className={styles.miniAvatar}>{getInitials(user.display_name)}</div>
                      <div className={styles.memberMeta}>
                        <div className={styles.nameLine}>
                          <span className={`${styles.lbName} ${isYou ? styles.lbNameYou : ''}`}>{user.display_name}</span>
                        </div>
                        {isYou && <span className={styles.handle}>you</span>}
                      </div>
                    </div>
                    <div className={styles.score}>{formatMinutes(user.focus_minutes)}</div>
                    <div className={styles.muted}>{user.completed_sessions}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ── Sidebar ──────────────────────────── */}
        <aside className={styles.side}>
          {/* Next move card */}
          <section className={`${styles.card} ${styles.rankCard}`}>
            <div className={styles.eyebrow}>Next move</div>
            {isRanked && !isFirst && userAbove ? (
              <>
                <h3>{Math.ceil(gapMinutes / 25)} Pomodoros to #{userAbove.rank}</h3>
                <p>{userAbove.display_name} is {gapMinutes} minutes ahead. Complete focused sessions today to close the gap.</p>
                <div className={styles.progressWrap}>
                  <div className={styles.progressLabel}>
                    <span>Progress to next rank</span>
                    <strong>{progressPercent}%</strong>
                  </div>
                  <div className={styles.progressBar}>
                    <span
                      className={styles.progressFill}
                      style={{ '--progress': `${progressPercent}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              </>
            ) : isFirst ? (
              <>
                <h3>You&apos;re #1! 🏆</h3>
                <p>You&apos;re at the top of the leaderboard this week. Keep focusing to maintain your lead!</p>
              </>
            ) : (
              <>
                <h3>Start focusing</h3>
                <p>Complete focus sessions (≥5 min) to appear on the weekly leaderboard.</p>
              </>
            )}
          </section>

          {/* Popular Sound */}
          <section className={`${styles.card} ${styles.popularCard}`}>
            <div className={styles.eyebrow}>Popular Sound</div>
            <h3>Top sounds this week</h3>

            {popularSounds.length === 0 ? (
              <div className={styles.empty} style={{ marginTop: '14px' }}>
                <p>Not enough community data yet.</p>
              </div>
            ) : (
              <div className={styles.aggregateList}>
                {(() => {
                  const maxCount = popularSounds[0]?.sessions_count ?? 1;
                  return popularSounds.map((s) => (
                    <div key={s.sound_label} className={styles.aggregateItem}>
                      <div className={styles.aggregateHeader}>
                        <span className={styles.aggregateLabel}>
                          {s.sound_label.charAt(0).toUpperCase() + s.sound_label.slice(1).replace(/_/g, ' ')}
                        </span>
                        <span className={styles.aggregateCount}>{s.sessions_count} sessions</span>
                      </div>
                      <div className={styles.aggregateBar}>
                        <div
                          className={styles.aggregateBarFill}
                          style={{ width: `${Math.round((s.sessions_count / maxCount) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}

            <p className={styles.miniNote}>
              Sound rankings are aggregate patterns only. They do not affect leaderboard score.
            </p>
          </section>

          {/* Popular Pomodoro */}
          <section className={`${styles.card} ${styles.popularCard}`}>
            <div className={styles.eyebrow}>Popular Pomodoro</div>
            <h3>Most used focus lengths</h3>

            {popularPomodoros.length === 0 ? (
              <div className={styles.empty} style={{ marginTop: '14px' }}>
                <p>Not enough community data yet.</p>
              </div>
            ) : (
              <div className={styles.aggregateList}>
                {(() => {
                  const maxCount = popularPomodoros[0]?.sessions_count ?? 1;
                  return popularPomodoros.map((p) => (
                    <div key={p.duration_minutes} className={styles.aggregateItem}>
                      <div className={styles.aggregateHeader}>
                        <span className={styles.aggregateLabel}>{p.duration_minutes} min</span>
                        <span className={styles.aggregateCount}>{p.sessions_count} sessions</span>
                      </div>
                      <div className={styles.aggregateBar}>
                        <div
                          className={styles.aggregateBarFill}
                          style={{ width: `${Math.round((p.sessions_count / maxCount) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}

            <p className={styles.miniNote}>
              This helps users discover which session lengths the community actually completes.
            </p>
          </section>
        </aside>
      </section>

      {/* ── Toast ──────────────────────────────── */}
      <div className={`${styles.toast} ${toastMessage ? styles.toastShow : ''}`}>
        {toastMessage}
      </div>
    </div>
  );
}
