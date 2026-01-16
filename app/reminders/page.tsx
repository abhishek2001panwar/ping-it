'use client';

import React from 'react';
import { useReminders } from '@/contexts/ReminderContext';
import { ReminderCard } from '@/components/ReminderCard';
import { CreateReminderModal } from '@/components/CreateReminderModal';
import { Bell } from 'lucide-react';

export default function RemindersPage() {
  const { activeReminders, deleteReminder } = useReminders();

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header className="pt-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
          <Bell className="w-8 h-8" />
          My Reminders
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          {activeReminders.length} active reminder{activeReminders.length !== 1 ? 's' : ''}
        </p>
      </header>

      {/* Reminders List */}
      {activeReminders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
            No Active Reminders
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400">
            Create a reminder to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onDelete={deleteReminder}
            />
          ))}
        </div>
      )}

      <CreateReminderModal />
    </div>
  );
}
