'use client';

import React, { useEffect, useState } from 'react';
import { Bell, MapPin, CheckCircle, Clock } from 'lucide-react';
import { useReminders } from '@/contexts/ReminderContext';
import { CreateReminderModal } from '@/components/CreateReminderModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NotificationManager } from '@/lib/notifications';

export default function HomePage() {
  const { activeReminders, currentContexts } = useReminders();
  const [notificationStatus, setNotificationStatus] = useState<'granted' | 'denied' | 'default'>('default');

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
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header className="pt-4 pb-2">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Ping It
        </h1>
        <p className="text-zinc-600 text-base">
          Context-aware reminders for daily tasks
        </p>
      </header>

      {/* Notification Permission Card */}
      {notificationStatus !== 'granted' && (
        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-900">
              <Bell className="w-5 h-5 text-emerald-600" />
              Enable Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 mb-3">
              Allow notifications to get reminded at the right time and place.
            </p>
            <Button onClick={requestNotifications} size="sm">
              Enable Notifications
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Current Context */}
      {currentContexts.length > 0 && (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-600" />
              Current Context
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentContexts.map((context) => (
                <span
                  key={context}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-500/30 capitalize"
                >
                  {context}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="hover:scale-105 transition-transform duration-300">
          <CardContent className="text-center py-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div className="text-3xl font-extrabold text-zinc-900">
              {activeReminders.length}
            </div>
            <div className="text-sm text-zinc-600 font-medium mt-1">
              Active Reminders
            </div>
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-300">
          <CardContent className="text-center py-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-teal-500/30">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div className="text-3xl font-extrabold text-zinc-900">
              {notificationStatus === 'granted' ? 'On' : 'Off'}
            </div>
            <div className="text-sm text-zinc-600 font-medium mt-1">
              Notifications
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Get Started */}
      {activeReminders.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <div className="text-4xl mb-4">📌</div>
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">
              No Active Reminders
            </h3>
            <p className="text-zinc-500 mb-4">
              Create your first context-aware reminder to get started
            </p>
          </CardContent>
        </Card>
      )}

      {/* Create Button */}
      <CreateReminderModal />
    </div>
  );
}

