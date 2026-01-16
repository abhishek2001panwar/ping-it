import { Reminder, UserSettings, Location } from './types';

const STORAGE_KEYS = {
  REMINDERS: 'ping-it-reminders',
  SETTINGS: 'ping-it-settings',
  HOME_LOCATION: 'ping-it-home-location',
} as const;

export class StorageManager {
  // Reminders
  static getReminders(): Reminder[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    return data ? JSON.parse(data) : [];
  }

  static saveReminders(reminders: Reminder[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  }

  static addReminder(reminder: Reminder): void {
    const reminders = this.getReminders();
    reminders.push(reminder);
    this.saveReminders(reminders);
  }

  static updateReminder(id: string, updates: Partial<Reminder>): void {
    const reminders = this.getReminders();
    const index = reminders.findIndex(r => r.id === id);
    if (index !== -1) {
      reminders[index] = { ...reminders[index], ...updates };
      this.saveReminders(reminders);
    }
  }

  static deleteReminder(id: string): void {
    const reminders = this.getReminders();
    const filtered = reminders.filter(r => r.id !== id);
    this.saveReminders(filtered);
  }

  static getActiveReminders(): Reminder[] {
    return this.getReminders().filter(r => r.isActive && !r.triggeredAt);
  }

  // Settings
  static getSettings(): UserSettings {
    if (typeof window === 'undefined') {
      return {
        locationRadius: 100,
        notificationsEnabled: false,
      };
    }
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      locationRadius: 100,
      notificationsEnabled: false,
    };
  }

  static saveSettings(settings: UserSettings): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  static updateSettings(updates: Partial<UserSettings>): void {
    const settings = this.getSettings();
    this.saveSettings({ ...settings, ...updates });
  }

  // Home Location
  static getHomeLocation(): Location | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.HOME_LOCATION);
    return data ? JSON.parse(data) : null;
  }

  static saveHomeLocation(location: Location): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.HOME_LOCATION, JSON.stringify(location));
  }

  static clearHomeLocation(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.HOME_LOCATION);
  }
}
