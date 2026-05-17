'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessions } from '@/hooks/useSessions';
import { taskService } from '@/services/taskService';
import { AudioMode, SessionStatus, type FocusSession } from '@/types';
import styles from './history.module.css';

function fm(minutes: number) {
  if (minutes < 60) return `${Math.round(minutes)}m`;
  const h = Math.floor(minutes / 60);
  const r = Math.round(minutes % 60);
  return r ? `${h}h ${r}m` : `${h}h`;
}

function getAudioLabel(s: FocusSession): string {
  if (!s.audioMode || s.audioMode === AudioMode.NONE) return 'No Audio';
  if (s.audioMode === AudioMode.NOISE) return `${(s.noiseType || 'white').charAt(0).toUpperCase() + (s.noiseType || 'white').slice(1)} Noise`;
  if (s.audioMode === AudioMode.TONE) return `${s.frequencyHz} Hz`;
  if (s.audioMode === AudioMode.BINAURAL) return `${s.binauralLeftHz}/${s.binauralRightHz} Hz Binaural`;
  return 'Audio';
}

function getSessionType(s: FocusSession): 'focus' | 'break' | 'abandoned' {
  if (s.status === SessionStatus.ABANDONED) return 'abandoned';
  if (s.isBreak || s.sessionType === 'short_break' || s.sessionType === 'long_break') return 'break';
  return 'focus';
}

function getDateLabel(isoString: string): string {
  const d = new Date(isoString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sessionDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.floor((today.getTime() - sessionDay.getTime()) / 86400000);
  const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (diff === 0) return `Today · ${dateStr}`;
  if (diff === 1) return `Yesterday · ${dateStr}`;
  return dateStr;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDuration(minutes: number): string {
  const m = Math.floor(minutes);
  const s = Math.round((minutes - m) * 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

interface ChartBucket { day: string; focus: number; break: number; abandoned: number; }

function deriveChartData(sessions: FocusSession[], range: 'week' | 'month' | 'all'): ChartBucket[] {
  const now = new Date();
  if (range === 'week') {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const buckets: ChartBucket[] = days.map(d => ({ day: d, focus: 0, break: 0, abandoned: 0 }));
    const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - now.getDay() + 1); startOfWeek.setHours(0,0,0,0);
    sessions.forEach(s => {
      const d = new Date(s.endedAt || s.startedAt);
      if (d >= startOfWeek) {
        const idx = (d.getDay() + 6) % 7;
        const t = getSessionType(s);
        buckets[idx][t] += s.actualDurationMinutes;
      }
    });
    return buckets;
  }
  if (range === 'month') {
    const buckets: ChartBucket[] = [0,1,2,3].map(i => ({ day: `W${i+1}`, focus: 0, break: 0, abandoned: 0 }));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    sessions.forEach(s => {
      const d = new Date(s.endedAt || s.startedAt);
      if (d >= startOfMonth) {
        const week = Math.min(3, Math.floor((d.getDate() - 1) / 7));
        buckets[week][getSessionType(s)] += s.actualDurationMinutes;
      }
    });
    return buckets;
  }
  // all time — group by month
  const monthMap: Record<string, ChartBucket> = {};
  sessions.forEach(s => {
    const d = new Date(s.endedAt || s.startedAt);
    const key = d.toLocaleDateString('en-US', { month: 'short' });
    if (!monthMap[key]) monthMap[key] = { day: key, focus: 0, break: 0, abandoned: 0 };
    monthMap[key][getSessionType(s)] += s.actualDurationMinutes;
  });
  return Object.values(monthMap).slice(-6);
}

interface DisplaySession { id: string; task: string; type: 'focus' | 'break' | 'abandoned'; sound: string; time: string; duration: string; status: string; date: string; raw: FocusSession; }

function toDisplaySession(s: FocusSession): DisplaySession {
  const t = getSessionType(s);
  const taskObj = s.taskId ? taskService.getTask(s.taskId) : null;
  const taskName = taskObj?.title || (t === 'break' ? (s.sessionType === 'long_break' ? 'Long Break' : 'Break') : 'Free Focus');
  return {
    id: s.id, task: taskName, type: t, sound: getAudioLabel(s),
    time: formatTime(s.startedAt), duration: formatDuration(s.actualDurationMinutes),
    status: t === 'focus' ? 'Completed' : t === 'break' ? 'Break' : 'Abandoned',
    date: getDateLabel(s.endedAt || s.startedAt), raw: s,
  };
}

type FilterType = 'all' | 'focus' | 'break' | 'abandoned';
type RangeType = 'week' | 'month' | 'all';
type SortType = 'newest' | 'oldest' | 'longest';

export default function HistoryClient() {
  const { historyStats, recentSessions, completedSessions, isLoading } = useSessions();
  
  // State
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [chartRange, setChartRange] = useState<RangeType>('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortType>('newest');
  
  const [collapsedDays, setCollapsedDays] = useState<Record<string, boolean>>({});
  const [selectedSession, setSelectedSession] = useState<DisplaySession | null>(null);
  
  const [toastMessage, setToastMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        moreBtnRef.current &&
        !moreBtnRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 1400);
  };
  
  // Handlers
  const toggleDayCollapse = (date: string) => {
    setCollapsedDays(prev => ({ ...prev, [date]: !prev[date] }));
  };

  const clearFilters = () => {
    setActiveFilter('all');
    setSearchTerm('');
    setSortOption('newest');
    setChartRange('week');
    setCollapsedDays({});
    setIsMenuOpen(false);
  };

  // Computed stats for sidebar
  const focusSessions = useMemo(() => recentSessions.filter(s => getSessionType(s) === 'focus' && s.status === SessionStatus.COMPLETED), [recentSessions]);
  const completedTaskIds = useMemo(() => {
    const allTasks = taskService.getAllTasks();
    return allTasks.filter(t => t.status === 'completed');
  }, [recentSessions]);

  const bestFocusWindow = useMemo(() => {
    if (focusSessions.length === 0) return null;
    const hourBuckets: Record<number, number> = {};
    focusSessions.forEach(s => { const h = new Date(s.startedAt).getHours(); hourBuckets[h] = (hourBuckets[h] || 0) + s.actualDurationMinutes; });
    const bestHour = Object.entries(hourBuckets).sort(([,a], [,b]) => b - a)[0];
    if (!bestHour) return null;
    const h = parseInt(bestHour[0]);
    const fmt = (hr: number) => { const ampm = hr >= 12 ? 'PM' : 'AM'; return `${hr % 12 || 12} ${ampm}`; };
    return `${fmt(h)} – ${fmt(h + 2)}`;
  }, [focusSessions]);

  const avgSession = useMemo(() => focusSessions.length > 0 ? Math.round(focusSessions.reduce((s, x) => s + x.actualDurationMinutes, 0) / focusSessions.length) : 0, [focusSessions]);
  const longestSession = useMemo(() => focusSessions.length > 0 ? Math.round(Math.max(...focusSessions.map(s => s.actualDurationMinutes))) : 0, [focusSessions]);
  const completionRate = useMemo(() => {
    if (recentSessions.length === 0) return 0;
    const focus = recentSessions.filter(s => !s.isBreak && s.sessionType === 'focus');
    if (focus.length === 0) return 0;
    return Math.round((focus.filter(s => s.status === SessionStatus.COMPLETED).length / focus.length) * 100);
  }, [recentSessions]);

  const topTasks = useMemo(() => {
    const map: Record<string, { title: string; minutes: number }> = {};
    focusSessions.forEach(s => {
      if (!s.taskId) return;
      const task = taskService.getTask(s.taskId);
      if (!task) return;
      if (!map[s.taskId]) map[s.taskId] = { title: task.title, minutes: 0 };
      map[s.taskId].minutes += s.actualDurationMinutes;
    });
    return Object.values(map).sort((a, b) => b.minutes - a.minutes).slice(0, 3);
  }, [focusSessions]);

  const copySummary = () => {
    const summary = [
      "FocusFreq history summary:",
      `This week: ${fm(historyStats.weeklyFocusMinutes)} focused`,
      `Sessions: ${historyStats.weeklyCompletedSessions}`,
      `Completed tasks: ${completedTaskIds.length}`,
      `Current streak: ${historyStats.currentStreak} days`,
      bestFocusWindow ? `Best focus window: ${bestFocusWindow}` : null,
      historyStats.mostUsedAudio ? `Best sound: ${historyStats.mostUsedAudio}` : null
    ].filter(Boolean).join("\n");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary).then(() => showToast("Summary copied")).catch(() => showToast("Summary copied"));
    } else { showToast("Summary copied"); }
  };

  const exportCSV = () => {
    const header = "date,type,task,duration_min,sound,status\n";
    const rows = recentSessions.map(s => {
      const ds = toDisplaySession(s);
      const dateStr = new Date(s.startedAt).toISOString().split('T')[0];
      return `${dateStr},${ds.type},${ds.task.replace(/,/g, ' ')},${Math.round(s.actualDurationMinutes)},${ds.sound.replace(/,/g, ' ')},${ds.status}`;
    }).join('\n');
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "focusfreq-history.csv";
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    setIsMenuOpen(false);
  };

  const downloadReport = () => {
    const report = [
      "FocusFreq History Report", "",
      `Focus time this week: ${fm(historyStats.weeklyFocusMinutes)}`,
      `Sessions: ${historyStats.weeklyCompletedSessions}`,
      `Completed tasks: ${completedTaskIds.length}`,
      `Current streak: ${historyStats.currentStreak} days`,
      bestFocusWindow ? `Best focus window: ${bestFocusWindow}` : 'Best focus window: Not enough data',
      `Most used sound: ${historyStats.mostUsedAudio || 'N/A'}`,
      `Average session: ${avgSession}m`,
      `Longest session: ${longestSession}m`,
      `Completion rate: ${completionRate}%`
    ].join("\n");
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "focusfreq-history-report.txt";
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    setIsMenuOpen(false);
  };

  // Derived Data — from real sessions
  const chartData = useMemo(() => deriveChartData(recentSessions, chartRange), [recentSessions, chartRange]);

  const getChartVal = (x: ChartBucket) => {
    if (activeFilter === 'break') return x.break;
    if (activeFilter === 'abandoned') return x.abandoned;
    if (activeFilter === 'focus') return x.focus;
    return x.focus + x.break + x.abandoned;
  };
  
  const getChartType = (x: ChartBucket) => {
    if (activeFilter === 'break') return 'break';
    if (activeFilter === 'abandoned') return 'abandoned';
    if (activeFilter === 'focus') return 'focus';
    return x.abandoned > x.focus ? 'abandoned' : x.break > x.focus ? 'break' : 'focus';
  };

  const maxChartVal = Math.max(...chartData.map(getChartVal), 1);

  const filteredSessions = useMemo(() => {
    const displayList = recentSessions.map(toDisplaySession);
    let list = displayList.filter(s => {
      const okType = activeFilter === 'all' || s.type === activeFilter;
      const okSearch = !searchTerm || `${s.task} ${s.sound} ${s.status} ${s.type}`.toLowerCase().includes(searchTerm.toLowerCase());
      return okType && okSearch;
    });
    list = list.sort((a, b) => {
      if (sortOption === 'oldest') return new Date(a.raw.startedAt).getTime() - new Date(b.raw.startedAt).getTime();
      if (sortOption === 'longest') return b.raw.actualDurationMinutes - a.raw.actualDurationMinutes;
      return new Date(b.raw.startedAt).getTime() - new Date(a.raw.startedAt).getTime();
    });
    return list;
  }, [recentSessions, activeFilter, searchTerm, sortOption]);

  const groupedSessions = useMemo(() => {
    const groups: Record<string, DisplaySession[]> = {};
    filteredSessions.forEach(s => {
      if (!groups[s.date]) groups[s.date] = [];
      groups[s.date].push(s);
    });
    return groups;
  }, [filteredSessions]);

  const chartCaption = {
    all: 'Showing all session minutes',
    focus: 'Showing focus minutes only',
    break: 'Showing break minutes only',
    abandoned: 'Showing abandoned session minutes'
  }[activeFilter];

  if (isLoading) {
    return <div className="p-8 text-center"><p className="text-text-muted">Loading history...</p></div>;
  }

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div>
          <div className={styles.eyebrow}>Session History</div>
          <h1>Your focus record, made easy to understand.</h1>
          <p>See what you completed, how long you focused, which tasks took your time, and where your momentum is building.</p>
        </div>
        <div className={styles.heroActions}>
          <button className={styles.btn} onClick={copySummary}>Copy Summary</button>
          <button className={`${styles.btn} ${styles.primary}`} onClick={() => router.push('/app')}>Start Focus</button>
          <div className={styles.moreWrap}>
            <button 
              ref={moreBtnRef}
              className={`${styles.btn} ${styles.btnIcon}`}
              aria-label="More actions"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              •••
            </button>
            <div ref={menuRef} className={`${styles.moreMenu} ${isMenuOpen ? styles.open : ''}`}>
              <button className={styles.menuItem} onClick={exportCSV}>Export history CSV</button>
              <button className={styles.menuItem} onClick={downloadReport}>Download report</button>
              <button className={styles.menuItem} onClick={clearFilters}>Clear filters</button>
              <button className={styles.menuItem} onClick={() => {
                setIsMenuOpen(false);
                showToast("Privacy rules: Your history data is private to you.");
              }}>View data privacy</button>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Grid */}
      <section className={styles.summaryGrid}>
        <div className={`${styles.statCard} ${styles.focus}`}>
          <strong>{fm(historyStats.weeklyFocusMinutes)}</strong>
          <span>Focus time this week</span>
        </div>
        <div className={styles.statCard}>
          <strong>{historyStats.weeklyCompletedSessions}</strong>
          <span>Focus sessions</span>
        </div>
        <div className={`${styles.statCard} ${styles.break}`}>
          <strong>{completedTaskIds.length}</strong>
          <span>Tasks completed</span>
        </div>
        <div className={`${styles.statCard} ${styles.audio}`}>
          <strong>{historyStats.currentStreak} days</strong>
          <span>Current streak 🔥</span>
        </div>
      </section>

      {/* Layout */}
      <section className={styles.layout}>
        <div className={styles.mainCol}>
          
          {/* Weekly Overview */}
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div>
                <div className={styles.eyebrow}>Weekly overview</div>
                <h2>Focus minutes by day</h2>
              </div>
            </div>
            
            <div className={styles.chartFilterRow}>
              <select 
                className={styles.select} 
                value={chartRange} 
                onChange={(e) => setChartRange(e.target.value as RangeType)}
              >
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="all">All time</option>
              </select>
              <div className={styles.filters}>
                {(['all', 'focus', 'break', 'abandoned'] as FilterType[]).map(f => (
                  <button 
                    key={f}
                    className={`${styles.filter} ${activeFilter === f ? styles.active : ''}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <p className={styles.chartCaption}>{chartCaption}</p>
            
            {recentSessions.length === 0 ? (
               <div className={`${styles.empty} ${styles.show}`} style={{ width: '100%' }}>
                 <h3>No chart data yet</h3>
                 <p>Complete your first focus session to see your weekly overview.</p>
               </div>
            ) : (
              <>
                <div className={styles.chart}>
                  {chartData.map((x, i) => {
                    const v = getChartVal(x);
                    const h = Math.max(18, Math.round((v / maxChartVal) * 100));
                    const typ = getChartType(x);
                    const cls = typ === 'break' ? styles.break : typ === 'abandoned' ? styles.abandoned : '';
                    return (
                      <div 
                        key={i} 
                        className={`${styles.bar} ${cls}`} 
                        style={{ height: `${h}%` }}
                        title={`${x.day} \u00b7 ${fm(v)}`}
                      >
                        <span>{fm(v)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.xlabels} style={{ gridTemplateColumns: `repeat(${chartData.length}, 1fr)` }}>
                  {chartData.map((x, i) => (
                    <span key={i}>{x.day}</span>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* Recent Sessions */}
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div>
                <div className={styles.eyebrow}>Recent sessions</div>
                <h2>What you worked on</h2>
              </div>
              <div className={styles.sessionTools}>
                <input 
                  className={styles.search} 
                  placeholder="Search tasks or sounds..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                  className={styles.sort}
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortType)}
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="longest">Longest first</option>
                </select>
                <button className={styles.btn} onClick={clearFilters}>Clear filters</button>
              </div>
            </div>

            {filteredSessions.length === 0 && (
              <div className={`${styles.empty} ${styles.show}`}>
                <h3>{recentSessions.length === 0 ? 'No focus sessions yet' : 'No sessions found'}</h3>
                <p>{recentSessions.length === 0 ? 'Start your first focus session to build your history.' : 'Try adjusting your search or filter settings.'}</p>
              </div>
            )}

            <div className={styles.sessionList}>
              {Object.entries(groupedSessions).map(([date, sessions]) => {
                const isCollapsed = collapsedDays[date];
                return (
                  <div key={date} className={`${styles.dayGroup} ${isCollapsed ? styles.collapsed : ''}`}>
                    <div className={styles.dayHead}>
                      <button className={styles.dayToggle} onClick={() => toggleDayCollapse(date)}>
                        {date}
                      </button>
                      <span className={styles.dayTotal}>{sessions.length} session{sessions.length > 1 ? 's' : ''}</span>
                    </div>
                    {sessions.map(s => (
                      <div key={s.id} className={styles.session} onClick={() => setSelectedSession(s)}>
                        <div className={`${styles.sessionIcon} ${styles[s.type]}`}>
                          {s.type === 'focus' ? '◎' : s.type === 'break' ? '☘' : '!'}
                        </div>
                        <div>
                          <h3>{s.task}</h3>
                          <p>{s.type === 'focus' ? 'Focus session' : s.type === 'break' ? 'Recovery break' : 'Stopped early'} &middot; {s.sound} &middot; {s.time}</p>
                          <span className={`${styles.badge} ${s.status === 'Completed' ? styles.done : s.status === 'Break' ? styles.break : styles.abandoned}`}>
                            {s.status}
                          </span>
                        </div>
                        <div className={styles.duration}>{s.duration}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside className={styles.side}>
          <section className={`${styles.card} ${styles.insight}`}>
            <div className={styles.eyebrow}>Insight</div>
            <h3>Best focus window</h3>
            {bestFocusWindow ? (
              <>
                <span className={styles.insightTime}>{bestFocusWindow}</span>
                <p>You complete longer sessions during this window. Plan tomorrow&apos;s deep work here.</p>
                <button className={styles.insightAction} onClick={() => router.push('/app')}>Plan tomorrow&apos;s focus</button>
              </>
            ) : (
              <p>Complete a few focus sessions to discover your best focus window.</p>
            )}
          </section>

          <section className={styles.card}>
            <div className={styles.eyebrow}>Breakdown</div>
            <h3>This week</h3>
            <div className={styles.metricList}>
              <div className={styles.metric}><span>Average session</span><strong>{avgSession}m</strong></div>
              <div className={styles.metric}><span>Longest session</span><strong>{longestSession}m</strong></div>
              <div className={styles.metric}><span>Most used sound</span><strong>{historyStats.mostUsedAudio || 'N/A'}</strong></div>
              <div className={styles.metric}><span>Completion rate</span><strong>{completionRate}%</strong></div>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.eyebrow}>Task summary</div>
            <h3>Top tasks</h3>
            <div className={styles.metricList}>
              {topTasks.length > 0 ? topTasks.map((t, i) => (
                <div key={i} className={styles.metric}><span>{t.title}</span><strong>{fm(t.minutes)}</strong></div>
              )) : (
                <p style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>No task data yet. Assign tasks to your focus sessions.</p>
              )}
            </div>
          </section>
        </aside>
      </section>

      {/* Detail Modal */}
      {selectedSession && (
        <div className={`${styles.modalBackdrop} ${styles.open}`} onClick={() => setSelectedSession(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <div>
                <div className={styles.eyebrow}>Session detail</div>
                <h2>{selectedSession.task}</h2>
                <p>{selectedSession.status} &middot; {selectedSession.duration}</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedSession(null)}>&#10005;</button>
            </div>
            
            <div className={styles.detailGrid}>
              <div className={styles.detailRow}><span>Type</span><strong>{selectedSession.type.charAt(0).toUpperCase() + selectedSession.type.slice(1)}</strong></div>
              <div className={styles.detailRow}><span>Sound</span><strong>{selectedSession.sound}</strong></div>
              <div className={styles.detailRow}><span>Time</span><strong>{selectedSession.time}</strong></div>
              <div className={styles.detailRow}><span>Duration</span><strong>{selectedSession.duration}</strong></div>
              <div className={styles.detailRow}><span>Status</span><strong>{selectedSession.status}</strong></div>
              <div className={styles.detailRow}><span>Date</span><strong>{selectedSession.date}</strong></div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.btn} onClick={() => router.push('/app')}>Start new session</button>
              <button className={styles.btn} onClick={() => {
                const detail = `${selectedSession.task} · ${selectedSession.duration} · ${selectedSession.sound} · ${selectedSession.status}`;
                navigator.clipboard?.writeText(detail).then(() => showToast('Detail copied'));
              }}>Copy detail</button>
            </div>
          </div>
        </div>
      )}

      <div className={`${styles.toast} ${toastMessage ? styles.toastShow : ''}`}>
        {toastMessage}
      </div>
    </div>
  );
}
