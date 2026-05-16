'use client';

import React, { useState, useMemo } from 'react';
import styles from './leaderboard.module.css';
import { users, userSound, formatMinutes, getInitials, UserEntry } from './mockData';

export default function AppLeaderboardPage() {
  const [period, setPeriod] = useState<string>('week');
  const [query, setQuery] = useState<string>('');
  const [metric, setMetric] = useState<string>('focusMinutes');

  const filteredUsers = useMemo(() => {
    const list = users[period] || users.week;
    return list
      .filter((user) => `${user.name} ${user.handle}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        const valA = a[metric as keyof UserEntry] as number;
        const valB = b[metric as keyof UserEntry] as number;
        return valB - valA;
      });
  }, [period, query, metric]);

  const topUsers = useMemo(() => {
    const list = [...(users[period] || users.week)].sort((a, b) => a.rank - b.rank).slice(0, 3);
    return [list[1], list[0], list[2]].filter(Boolean);
  }, [period]);

  const renderShiftIcon = (change: string) => {
    if (!change || change === 'same') return null;
    if (change.startsWith('+')) {
      return (
        <span className={`${styles.shift} ${styles.shiftUp}`} title={`Rank up ${change}`}>
          ▲
        </span>
      );
    }
    return null;
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <div className={styles.eyebrow}>Weekly Focus Leaderboard</div>
          <h1>You’re #3 this week.</h1>
          <p>Complete <strong>80 more focus minutes</strong> to reach #2. Your private task names stay hidden — only completed focus totals are shown.</p>

          <div className={styles.pills}>
            <span className={styles.pill}>#3 current rank</span>
            <span className={`${styles.pill} ${styles.pillGold}`}>80m to #2</span>
            <span className={styles.pill}>+2 ranks today</span>
          </div>

          <div className={styles.privacy}>🔒 Privacy-safe: task names are never shown on the leaderboard.</div>
        </div>

        <div className={styles.heroActions}>
          <button className={styles.btn}>Privacy rules</button>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Start Focus</button>
        </div>
      </section>

      <section className={styles.summary}>
        <div className={`${styles.stat} ${styles.statFocus}`}>
          <strong>#3</strong>
          <span>Your current rank</span>
        </div>
        <div className={`${styles.stat} ${styles.statGold}`}>
          <strong>80m</strong>
          <span>To next rank</span>
        </div>
        <div className={styles.stat}>
          <strong>14</strong>
          <span>Your sessions</span>
        </div>
        <div className={`${styles.stat} ${styles.statAudio}`}>
          <strong>Top 15%</strong>
          <span>Weekly pace</span>
        </div>
        <div className={`${styles.stat} ${styles.statSound}`}>
          <strong>Brown Noise</strong>
          <span>Your best focus sound</span>
        </div>
      </section>

      <section className={styles.race}>
        <div>
          <div className={styles.eyebrow}>Your race</div>
          <h2>Sarah is 80 minutes ahead.</h2>
          <p>Finish about four more Pomodoros to move from #3 to #2 this week.</p>
        </div>

        <div className={styles.raceSteps}>
          <div className={styles.raceStep}>
            <span>Target user</span>
            <strong>Sarah · #2</strong>
          </div>
          <div className={styles.raceStep}>
            <span>Gap to close</span>
            <strong className={styles.hot}>80m</strong>
          </div>
          <div className={styles.raceStep}>
            <span>Suggested effort</span>
            <strong>4 Pomodoros</strong>
          </div>
        </div>
      </section>

      <section className={styles.layout}>
        <div className="main-col">
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div>
                <div className={styles.eyebrow}>Top Focusers</div>
                <h2>This week’s podium</h2>
              </div>
              <button className={styles.btn}>Share rank</button>
            </div>

            <div className={styles.podium}>
              {topUsers.map((user) => (
                <div
                  key={user.name}
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
                  <div className={styles.avatar}>{getInitials(user.name)}</div>
                  <h3>{user.name}</h3>
                  <p>{user.handle}</p>
                  <div className={styles.podiumScore}>
                    <span className={`${styles.podiumFocus} ${user.rank === 1 ? styles.podiumFirstFocus : ''}`}>
                      {formatMinutes(user.focusMinutes)}
                    </span>
                    <span className={`${styles.podiumMeta} ${user.rank === 1 ? styles.podiumFirstMeta : ''}`}>
                      {user.sessions} completed sessions
                    </span>
                    <span className={styles.soundPill} style={{ marginTop: '10px' }}>
                      {userSound(user.name)}
                    </span>
                  </div>
                  {user.you && <span className={styles.youTag}>You</span>}
                </div>
              ))}
            </div>
          </section>

          <section className={styles.card} style={{ marginTop: '18px' }}>
            <div className={styles.cardHead}>
              <div>
                <div className={styles.eyebrow}>Rankings</div>
                <h2>Leaderboard table</h2>
              </div>
            </div>

            <div className={styles.privacyStrip}>
              🔒 Ranked by completed focus minutes. Task titles stay private. Top Sound is aggregate usage only.
              Rank movement is shown beside each name.
            </div>

            <div className={styles.toolbar}>
              <div className={styles.filters}>
                <button
                  className={`${styles.filter} ${period === 'week' ? styles.filterActive : ''}`}
                  onClick={() => setPeriod('week')}
                >
                  Weekly
                </button>
                <button
                  className={`${styles.filter} ${period === 'month' ? styles.filterActive : ''}`}
                  onClick={() => setPeriod('month')}
                >
                  Monthly
                </button>
                <button
                  className={`${styles.filter} ${period === 'all' ? styles.filterActive : ''}`}
                  onClick={() => setPeriod('all')}
                >
                  All time
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
                  onChange={(e) => setMetric(e.target.value)}
                >
                  <option value="focusMinutes">Focus time</option>
                  <option value="sessions">Sessions</option>
                  <option value="streak">Streak</option>
                </select>
                <button
                  className={styles.btn}
                  onClick={() => {
                    setQuery('');
                    setMetric('focusMinutes');
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            {filteredUsers.length === 0 && (
              <div className={styles.empty} style={{ display: 'block' }}>
                <h3>No users found</h3>
                <p>Try another search or period.</p>
              </div>
            )}

            <div className={styles.leaderboard}>
              {filteredUsers.length > 0 && (
                <div className={`${styles.lbRow} ${styles.lbRowHeader}`}>
                  <div>Rank</div>
                  <div>Member</div>
                  <div>Focus</div>
                  <div>Top Sound</div>
                  <div>Sessions</div>
                  <div>Streak</div>
                </div>
              )}
              {filteredUsers.map((user, idx) => (
                <div key={user.name} className={`${styles.lbRow} ${user.you ? styles.lbRowYou : ''}`}>
                  <div className={styles.lbRank}>#{idx + 1}</div>

                  <div className={styles.lbMember}>
                    <div className={styles.miniAvatar}>{getInitials(user.name)}</div>
                    <div className={styles.memberMeta}>
                      <div className={styles.nameLine}>
                        <span className={`${styles.lbName} ${user.you ? styles.lbNameYou : ''}`}>{user.name}</span>
                        {renderShiftIcon(user.change)}
                      </div>
                      <span className={styles.handle}>
                        {user.handle}
                        {user.you ? ' · you' : ''}
                      </span>
                    </div>
                  </div>

                  <div className={styles.score}>{formatMinutes(user.focusMinutes)}</div>
                  <div>
                    <span className={styles.soundPill}>{userSound(user.name)}</span>
                  </div>
                  <div className={styles.muted}>{user.sessions}</div>
                  <div className={styles.muted}>{user.streak}d</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.side}>
          <section className={`${styles.card} ${styles.rankCard}`}>
            <div className={styles.eyebrow}>Next move</div>
            <h3>4 Pomodoros to #2</h3>
            <p>Sarah is 80 minutes ahead. Complete focused sessions today to close the gap.</p>

            <div className={styles.progressWrap}>
              <div className={styles.progressLabel}>
                <span>Progress to next rank</span>
                <strong>68%</strong>
              </div>
              <div className={styles.progressBar}>
                <span className={styles.progressFill}></span>
              </div>
            </div>
          </section>

          <section className={`${styles.card} ${styles.insight}`}>
            <div className={styles.eyebrow}>Frequency insight</div>
            <h3>Your best sound</h3>
            <p>
              <strong>Brown Noise</strong> appears in your longest completed sessions this week. Sound is shown as an
              aggregate pattern only, not as private task/session detail.
            </p>
            <button className={styles.btn} style={{ width: '100%', marginTop: '14px' }}>
              How scoring works
            </button>
          </section>

          <section className={`${styles.card} ${styles.popularCard}`}>
            <div className={styles.eyebrow}>Popular Sound</div>
            <h3>Top sounds this week</h3>

            <div className={styles.popularList}>
              <div className={styles.popularItem}>
                <div className={styles.popularIcon}>≈</div>
                <div>
                  <strong>Brown Noise</strong>
                  <span>Used in 42% of completed focus time</span>
                </div>
                <div className={styles.popularValue}>#1</div>
              </div>

              <div className={styles.popularItem}>
                <div className={styles.popularIcon}>∿</div>
                <div>
                  <strong>432 Hz</strong>
                  <span>Popular for long deep work sessions</span>
                </div>
                <div className={styles.popularValue}>#2</div>
              </div>

              <div className={styles.popularItem}>
                <div className={styles.popularIcon}>◐</div>
                <div>
                  <strong>Pink Noise</strong>
                  <span>Often used for writing and review</span>
                </div>
                <div className={styles.popularValue}>#3</div>
              </div>
            </div>

            <p className={styles.miniNote}>
              Sound rankings are aggregate patterns only. They do not affect leaderboard score.
            </p>
          </section>

          <section className={`${styles.card} ${styles.popularCard}`}>
            <div className={styles.eyebrow}>Popular Pomodoro</div>
            <h3>Most used focus lengths</h3>

            <div className={styles.popularList}>
              <div className={styles.popularItem}>
                <div className={`${styles.popularIcon} ${styles.popularIconFocus}`}>25</div>
                <div>
                  <strong>25 min Pomodoro</strong>
                  <span>Most completed session length</span>
                </div>
                <div className={`${styles.popularValue} ${styles.popularValueFocus}`}>58%</div>
              </div>

              <div className={styles.popularItem}>
                <div className={`${styles.popularIcon} ${styles.popularIconFocus}`}>50</div>
                <div>
                  <strong>50 min Deep Work</strong>
                  <span>Best for top 10% focusers</span>
                </div>
                <div className={`${styles.popularValue} ${styles.popularValueFocus}`}>27%</div>
              </div>

              <div className={styles.popularItem}>
                <div className={`${styles.popularIcon} ${styles.popularIconFocus}`}>90</div>
                <div>
                  <strong>90 min Long Flow</strong>
                  <span>Less common, highest average output</span>
                </div>
                <div className={`${styles.popularValue} ${styles.popularValueFocus}`}>9%</div>
              </div>
            </div>

            <p className={styles.miniNote}>
              This helps users discover which session lengths the community actually completes.
            </p>
          </section>
        </aside>
      </section>
    </div>
  );
}
