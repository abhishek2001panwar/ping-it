'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Reminder, ContextType } from '@/lib/types';
import { StorageManager } from '@/lib/storage';
import { ContextDetector } from '@/lib/context';
import { NotificationManager } from '@/lib/notifications';

interface ReminderContextType {
  reminders: Reminder[];
  activeReminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt' | 'isActive'>) => void;
  deleteReminder: (id: string) => void;
  checkReminders: () => Promise<void>;
  currentContexts: ContextType[];
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export function ReminderProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    if (typeof window === 'undefined') return [];
    return StorageManager.getReminders();
  });
  const [currentContexts, setCurrentContexts] = useState<ContextType[]>([]);

  // Check reminders periodically
  const checkReminders = useCallback(async () => {
    try {
      const contexts = await ContextDetector.detectCurrentContext();
      setCurrentContexts(contexts);

      const activeReminders = StorageManager.getActiveReminders();

      for (const reminder of activeReminders) {
        const shouldTrigger = ContextDetector.shouldTriggerReminder(
          reminder.context,
          contexts,
          reminder.timeConstraint?.startTime,
          reminder.timeConstraint?.endTime
        );

        if (shouldTrigger) {
          await NotificationManager.sendNotification(reminder);
          // Refresh reminders after trigger
          setReminders(StorageManager.getReminders());
        }
      }
    } catch (error) {
      console.error('Error checking reminders:', error);
    }
  }, []);

  // Periodic check every 2 minutes
  useEffect(() => {
    // Use setTimeout to avoid cascading render warning
    const timer = setTimeout(() => {
      checkReminders();
    }, 100);
    
    const interval = setInterval(checkReminders, 2 * 60 * 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [checkReminders]);

  const addReminder = (reminder: Omit<Reminder, 'id' | 'createdAt' | 'isActive'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: `reminder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      isActive: true,
    };
    StorageManager.addReminder(newReminder);
    setReminders(StorageManager.getReminders());
  };

  const deleteReminder = (id: string) => {
    StorageManager.deleteReminder(id);
    setReminders(StorageManager.getReminders());
  };

  const activeReminders = reminders.filter(r => r.isActive && !r.triggeredAt);

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        activeReminders,
        addReminder,
        deleteReminder,
        checkReminders,
        currentContexts,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export function useReminders() {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error('useReminders must be used within ReminderProvider');
  }
  return context;
}
