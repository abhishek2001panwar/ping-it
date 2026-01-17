/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useState } from 'react';
import { Bell, MapPin, CheckCircle, Clock } from 'lucide-react';
import { useReminders } from '@/contexts/ReminderContext';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import { FeatureCarousel } from '@/components/FeatureCarousel';
import { ContextSelector } from '@/components/ContextSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NotificationManager } from '@/lib/notifications';

export default function HomePage() {
  const { activeReminders, currentContexts } = useReminders();
  const [notificationStatus, setNotificationStatus] = useState<'granted' | 'denied' | 'default'>('default');
  const { mainGradient, bgGradient, borderColor, setThemeColors } = useColorTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleColorChange = (bg: string, main: string) => {
    setThemeColors(main, bg);
  };

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationStatus(Notification.permission);
    }
  }, []);

  const requestNotifications = async () => {
    const granted = await NotificationManager.requestPermission();
    setNotificationStatus(granted ? 'granted' : 'denied');
  };

  return (
    <div className={`min-h-screen p-4 pb-32 space-y-6 bg-gradient-to-br ${bgGradient} transition-all duration-700`}>
      {/* Hero Header */}
      <header className="pt-6 pb-4 text-center">
        <div className="inline-block mb-3 px-4 py-1.5 bg-white/80 border-2 border-zinc-300 rounded-full transition-all duration-700" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          <span className={`text-xs font-semibold bg-gradient-to-r ${mainGradient} bg-clip-text text-transparent uppercase tracking-wide`}>Smart Reminders</span>
        </div>
        <h1 className={`text-5xl font-black bg-gradient-to-r ${mainGradient} bg-clip-text text-transparent mb-3 leading-tight transition-all duration-700`}>
          Ping It
        </h1>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          Never forget what matters. Get reminded at the right time and place.
        </p>
      </header>

      {/* Current Context - Minimal Badge Style */}
      {currentContexts.length > 0 && (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="px-4 py-2 bg-white/80 rounded-2xl border-2 border-zinc-300 shadow-sm transition-all duration-700" style={{ 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}>
            <span className={`text-sm font-bold bg-gradient-to-r ${mainGradient} bg-clip-text text-transparent transition-all duration-700`}>You're at:</span>
          </div>
          {currentContexts.map((context) => (
            <div
              key={context}
              className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border-2 shadow-md transition-all duration-700 hover:bg-white/70 hover:shadow-lg"
              style={{
                borderColor: borderColor,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            >
              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${mainGradient} transition-all duration-700`}></span>
              <span className={`text-sm font-semibold bg-gradient-to-r ${mainGradient} bg-clip-text text-transparent capitalize transition-all duration-700`}>{context}</span>
            </div>
          ))}
        </div>
      )}

      {/* Notification Permission - Inline Banner */}
      {notificationStatus !== 'granted' && (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${mainGradient} p-5 shadow-xl transition-all duration-700`} style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Enable Notifications</p>
                <p className="text-white/80 text-xs">Get reminded at the right moment</p>
              </div>
            </div>
            <button
              onClick={requestNotifications}
              className={`px-4 py-2 bg-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap`}
            >
              <span className={`bg-gradient-to-r ${mainGradient} bg-clip-text text-transparent`}>Enable</span>
            </button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      )}

      {/* Stats Overview - Compact Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-zinc-50 p-4 border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 bg-gradient-to-br ${mainGradient} rounded-xl flex items-center justify-center shadow-lg transition-all duration-700`}>
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-black text-zinc-900">
                {activeReminders.length}
              </div>
              <div className="text-xs text-zinc-500 font-medium">
                Active
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-zinc-50 p-4 border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-all duration-700 ${
              notificationStatus === 'granted'
                ? `bg-gradient-to-br ${mainGradient}`
                : 'bg-gradient-to-br from-zinc-300 to-zinc-400'
            }`}>
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-black text-zinc-900">
                {notificationStatus === 'granted' ? 'On' : 'Off'}
              </div>
              <div className="text-xs text-zinc-500 font-medium">
                Alerts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State - Modern Illustration Style */}
      {activeReminders.length === 0 && (
        <>
          <FeatureCarousel onColorChange={handleColorChange} onCreateClick={() => setIsModalOpen(true)} />
          {isModalOpen && (
            <CreateReminderModalContent 
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

// Modal Content Component
function CreateReminderModalContent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [context, setContext] = React.useState<string>('home');
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