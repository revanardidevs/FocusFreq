'use client';

import React, { useState, useMemo } from 'react';
import { useSessions } from '@/hooks/useSessions';
import styles from './history.module.css';

// --- MOCK DATA ---
const MOCK_CHART_DATA = {
  week: [
    { day: 'Mon', focus: 45, break: 10, abandoned: 0 },
    { day: 'Tue', focus: 80, break: 15, abandoned: 0 },
    { day: 'Wed', focus: 25, break: 10, abandoned: 8 },
    { day: 'Thu', focus: 130, break: 20, abandoned: 0 },
    { day: 'Fri', focus: 105, break: 15, abandoned: 0 },
    { day: 'Sat', focus: 55, break: 10, abandoned: 12 },
    { day: 'Sun', focus: 20, break: 5, abandoned: 0 }
  ],
  month: [
    { day: 'W1', focus: 310, break: 55, abandoned: 12 },
    { day: 'W2', focus: 465, break: 75, abandoned: 8 },
    { day: 'W3', focus: 390, break: 70, abandoned: 30 },
    { day: 'W4', focus: 520, break: 90, abandoned: 18 }
  ],
  all: [
    { day: 'Jan', focus: 740, break: 120, abandoned: 48 },
    { day: 'Feb', focus: 920, break: 150, abandoned: 36 },
    { day: 'Mar', focus: 1180, break: 210, abandoned: 42 },
    { day: 'Apr', focus: 1015, break: 190, abandoned: 28 },
    { day: 'May', focus: 465, break: 75, abandoned: 20 }
  ]
};

const MOCK_SESSIONS = [
  { id: '1', task: 'Write landing page copy', type: 'focus', sound: 'Brown Noise', time: '10:30 AM', duration: '25:00', status: 'Completed', date: 'Today \u00b7 May 11' },
  { id: '2', task: 'Short Break', type: 'break', sound: 'Audio off', time: '10:55 AM', duration: '05:00', status: 'Break', date: 'Today \u00b7 May 11' },
  { id: '3', task: 'Review FocusFreq UI', type: 'focus', sound: '432 Hz', time: '11:05 AM', duration: '50:00', status: 'Completed', date: 'Today \u00b7 May 11' },
  { id: '4', task: 'Prepare deployment notes', type: 'focus', sound: 'Pink Noise', time: '3:20 PM', duration: '25:00', status: 'Completed', date: 'Yesterday \u00b7 May 10' },
  { id: '5', task: 'Research hosting options', type: 'abandoned', sound: 'No Audio', time: '4:05 PM', duration: '08:12', status: 'Abandoned', date: 'Yesterday \u00b7 May 10' },
  { id: '6', task: 'Cloudflare deployment trial', type: 'focus', sound: 'Brown Noise', time: '7:10 PM', duration: '90:00', status: 'Completed', date: 'Yesterday \u00b7 May 10' },
];

function fm(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const r = minutes % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
}

function seconds(duration: string) {
  const [m, s] = duration.split(':').map(Number);
  return (m || 0) * 60 + (s || 0);
}

type FilterType = 'all' | 'focus' | 'break' | 'abandoned';
type RangeType = 'week' | 'month' | 'all';
type SortType = 'newest' | 'oldest' | 'longest';

export default function HistoryClient() {
  const { historyStats, isLoading } = useSessions();
  
  // State
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [chartRange, setChartRange] = useState<RangeType>('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortType>('newest');
  
  const [collapsedDays, setCollapsedDays] = useState<Record<string, boolean>>({});
  const [selectedSession, setSelectedSession] = useState<typeof MOCK_SESSIONS[0] | null>(null);
  const [mockDataCleared, setMockDataCleared] = useState(false);
  
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
  };

  const clearHistory = () => {
    if (confirm('Clear mock history data?')) {
      setMockDataCleared(true);
    }
  };

  // Derived Data
  const chartData = MOCK_CHART_DATA[chartRange];
  
  const getChartVal = (x: any) => {
    if (activeFilter === 'break') return x.break;
    if (activeFilter === 'abandoned') return x.abandoned;
    if (activeFilter === 'focus') return x.focus;
    return x.focus + x.break + x.abandoned;
  };
  
  const getChartType = (x: any) => {
    if (activeFilter === 'break') return 'break';
    if (activeFilter === 'abandoned') return 'abandoned';
    if (activeFilter === 'focus') return 'focus';
    return x.abandoned > x.focus ? 'abandoned' : x.break > x.focus ? 'break' : 'focus';
  };

  const maxChartVal = Math.max(...chartData.map(getChartVal), 1);

  const filteredSessions = useMemo(() => {
    if (mockDataCleared) return [];
    
    let list = MOCK_SESSIONS.filter(s => {
      const okType = activeFilter === 'all' || s.type === activeFilter;
      const okSearch = !searchTerm || `${s.task} ${s.sound} ${s.status} ${s.type}`.toLowerCase().includes(searchTerm.toLowerCase());
      return okType && okSearch;
    });

    list = list.sort((a, b) => {
      if (sortOption === 'oldest') return a.time.localeCompare(b.time); // Simple mock sort
      if (sortOption === 'longest') return seconds(b.duration) - seconds(a.duration);
      return b.time.localeCompare(a.time); // newest
    });

    return list;
  }, [activeFilter, searchTerm, sortOption, mockDataCleared]);

  const groupedSessions = useMemo(() => {
    const groups: Record<string, typeof MOCK_SESSIONS> = {};
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
          <button className={styles.btn}>Copy Summary</button>
          <button className={`${styles.btn} ${styles.primary}`}>Start Focus</button>
          <div className={styles.moreWrap}>
            <button className={styles.btn} onClick={() => alert('Mock: More Menu')}>&bull;&bull;&bull;</button>
          </div>
        </div>
      </section>

      {/* Summary Grid */}
      <section className={styles.summaryGrid}>
        <div className={`${styles.statCard} ${styles.focus}`}>
          <strong>{mockDataCleared ? '0m' : fm(historyStats.weeklyFocusMinutes || 465)}</strong>
          <span>Focus time this week</span>
        </div>
        <div className={styles.statCard}>
          <strong>{mockDataCleared ? '0' : (historyStats.weeklyCompletedSessions || 16)}</strong>
          <span>Focus sessions</span>
        </div>
        <div className={`${styles.statCard} ${styles.break}`}>
          <strong>{mockDataCleared ? '0' : 5}</strong>
          <span>Tasks completed</span>
        </div>
        <div className={`${styles.statCard} ${styles.audio}`}>
          <strong>{mockDataCleared ? '0 days' : `${historyStats.currentStreak || 3} days`}</strong>
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
            
            {mockDataCleared ? (
               <div className={`${styles.empty} ${styles.show}`} style={{ width: '100%' }}>
                 <h3>No chart data</h3>
                 <p>Mock history has been cleared.</p>
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
                <h3>No sessions found</h3>
                <p>Try another filter or start your first focus session.</p>
              </div>
            )}

            {!mockDataCleared && (
              <div className={styles.hint}>
                Note: Currently using mock data for UI visual demonstration.
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
            <span className={styles.insightTime}>10 AM &ndash; 12 PM</span>
            <p>You complete longer sessions during this window. Plan tomorrow&apos;s deep work here or set a reminder before you start.</p>
            <button className={styles.insightAction}>Plan tomorrow&apos;s focus</button>
          </section>

          <section className={styles.card}>
            <div className={styles.eyebrow}>Breakdown</div>
            <h3>This week</h3>
            <div className={styles.metricList}>
              <div className={styles.metric}><span>Average session</span><strong>29m</strong></div>
              <div className={styles.metric}><span>Longest session</span><strong>90m</strong></div>
              <div className={styles.metric}><span>Most used sound</span><strong>{historyStats.mostUsedAudio || 'Brown Noise'}</strong></div>
              <div className={styles.metric}><span>Completion rate</span><strong>89%</strong></div>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.eyebrow}>Task summary</div>
            <h3>Top tasks</h3>
            <div className={styles.metricList}>
              <div className={styles.metric}><span>Landing page copy</span><strong>2h 05m</strong></div>
              <div className={styles.metric}><span>UI planning</span><strong>1h 40m</strong></div>
              <div className={styles.metric}><span>Deployment research</span><strong>1h 15m</strong></div>
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
            </div>

            <div className={styles.modalActions}>
              <button className={styles.btn}>Repeat task</button>
              <button className={styles.btn}>Copy detail</button>
              <button className={styles.dangerBtn} onClick={() => {
                if(confirm('Delete this mock session?')) setSelectedSession(null);
              }}>Delete session</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
