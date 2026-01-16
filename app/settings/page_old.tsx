'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Bell, BellOff, Loader2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StorageManager } from '@/lib/storage';
import { GeolocationManager } from '@/lib/geolocation';
import { NotificationManager } from '@/lib/notifications';
import { Location } from '@/lib/types';

export default function SettingsPage() {
  const [homeLocation, setHomeLocation] = useState<Location | null>(null);
  const [radius, setRadius] = useState(100);
  const [isSettingLocation, setIsSettingLocation] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<'granted' | 'denied' | 'default'>('default');

  useEffect(() => {
    const settings = StorageManager.getSettings();
    setHomeLocation(StorageManager.getHomeLocation());
    setRadius(settings.locationRadius);
    
    if ('Notification' in window) {
      setNotificationStatus(Notification.permission);
    }
  }, []);

  const setCurrentAsHome = async () => {
    setIsSettingLocation(true);
    try {
      const location = await GeolocationManager.getCurrentPosition();
      StorageManager.saveHomeLocation(location);
      setHomeLocation(location);
    } catch {
      alert('Could not get current location. Please enable location services.');
    } finally {
      setIsSettingLocation(false);
    }
  };

  const clearHomeLocation = () => {
    StorageManager.clearHomeLocation();
    setHomeLocation(null);
  };

  const updateRadius = (value: number) => {
    setRadius(value);
    StorageManager.updateSettings({ locationRadius: value });
  };

  const toggleNotifications = async () => {
    if (notificationStatus === 'granted') {
      alert('Please disable notifications in your browser settings');
    } else {
      const granted = await NotificationManager.requestPermission();
      setNotificationStatus(granted ? 'granted' : 'denied');
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header className="pt-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Configure your preferences
        </p>
      </header>

      {/* Notifications */
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {notificationStatus === 'granted' ? (
              <Bell className="w-5 h-5 text-[#34C759] dark:text-[#32D74B]" />
            ) : (
              <BellOff className="w-5 h-5 text-[#8E8E93]" />
            )}
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-950 dark:text-white">
                {notificationStatus === 'granted' ? 'Enabled' : 'Disabled'}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                {notificationStatus === 'granted' 
                  ? 'You will receive reminder notifications'
                  : 'Enable to receive reminders'}
              </p>
            </div>
            {notificationStatus !== 'granted' && (
              <Button onClick={toggleNotifications} size="sm">
                Enable
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Home Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Home Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Set your home location for context-based reminders
          </p>

          {homeLocation ? (
            <div className="p-4 bg-lime/10 dark:bg-lime/5 rounded-xl border border-lime/30 dark:border-lime/20">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-lime font-semibold">
                    <Check className="w-4 h-4" />
                    Home Location Set
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    Lat: {homeLocation.latitude.toFixed(6)}, Lon: {homeLocation.longitude.toFixed(6)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHomeLocation}
                  className="text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  Clear
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={setCurrentAsHome}
              disabled={isSettingLocation}
              className="w-full"
            >
              {isSettingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Getting Location...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  Set Current Location as Home
                </>
              )}
            </Button>
          )}

          <div>
            <Input
              label={`Detection Radius: ${radius}m`}
              type="range"
              min="50"
              max="500"
              step="50"
              value={radius}
              onChange={(e) => updateRadius(parseInt(e.target.value))}
            />
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
              Adjust the radius for home detection accuracy
            </p>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              <strong className="text-neutral-950 dark:text-white">Ping It</strong> - Context-Aware Reminder PWA
            </p>
            <p>Version 1.0.0</p>
            <p className="pt-2">
              A smart reminder app that triggers notifications based on your context and location.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
