import { Reminder } from './types';
import { StorageManager } from './storage';

export class NotificationManager {
  static async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Notifications not supported');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  static async sendNotification(reminder: Reminder): Promise<void> {
    if (!('Notification' in window)) return;

    if (Notification.permission !== 'granted') {
      const granted = await this.requestPermission();
      if (!granted) return;
    }

    const notification = new Notification(reminder.title, {
      body: reminder.description || 'Reminder triggered!',
      icon: '/icon-192.svg',
      badge: '/icon-192.svg',
      tag: reminder.id,
      requireInteraction: true,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
      this.markAsTriggered(reminder.id);
    };

    // Auto-mark as triggered after 30 seconds
    setTimeout(() => {
      this.markAsTriggered(reminder.id);
    }, 30000);
  }

  static markAsTriggered(reminderId: string): void {
    StorageManager.updateReminder(reminderId, {
      triggeredAt: Date.now(),
      isActive: false,
    });
  }

  static isEnabled(): boolean {
    return typeof window !== 'undefined' && 
           'Notification' in window && 
           Notification.permission === 'granted';
  }
}
