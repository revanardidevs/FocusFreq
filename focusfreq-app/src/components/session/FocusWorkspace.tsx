'use client';

import { useState, useCallback, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { TimerState, TimerType, SessionType, type FocusSession } from '@/types';
import { useTasks } from '@/hooks/useTasks';
import { useTimer } from '@/hooks/useTimer';
import { useAuth } from '@/hooks/useAuth';
import { usePomodoroCycle } from '@/hooks/usePomodoroCycle';
import TaskList from '@/components/tasks/TaskList';
import Timer from '@/components/timer/Timer';
import { ModeTabs, DurationPresets } from '@/components/timer/TimerPresets';
import TimerControls from '@/components/timer/TimerControls';
import SessionRecap from '@/components/session/SessionRecap';
import { historyService } from '@/services/historyService';
import { formatMinutes } from '@/lib/utils';
import JoinLeaderboardModal from '@/components/leaderboard/JoinLeaderboardModal';
import { useAudio } from '@/hooks/useAudio';
import AudioSummary from '@/components/audio/AudioSummary';
import AudioPanel from '@/components/audio/AudioPanel';
import { audioEngine } from '@/lib/audioEngine';
import { writeSessionToSupabase } from '@/services/supabaseSessionService';
import { AudioMode } from '@/types';
import SettingsPanel from '@/components/settings/SettingsPanel';
import { alarmService } from '@/lib/audio/alarmService';
import styles from './FocusWorkspace.module.css';

const Cog8ToothIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PencilIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.89 1.14l-2.812.938.938-2.812a4.5 4.5 0 011.14-1.89l12.654-12.654z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125L16.862 4.487" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

function FocusWorkspaceInner() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [lastSession, setLastSession] = useState<FocusSession | null>(null);
  const [isAudioPanelOpen, setIsAudioPanelOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [isTasksExpanded, setIsTasksExpanded] = useState(false);
  const [taskInputVal, setTaskInputVal] = useState('');
  const searchParams = useSearchParams();

  const { user, profile, updateDisplayName } = useAuth();
  const audio = useAudio();

  // Quick-mode handler for AudioSummary preset buttons
  const handleQuickMode = useCallback((mode: AudioMode, detail?: string) => {
    if (mode === AudioMode.NONE) {
      audio.updateSettings({ mode: AudioMode.NONE });
    } else if (mode === AudioMode.NOISE && detail) {
      audio.updateSettings({ mode: AudioMode.NOISE });
      audio.updateNoise({ type: detail as any });
    } else if (mode === AudioMode.TONE && detail) {
      audio.updateSettings({ mode: AudioMode.TONE });
      audio.updateTone({ frequencyHz: parseInt(detail, 10) });
    }
    audio.stopPreview();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAutoStart = useCallback(() => {
    handleStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Will define handleStart below, but wrap in ref if needed

  const cycle = usePomodoroCycle({
    onAutoStart: () => {
      // Use a ref to access the latest handleStart
      if (startRef.current) startRef.current();
    }
  });

  // Read URL parameters on mount to prefill state
  useEffect(() => {
    const timerParam = searchParams.get('timer');
    if (timerParam) {
      const parsedTimer = parseInt(timerParam, 10);
      if (!isNaN(parsedTimer) && parsedTimer > 0) {
        cycle.setMinutes(parsedTimer);
      }
    }

    const audioModeParam = searchParams.get('audioMode') as AudioMode | null;
    if (audioModeParam) {
      const updates: any = { mode: audioModeParam };
      
      if (audioModeParam === AudioMode.TONE) {
        const hz = searchParams.get('hz');
        const waveform = searchParams.get('waveform');
        if (hz) updates.tone = { ...audio.settings.tone, frequencyHz: parseInt(hz, 10) };
        if (waveform) updates.tone = { ...updates.tone, waveform };
      } else if (audioModeParam === AudioMode.NOISE) {
        const noiseType = searchParams.get('noise');
        if (noiseType) updates.noise = { ...audio.settings.noise, type: noiseType };
      } else if (audioModeParam === AudioMode.BINAURAL) {
        const baseHz = searchParams.get('baseHz');
        const beatHz = searchParams.get('beatHz');
        if (baseHz) updates.binaural = { ...audio.settings.binaural, baseHz: parseInt(baseHz, 10) };
        if (beatHz) updates.binaural = { ...updates.binaural, beatHz: parseInt(beatHz, 10) };
      }
      
      audio.updateSettings(updates);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    tasks,
    createTask,
    updateTask,
    completeTask,
    deleteTask,
    refresh: refreshTasks,
  } = useTasks();

  const handleComplete = useCallback((session: FocusSession) => {
    audioEngine.stop();
    setLastSession(session);
    refreshTasks();

    cycle.handleSessionComplete(session);

    const audioDetail = session.audioMode === AudioMode.TONE
      ? `${session.frequencyHz} Hz · ${session.waveform}`
      : session.audioMode === AudioMode.NOISE
      ? `${session.noiseType} noise`
      : session.audioMode === AudioMode.BINAURAL
      ? `${session.binauralLeftHz}/${session.binauralRightHz} Hz binaural`
      : null;

    // Snapshot task title for Supabase record
    const taskTitleSnapshot = session.taskId
      ? tasks.find(t => t.id === session.taskId)?.title ?? null
      : null;

    writeSessionToSupabase({
      plannedMinutes: session.plannedDurationMinutes,
      actualMinutes: session.actualDurationMinutes,
      status: 'completed',
      audioMode: session.audioMode || null,
      audioDetail,
      startedAt: new Date(session.startedAt),
      endedAt: new Date(session.endedAt),
      sessionType: session.sessionType,
      taskTitle: taskTitleSnapshot,
    });
  }, [refreshTasks, cycle, tasks]);

  const handleAbandon = useCallback((session: FocusSession) => {
    audioEngine.stop();
    cycle.cancelAutoStart();
    setLastSession(session);

    // Snapshot task title for Supabase record
    const taskTitleSnapshot = session.taskId
      ? tasks.find(t => t.id === session.taskId)?.title ?? null
      : null;

    writeSessionToSupabase({
      plannedMinutes: session.plannedDurationMinutes,
      actualMinutes: session.actualDurationMinutes,
      status: 'abandoned',
      audioMode: session.audioMode || null,
      audioDetail: null,
      startedAt: new Date(session.startedAt),
      endedAt: new Date(session.endedAt),
      sessionType: session.sessionType,
      taskTitle: taskTitleSnapshot,
    });
  }, [cycle, tasks]);

  const timer = useTimer({
    onComplete: handleComplete,
    onAbandon: handleAbandon,
  });

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = taskInputVal.trim();
    if (!trimmed) return;
    const newTask = createTask({ title: trimmed });
    setSelectedTaskId(newTask.id);
    setTaskInputVal('');
  };

  const isTimerActive =
    timer.timerState === TimerState.RUNNING ||
    timer.timerState === TimerState.PAUSED;

  const isBreak = cycle.currentMode !== 'focus';

  const handleStart = async () => {
    cycle.cancelAutoStart();
    
    // Play audio only if it's focus mode
    const audioSettingsToPass = isBreak ? { mode: AudioMode.NONE } : audio.settings;

    timer.start(
      cycle.currentMinutes, 
      TimerType.CUSTOM, 
      selectedTaskId, 
      cycle.currentMode, 
      isBreak, 
      audioSettingsToPass
    );
    
    alarmService.stop();
    audio.stopPreview();
    
    if (!isBreak && audio.settings.mode !== AudioMode.NONE) {
      await audioEngine.play(audio.settings);
    }
  };

  const startRef = useRef(handleStart);
  useEffect(() => {
    startRef.current = handleStart;
  }, [handleStart]);

  const handlePause = () => {
    timer.pause();
    audioEngine.stop(); // fade out
  };

  const handleResume = async () => {
    timer.resume();
    const isBreakNow = cycle.currentMode !== 'focus';
    if (!isBreakNow && audio.settings.mode !== AudioMode.NONE) {
      await audioEngine.play(audio.settings); // fade in
    }
  };

  const handleRecapDismiss = () => {
    setLastSession(null);
    timer.reset();
  };

  // Show recap after session ends
  if (lastSession && (timer.timerState === TimerState.COMPLETED || timer.timerState === TimerState.ABANDONED)) {
    const showLeaderboardCTA = lastSession.status === 'completed' && user && !profile?.display_name && !lastSession.isBreak;

    return (
      <div className="mx-auto max-w-md px-4 py-8 animate-fade-in relative">
        {/* If auto start is ticking, show a banner at top */}
        {cycle.autoStartCountdown !== null && (
          <div className="absolute -top-12 left-0 right-0 flex justify-center">
            <div className="bg-white text-text-primary rounded-full px-6 py-2 text-sm font-bold shadow-card border border-surface-200 flex items-center space-x-3 animate-slide-down">
              <span>Auto-starting next session in {cycle.autoStartCountdown}s</span>
              <button 
                onClick={cycle.cancelAutoStart}
                className="text-focus hover:text-focus-hover underline underline-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        <SessionRecap session={lastSession} onDismiss={handleRecapDismiss} onCompleteTask={completeTask} />

        {showLeaderboardCTA && (
          <div className="mt-4 rounded-xl border border-focus-border bg-focus-soft p-4 text-center animate-slide-up">
            <p className="text-sm font-medium text-text-primary">Want to appear on the leaderboard?</p>
            <button
              onClick={() => setShowLeaderboardModal(true)}
              className="mt-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
              style={{ background: 'linear-gradient(135deg, #F05A3C, #FF735C)' }}
            >
              Set Display Name
            </button>
          </div>
        )}

        <JoinLeaderboardModal
          isOpen={showLeaderboardModal}
          onClose={() => setShowLeaderboardModal(false)}
          onSubmit={updateDisplayName}
          currentName={profile?.display_name}
        />
      </div>
    );
  }

  return (
    <div className={isTimerActive ? styles.running : styles.idle}>
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <section className={styles.workspace}>
        {/* Main Timer Card */}
        <div className={`${styles.timerCard} ${isBreak ? 'border-break-border' : 'border-surface-200'}`}>
          
          <div className={styles.topActions}>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className={styles.iconBtn}
              title="Settings"
            >
              <Cog8ToothIcon className="w-6 h-6" />
            </button>
            {selectedTaskId && !isTimerActive && (
              <button 
                onClick={() => setSelectedTaskId(null)} 
                className={styles.iconBtn}
                title="Clear task"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            )}
          </div>

        
          {/* Current Task Area */}
          <div className={styles.taskHead}>
            {selectedTaskId ? (
              <>
                <div className={styles.eyebrow}>Working on</div>
                <h1 className={styles.taskTitle}>
                  {tasks.find((t) => t.id === selectedTaskId)?.title || 'Unknown Task'}
                </h1>
              </>
            ) : (
              !isTimerActive && (
                <>
                  <div className={styles.eyebrow}>What will you focus on?</div>
                  <form onSubmit={handleTaskSubmit} className="w-full">
                    <input
                      type="text"
                      value={taskInputVal}
                      onChange={(e) => setTaskInputVal(e.target.value)}
                      placeholder="e.g. Write landing page copy"
                      className={styles.taskInput}
                      autoComplete="off"
                    />
                  </form>
                </>
              )
            )}
            {/* Free Focus Fallback */}
            {!selectedTaskId && isTimerActive && cycle.currentMode === 'focus' && (
              <>
                <div className={styles.eyebrow}>Free Focus</div>
                <h1 className={styles.taskTitle}>Free Focus</h1>
              </>
            )}
          </div>


          
          {/* Pomodoro Tracker */}
          {cycle.pomodorosCompleted > 0 && !isTimerActive && (
            <div className="flex space-x-1.5 animate-fade-in">
              {Array.from({ length: cycle.pomodorosCompleted }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-focus" />
              ))}
            </div>
          )}

          {/* Auto Start Overlay (over timer) */}
          {cycle.autoStartCountdown !== null ? (
            <div className="flex flex-col items-center justify-center py-6 animate-in zoom-in-95 duration-300">
              <div className="text-6xl font-[800] text-text-primary tracking-tight mb-4">
                {cycle.autoStartCountdown}
              </div>
              <p className="text-text-secondary font-medium mb-6">Starting {cycle.currentMode.replace('_', ' ')}...</p>
              <div className="flex gap-4">
                <button 
                  onClick={handleStart}
                  className="px-6 py-2.5 rounded-[14px] text-white font-bold transition-all hover:-translate-y-0.5"
                  style={{ background: isBreak ? 'linear-gradient(135deg, #2FAE75, #46C98D)' : 'linear-gradient(135deg, #F05A3C, #FF735C)' }}
                >
                  Start Now
                </button>
                <button 
                  onClick={cycle.cancelAutoStart}
                  className="px-6 py-2.5 rounded-[14px] bg-white border border-surface-200 text-text-primary font-bold hover:bg-surface-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Mode Tabs (Above Timer) */}
              {!isTimerActive && (
                <div className="w-full animate-fade-in">
                  <ModeTabs
                    currentMode={cycle.currentMode}
                    onModeChange={cycle.setMode}
                    disabled={isTimerActive}
                  />
                </div>
              )}

              {/* Timer */}
              <Timer
                remainingSeconds={
                  timer.timerState === TimerState.IDLE
                    ? cycle.currentMinutes * 60
                    : timer.remainingSeconds
                }
                progress={timer.progress}
                timerState={timer.timerState}
                isBreak={isBreak}
              />

              {/* Presets & Audio */}
              {!isTimerActive && (
                <div className="w-full flex flex-col items-center space-y-3">


                  {/* Audio Controls (Only visible in Focus mode) */}
                  {cycle.currentMode === 'focus' && (
                    isAudioPanelOpen ? (
                      <div className="w-full max-w-sm mt-2 animate-fade-in">
                        <AudioPanel
                          settings={audio.settings}
                          isPreviewing={audio.isPreviewing}
                          updateSettings={audio.updateSettings}
                          updateTone={audio.updateTone}
                          updateBinaural={audio.updateBinaural}
                          updateNoise={audio.updateNoise}
                          togglePreview={audio.togglePreview}
                          stopPreview={audio.stopPreview}
                          onClose={() => setIsAudioPanelOpen(false)}
                        />
                      </div>
                    ) : (
                      <div className="animate-fade-in w-full">
                        <AudioSummary
                          settings={audio.settings}
                          isPreviewing={audio.isPreviewing}
                          onOpenPanel={() => setIsAudioPanelOpen(true)}
                          onTogglePreview={audio.togglePreview}
                          onQuickMode={handleQuickMode}
                        />
                      </div>
                    )
                  )}

                  {/* Break audio message */}
                  {isBreak && (
                    <div className="text-sm text-text-muted bg-surface-50 border border-surface-200 rounded-xl px-4 py-2.5">
                      Focus audio is off during breaks
                    </div>
                  )}
                </div>
              )}

              {/* Audio summary during active focus */}
              {isTimerActive && !isBreak && audio.settings.mode !== AudioMode.NONE && (
                <div className="animate-fade-in w-full max-w-sm mt-4">
                  <AudioSummary
                    settings={audio.settings}
                    onOpenPanel={() => setIsSettingsOpen(true)}
                    compact
                  />
                </div>
              )}

              {/* Controls */}
              <TimerControls
                timerState={timer.timerState}
                canStart={cycle.currentMinutes > 0}
                onStart={handleStart}
                onPause={handlePause}
                onResume={handleResume}
                onAbandon={timer.abandon}
                onReset={handleRecapDismiss}
                startLabel={cycle.currentMode === 'focus' ? 'Start Focusing' : 'Start Break'}
                isBreak={isBreak}
              />
            </>
          )}
        </div>

        {/* Sidebar / Stats / Tasks */}
        <aside className={styles.side}>
          <OverviewStatsInline />

          <section className={styles.card}>
            <div className={styles.eyebrow}>Tasks</div>
            <h3>Today&apos;s work</h3>
            <TaskList
              tasks={tasks}
              selectedTaskId={selectedTaskId}
              onSelectTask={setSelectedTaskId}
              onCreateTask={createTask}
              onUpdateTask={updateTask}
              onCompleteTask={completeTask}
              onDeleteTask={deleteTask}
            />
          </section>

          {/* Break card suggestion */}
          {cycle.currentMode === 'focus' && !isTimerActive && (
            <section className={`${styles.card} ${styles.breakCard}`}>
              <h3>Need a break?</h3>
              <p>Step away for 5 minutes. Stretch, hydrate, and rest your eyes.</p>
              <button onClick={() => cycle.setMode('short_break')}>
                Take a short break
              </button>
              <div className={styles.leaf}>🌿</div>
            </section>
          )}
        </aside>

        {/* Mobile Support (duplicates sidebar content below timer on small screens) */}
        <div className={styles.mobileSupport}>
          <OverviewStatsInline />
          <section className={styles.card}>
            <TaskList
              tasks={tasks}
              selectedTaskId={selectedTaskId}
              onSelectTask={setSelectedTaskId}
              onCreateTask={createTask}
              onUpdateTask={updateTask}
              onCompleteTask={completeTask}
              onDeleteTask={deleteTask}
            />
          </section>
          {cycle.currentMode === 'focus' && !isTimerActive && (
            <section className={`${styles.card} ${styles.breakCard}`}>
              <h3>Need a break?</h3>
              <p>Step away for 5 minutes. Stretch, hydrate, and rest your eyes.</p>
              <button onClick={() => cycle.setMode('short_break')}>
                Take a short break
              </button>
              <div className={styles.leaf}>🌿</div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}

// Inline component for Today Summary
// Deferred to client-only via useEffect to avoid SSR/client localStorage mismatch
function OverviewStatsInline() {
  const [stats, setStats] = useState<ReturnType<typeof historyService.getHistoryStats> | null>(null);

  useEffect(() => {
    setStats(historyService.getHistoryStats());
  }, []);

  if (!stats) {
    return (
      <section className={`${styles.card} ${styles.today}`}>
        <div className={styles.eyebrow}>Today</div>
        <h3>Your focus progress</h3>
        <div className={styles.stats}>
          <div className={styles.stat}><strong>-</strong><span>Focus time</span></div>
          <div className={styles.stat}><strong>-</strong><span>Sessions</span></div>
          <div className={styles.stat}><strong>-</strong><span>Tasks done</span></div>
          <div className={styles.stat}><strong>-</strong><span>Streak</span></div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.card} ${styles.today}`}>
      <div className={styles.eyebrow}>Today</div>
      <h3>Your focus progress</h3>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <strong>{formatMinutes(stats.todayFocusMinutes)}</strong>
          <span>Focus time</span>
        </div>
        <div className={styles.stat}>
          <strong>{stats.todayCompletedSessions}</strong>
          <span>Sessions</span>
        </div>
        <div className={styles.stat}>
          <strong>{stats.todayAbandonedSessions}</strong>
          <span>Abandoned</span>
        </div>
        <div className={styles.stat}>
          <strong>{stats.currentStreak}</strong>
          <span>Streak 🔥</span>
        </div>
      </div>
    </section>
  );
}

export default function FocusWorkspace() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-muted animate-pulse">Loading workspace...</div>}>
      <FocusWorkspaceInner />
    </Suspense>
  );
}
