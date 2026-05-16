'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { FocusFreqSettings } from '@/types/settings';
import styles from './SettingsPanel.module.css';

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronUpDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
  </svg>
);

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateSettings } = useSettings();

  const [isAlarmDropdownOpen, setIsAlarmDropdownOpen] = useState(false);
  const alarmDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsAlarmDropdownOpen(false); // reset dropdown state when panel closes
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (alarmDropdownRef.current && !alarmDropdownRef.current.contains(event.target as Node)) {
        setIsAlarmDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [localTimers, setLocalTimers] = useState({
    pomodoroMinutes: settings.pomodoroMinutes.toString(),
    shortBreakMinutes: settings.shortBreakMinutes.toString(),
    longBreakMinutes: settings.longBreakMinutes.toString(),
  });

  useEffect(() => {
    setLocalTimers({
      pomodoroMinutes: settings.pomodoroMinutes.toString(),
      shortBreakMinutes: settings.shortBreakMinutes.toString(),
      longBreakMinutes: settings.longBreakMinutes.toString(),
    });
  }, [settings.pomodoroMinutes, settings.shortBreakMinutes, settings.longBreakMinutes]);

  const handleTimerChange = (key: 'pomodoroMinutes' | 'shortBreakMinutes' | 'longBreakMinutes', value: string) => {
    setLocalTimers(prev => ({ ...prev, [key]: value }));
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed > 0) {
      handleChange(key, parsed);
    }
  };

  if (!isOpen) return null;

  const handleChange = (key: keyof FocusFreqSettings, value: any) => {
    updateSettings({ [key]: value });
  };

  const alarmOptions = [
    { value: 'soft_bell', label: 'Soft Bell' },
    { value: 'digital_beep', label: 'Digital Beep' },
    { value: 'none', label: 'None' }
  ];

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.wrapper}>
        <div className={styles.modal} style={{ position: 'relative' }}>

          {/* Header */}
          <div className={styles.modalHead}>
            <span className={styles.eyebrow}>Timer Settings</span>
            <h2>Customize your Pomodoro cycle.</h2>
            <p>Set your focus, break, and long break durations.</p>
            <button onClick={onClose} className={styles.closeBtn}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className={styles.body}>

            {/* Time Minutes Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Time minutes</h3>

              <div className={styles.row}>
                <div>
                  <span className={styles.rowLabel}>Pomodoro</span>
                  <span className={styles.rowSub}>Main focus session length.</span>
                </div>
                <input
                  type="number"
                  min="1"
                  value={localTimers.pomodoroMinutes}
                  onChange={(e) => handleTimerChange('pomodoroMinutes', e.target.value)}
                  aria-label="Pomodoro duration in minutes"
                  className={styles.num}
                />
              </div>

              <div className={styles.row}>
                <div>
                  <span className={styles.rowLabel}>Short Break</span>
                  <span className={styles.rowSub}>Short recovery after focus.</span>
                </div>
                <input
                  type="number"
                  min="1"
                  value={localTimers.shortBreakMinutes}
                  onChange={(e) => handleTimerChange('shortBreakMinutes', e.target.value)}
                  aria-label="Short Break duration in minutes"
                  className={styles.num}
                />
              </div>

              <div className={styles.row}>
                <div>
                  <span className={styles.rowLabel}>Long Break</span>
                  <span className={styles.rowSub}>Longer recovery after several sessions.</span>
                </div>
                <input
                  type="number"
                  min="1"
                  value={localTimers.longBreakMinutes}
                  onChange={(e) => handleTimerChange('longBreakMinutes', e.target.value)}
                  aria-label="Long Break duration in minutes"
                  className={styles.num}
                />
              </div>

              <div className={styles.row}>
                <div>
                  <span className={styles.rowLabel}>Long Break interval</span>
                  <span className={styles.rowSub}>After this many Pomodoros.</span>
                </div>
                <input
                  type="number"
                  min="2"
                  max="12"
                  value={settings.longBreakInterval}
                  onChange={(e) => handleChange('longBreakInterval', parseInt(e.target.value) || 4)}
                  aria-label="Pomodoros before long break"
                  className={styles.num}
                />
              </div>
            </div>

            {/* Behavior Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Behavior</h3>

              <div className={styles.toggleRow}>
                <div>
                  <span className={styles.rowLabel}>Auto Start Breaks</span>
                  <span className={styles.rowSub}>Use a safe countdown after focus.</span>
                </div>
                <button
                  type="button"
                  className={`${styles.toggle} ${settings.autoStartBreaks ? styles.on : ''}`}
                  onClick={() => handleChange('autoStartBreaks', !settings.autoStartBreaks)}
                  aria-label="Toggle auto start breaks"
                />
              </div>

              <div className={styles.toggleRow}>
                <div>
                  <span className={styles.rowLabel}>Auto Start Pomodoros</span>
                  <span className={styles.rowSub}>Jump to focus after break ends.</span>
                </div>
                <button
                  type="button"
                  className={`${styles.toggle} ${settings.autoStartPomodoros ? styles.on : ''}`}
                  onClick={() => handleChange('autoStartPomodoros', !settings.autoStartPomodoros)}
                  aria-label="Toggle auto start pomodoros"
                />
              </div>
            </div>

            {/* Alarm Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Alarm</h3>

              <div className={styles.row}>
                <span className={styles.rowLabel}>Alarm Sound</span>
                <div ref={alarmDropdownRef} className={styles.dropdown}>
                  <button
                    type="button"
                    onClick={() => setIsAlarmDropdownOpen(!isAlarmDropdownOpen)}
                    className={styles.dropdownBtn}
                  >
                    <span>{alarmOptions.find(o => o.value === settings.alarmSound)?.label || 'Soft Bell'}</span>
                    <ChevronUpDownIcon className="h-4 w-4" />
                  </button>
                  {isAlarmDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      {alarmOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            handleChange('alarmSound', option.value);
                            setIsAlarmDropdownOpen(false);
                          }}
                          className={`${styles.dropdownItem} ${settings.alarmSound === option.value ? styles.active : ''}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.rangeRow}>
                <div className={styles.rangeHeader}>
                  <span className={styles.rangeLabel}>Alarm Volume</span>
                  <span className={styles.rangeValue}>{settings.alarmVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.alarmVolume}
                  onChange={(e) => handleChange('alarmVolume', parseInt(e.target.value))}
                  aria-label="Alarm Volume"
                  className={styles.range}
                />
              </div>

              <div className={styles.rangeRow}>
                <div className={styles.rangeHeader}>
                  <span className={styles.rangeLabel}>Alarm Repeat</span>
                  <span className={styles.rangeValue}>{settings.alarmRepeat}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={settings.alarmRepeat}
                  onChange={(e) => handleChange('alarmRepeat', parseInt(e.target.value))}
                  aria-label="Alarm Repeat"
                  className={styles.range}
                />
              </div>
            </div>

            {/* Tasks & Notifications */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Tasks & Notifications</h3>

              <div className={styles.toggleRow}>
                <div>
                  <span className={styles.rowLabel}>Check completed to bottom</span>
                  <span className={styles.rowSub}>Move done tasks out of the way.</span>
                </div>
                <button
                  type="button"
                  className={`${styles.toggle} ${settings.checkCompletedTasksToBottom ? styles.on : ''}`}
                  onClick={() => handleChange('checkCompletedTasksToBottom', !settings.checkCompletedTasksToBottom)}
                  aria-label="Toggle check completed to bottom"
                />
              </div>

              <div className={styles.toggleRow}>
                <div>
                  <span className={styles.rowLabel}>Browser Notifications</span>
                  <span className={styles.rowSub}>Get notified when a session ends.</span>
                </div>
                <button
                  type="button"
                  className={`${styles.toggle} ${settings.notificationsEnabled ? styles.on : ''}`}
                  onClick={() => {
                    const enabled = !settings.notificationsEnabled;
                    handleChange('notificationsEnabled', enabled);
                    if (enabled && typeof window !== 'undefined' && 'Notification' in window) {
                      Notification.requestPermission();
                    }
                  }}
                  aria-label="Toggle browser notifications"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
