'use client';

import React from 'react';
import { useReminders } from '@/contexts/ReminderContext';
import { ReminderCard } from '@/components/ReminderCard';
import { Bell, Plus } from 'lucide-react';
import { ContextSelector } from '@/components/ContextSelector';

export default function RemindersPage() {
  const { activeReminders, deleteReminder } = useReminders();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header with Add Button */}
      <header className="pt-4 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center gap-2">
            <Bell className="w-8 h-8" />
            My Reminders
          </h1>
          <p className="text-zinc-500">
            {activeReminders.length} active reminder{activeReminders.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl hover:shadow-emerald-500/40 active:scale-95 transition-all duration-300 flex items-center justify-center"
        >
          <Plus className="w-6 h-6" />
        </button>
      </header>

      {/* Reminders List */}
      {activeReminders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-zinc-900 mb-2">
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

      {/* Modal */}
      {isModalOpen && (
        <CreateReminderModalContent 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

// Modal Content Component
function CreateReminderModalContent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [context, setContext] = React.useState<any>('home');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const { addReminder } = useReminders();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    addReminder({
      title: title.trim(),
      description: description.trim() || undefined,
      context,
      timeConstraint: startTime || endTime ? {
        startTime: startTime || undefined,
        endTime: endTime || undefined,
      } : undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setContext('home');
    setStartTime('');
    setEndTime('');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 animate-fadeIn" style={{ zIndex: 150 }}>
      <div 
        className="absolute inset-0 bg-black/70" 
        style={{ backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      />
      
      <div 
        className="relative bg-white/90 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slideUp"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-200/50">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Create Reminder
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100/80 rounded-full transition-all duration-200 active:scale-95"
          >
            <span className="text-xl text-neutral-700">✕</span>
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
              <input
                placeholder="e.g., Bring matchbox"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Description (Optional)</label>
              <textarea
                placeholder="Add more details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Context</label>
              <ContextSelector selected={context} onChange={setContext} />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Time Constraint (Optional)</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold transition-all duration-200 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-200 active:scale-95"
              >
                Create Reminder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
