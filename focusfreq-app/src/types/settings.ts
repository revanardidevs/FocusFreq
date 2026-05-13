import { z } from 'zod';

export const FocusFreqSettingsSchema = z.object({
  pomodoroMinutes: z.number().min(1).catch(25),
  shortBreakMinutes: z.number().min(1).catch(5),
  longBreakMinutes: z.number().min(1).catch(15),
  longBreakInterval: z.number().min(2).max(12).catch(4),
  autoStartBreaks: z.boolean().catch(false),
  autoStartPomodoros: z.boolean().catch(false),

  autoCheckTasks: z.boolean().catch(false),
  checkCompletedTasksToBottom: z.boolean().catch(true),

  alarmSound: z.enum(['soft_bell', 'digital_beep', 'none']).catch('soft_bell'),
  alarmVolume: z.number().min(0).max(100).catch(50),
  alarmRepeat: z.number().min(1).max(5).catch(1),

  themeColor: z.string().catch('slate'),
  hourFormat: z.enum(['12h', '24h']).catch('24h'),
  darkModeWhenRunning: z.boolean().catch(false),

  notificationsEnabled: z.boolean().catch(false),
  reminderMinutes: z.number().min(0).catch(0),
});

export type FocusFreqSettings = z.infer<typeof FocusFreqSettingsSchema>;


export const DEFAULT_SETTINGS: FocusFreqSettings = {
  pomodoroMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  autoCheckTasks: false,
  checkCompletedTasksToBottom: true,
  alarmSound: 'soft_bell',
  alarmVolume: 50,
  alarmRepeat: 1,
  themeColor: 'slate',
  hourFormat: '24h',
  darkModeWhenRunning: false,
  notificationsEnabled: false,
  reminderMinutes: 0,
};
