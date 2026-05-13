'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { FocusFreqSettings } from '@/types/settings';

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
      <div 
        className="fixed inset-0 z-40 bg-surface-900/20 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div className="w-full max-w-md bg-white rounded-[24px] sm:rounded-[28px] flex flex-col pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
          style={{ maxHeight: 'calc(100vh - 40px)', boxShadow: '0 20px 60px rgba(31,24,16,0.12)' }}
        >
        <div className="flex items-center justify-between p-6 border-b border-surface-200">
          <h2 className="text-xl font-bold text-text-primary">Settings</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-text-muted hover:bg-surface-100 hover:text-text-primary transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Timer Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-focus">Timer (Minutes)</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Pomodoro</label>
                <input 
                  type="number" 
                  min="1"
                  value={localTimers.pomodoroMinutes}
                  onChange={(e) => handleTimerChange('pomodoroMinutes', e.target.value)}
                  aria-label="Pomodoro duration in minutes"
                  className="w-full rounded-xl border border-surface-200 bg-white px-3 py-2 text-sm font-medium text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Short Break</label>
                <input 
                  type="number" 
                  min="1"
                  value={localTimers.shortBreakMinutes}
                  onChange={(e) => handleTimerChange('shortBreakMinutes', e.target.value)}
                  aria-label="Short Break duration in minutes"
                  className="w-full rounded-xl border border-surface-200 bg-white px-3 py-2 text-sm font-medium text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Long Break</label>
                <input 
                  type="number" 
                  min="1"
                  value={localTimers.longBreakMinutes}
                  onChange={(e) => handleTimerChange('longBreakMinutes', e.target.value)}
                  aria-label="Long Break duration in minutes"
                  className="w-full rounded-xl border border-surface-200 bg-white px-3 py-2 text-sm font-medium text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Long Break Interval</label>
              <div className="flex items-center justify-between bg-surface-50 p-3 rounded-xl border border-surface-200">
                <span className="text-sm text-text-secondary">Pomodoros before long break</span>
                <input 
                  type="number" 
                  min="2" max="12"
                  value={settings.longBreakInterval}
                  onChange={(e) => handleChange('longBreakInterval', parseInt(e.target.value) || 4)}
                  aria-label="Pomodoros before long break"
                  className="w-16 rounded-lg border border-surface-200 bg-white px-2 py-1 text-center text-sm font-medium focus:border-focus focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-text-primary">Auto-start Breaks</span>
                <input 
                  type="checkbox" 
                  checked={settings.autoStartBreaks}
                  onChange={(e) => handleChange('autoStartBreaks', e.target.checked)}
                  className="h-5 w-5 rounded border-surface-300"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-text-primary">Auto-start Pomodoros</span>
                <input 
                  type="checkbox" 
                  checked={settings.autoStartPomodoros}
                  onChange={(e) => handleChange('autoStartPomodoros', e.target.checked)}
                  className="h-5 w-5 rounded border-surface-300"
                />
              </label>
            </div>
          </section>

          {/* Sound Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-focus">Alarm</h3>
            
            <div ref={alarmDropdownRef} className="relative">
              <label className="block text-sm font-medium text-text-primary mb-2">Alarm Sound</label>
              <button
                type="button"
                onClick={() => setIsAlarmDropdownOpen(!isAlarmDropdownOpen)}
                className="w-full flex items-center justify-between rounded-xl border border-surface-200 bg-white px-3 py-2.5 text-sm font-medium text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus/20 hover:bg-surface-50 transition-colors"
              >
                <span>{alarmOptions.find(o => o.value === settings.alarmSound)?.label || 'Soft Bell'}</span>
                <ChevronUpDownIcon className="h-4 w-4 text-text-muted" />
              </button>

              {isAlarmDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-xl border border-surface-200 bg-white py-1 shadow-lg animate-in fade-in zoom-in-95 duration-100">
                  {alarmOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        handleChange('alarmSound', option.value);
                        setIsAlarmDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                        settings.alarmSound === option.value
                          ? 'bg-focus-soft text-focus font-semibold'
                          : 'text-text-primary hover:bg-surface-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-text-primary">Alarm Volume</label>
                <span className="text-xs text-text-muted">{settings.alarmVolume}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100"
                value={settings.alarmVolume}
                onChange={(e) => handleChange('alarmVolume', parseInt(e.target.value))}
                aria-label="Alarm Volume"
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-text-primary">Alarm Repeat</label>
                <span className="text-xs text-text-muted">{settings.alarmRepeat}x</span>
              </div>
              <input 
                type="range" 
                min="1" max="5"
                value={settings.alarmRepeat}
                onChange={(e) => handleChange('alarmRepeat', parseInt(e.target.value))}
                aria-label="Alarm Repeat"
                className="w-full"
              />
            </div>
          </section>

          {/* Task Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-focus">Tasks</h3>
            
            <div className="space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-text-primary">Check completed to bottom</span>
                <input 
                  type="checkbox" 
                  checked={settings.checkCompletedTasksToBottom}
                  onChange={(e) => handleChange('checkCompletedTasksToBottom', e.target.checked)}
                  className="h-5 w-5 rounded border-surface-300"
                />
              </label>
            </div>
          </section>
          
          {/* Notifications Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-focus">Notifications</h3>
            
            <div className="space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-text-primary">Browser Notifications</span>
                <input 
                  type="checkbox" 
                  checked={settings.notificationsEnabled}
                  onChange={(e) => {
                    const enabled = e.target.checked;
                    handleChange('notificationsEnabled', enabled);
                    if (enabled && typeof window !== 'undefined' && 'Notification' in window) {
                      Notification.requestPermission();
                    }
                  }}
                  className="h-5 w-5 rounded border-surface-300"
                />
              </label>
            </div>
          </section>

        </div>
      </div>
      </div>
    </>
  );
}
