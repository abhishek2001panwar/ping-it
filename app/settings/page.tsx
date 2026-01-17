'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Bell, BellOff, Loader2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CustomLocationManager } from '@/components/CustomLocationManager';
import { StorageManager } from '@/lib/storage';
import { GeolocationManager } from '@/lib/geolocation';
import { NotificationManager } from '@/lib/notifications';
import { Location, CustomLocation } from '@/lib/types';

export default function SettingsPage() {
  const [homeLocation, setHomeLocation] = useState<Location | null>(null);
  const [customLocations, setCustomLocations] = useState<CustomLocation[]>([]);
  const [radius, setRadius] = useState(100);
  const [isSettingLocation, setIsSettingLocation] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<'granted' | 'denied' | 'default'>('default');

  const loadSettings = () => {
    const settings = StorageManager.getSettings();
    setHomeLocation(StorageManager.getHomeLocation());
    setCustomLocations(settings.customLocations || []);
    setRadius(settings.locationRadius);
    
    if ('Notification' in window) {
      setNotificationStatus(Notification.permission);
    }
  };

  useEffect(() => {
    loadSettings();
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
      <header className="pt-4">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Settings</h1>
        <p className="text-zinc-500">Configure your preferences</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {notificationStatus === 'granted' ? (
              <Bell className="w-5 h-5 text-[#34C759]" />
            ) : (
              <BellOff className="w-5 h-5 text-[#8E8E93]" />
            )}
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-950">
                {notificationStatus === 'granted' ? 'Enabled' : 'Disabled'}
              </p>
              <p className="text-xs text-neutral-600 mt-1">
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Home Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-neutral-600">
            Set your home location for context-based reminders
          </p>

          {homeLocation ? (
            <div className="p-4 bg-lime/10 rounded-xl border border-lime/30">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-lime font-semibold">
                    <Check className="w-4 h-4" />
                    Home Location Set
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Lat: {homeLocation.latitude.toFixed(6)}, Lon: {homeLocation.longitude.toFixed(6)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHomeLocation}
                  className="text-red-600 hover:bg-red-50"
                >
                  Clear
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
              <p className="text-sm text-neutral-600 mb-3">
                No home location set
              </p>
              <Button
                onClick={setCurrentAsHome}
                disabled={isSettingLocation}
                size="sm"
                className="w-full"
              >
                {isSettingLocation ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Getting Location...
                  </>
                ) : (
                  'Set Current Location as Home'
                )}
              </Button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Location Radius: {radius}m
            </label>
            <Input
              type="range"
              min="50"
              max="500"
              step="50"
              value={radius}
              onChange={(e) => updateRadius(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Reminders will trigger when you're within this distance from any location
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Custom Locations */}
      <CustomLocationManager 
        locations={customLocations}
        onUpdate={loadSettings}
      />

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-neutral-600">
            <p>
              <strong className="text-neutral-950">Ping It</strong> - Context-Aware Reminder PWA
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
