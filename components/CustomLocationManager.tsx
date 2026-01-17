'use client';

import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Edit2, Loader2 } from 'lucide-react';
import { CustomLocation } from '@/lib/types';
import { StorageManager } from '@/lib/storage';
import { GeolocationManager } from '@/lib/geolocation';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

interface CustomLocationManagerProps {
  locations: CustomLocation[];
  onUpdate: () => void;
}

const LOCATION_COLORS = [
  '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'
];

const LOCATION_ICONS = ['🏢', '🏋️', '🏪', '☕', '🏫', '🏥', '🍽️', '🎬', '📚'];

export function CustomLocationManager({ locations, onUpdate }: CustomLocationManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSettingLocation, setIsSettingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: '',
    icon: '📍',
    color: LOCATION_COLORS[0],
  });

  const handleAddLocation = async () => {
    if (!newLocation.name.trim()) return;

    setIsSettingLocation(true);
    try {
      const location = await GeolocationManager.getCurrentPosition();
      StorageManager.addCustomLocation({
        name: newLocation.name.trim(),
        location,
        icon: newLocation.icon,
        color: newLocation.color,
      });
      
      setNewLocation({ name: '', icon: '📍', color: LOCATION_COLORS[0] });
      setIsAdding(false);
      onUpdate();
    } catch (error) {
      alert('Could not get current location. Please enable location services.');
    } finally {
      setIsSettingLocation(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this location?')) {
      StorageManager.deleteCustomLocation(id);
      onUpdate();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            Custom Locations
          </CardTitle>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="p-2 hover:bg-emerald-50 rounded-full transition-colors"
          >
            <Plus className="w-5 h-5 text-emerald-600" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-zinc-600">
          Add custom locations like gym, office, or favorite cafe for location-based reminders
        </p>

        {/* Add New Location Form */}
        {isAdding && (
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
            <input
              type="text"
              placeholder="Location name (e.g., Gym, Office)"
              value={newLocation.name}
              onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Select Icon</label>
              <div className="flex flex-wrap gap-2">
                {LOCATION_ICONS.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setNewLocation({ ...newLocation, icon })}
                    className={`w-10 h-10 text-xl rounded-lg transition-all ${
                      newLocation.icon === icon
                        ? 'bg-emerald-500 scale-110'
                        : 'bg-white hover:bg-emerald-100'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Select Color</label>
              <div className="flex gap-2">
                {LOCATION_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewLocation({ ...newLocation, color })}
                    className={`w-8 h-8 rounded-full transition-all ${
                      newLocation.color === color ? 'ring-2 ring-offset-2 ring-zinc-900 scale-110' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-700 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLocation}
                disabled={isSettingLocation || !newLocation.name.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSettingLocation ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    Getting Location...
                  </>
                ) : (
                  'Add Location'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Existing Locations */}
        <div className="space-y-2">
          {locations.length === 0 && !isAdding && (
            <p className="text-sm text-zinc-500 text-center py-4">
              No custom locations added yet. Click + to add one.
            </p>
          )}
          
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${loc.color}20` }}
                >
                  {loc.icon || '📍'}
                </div>
                <div>
                  <p className="font-semibold text-zinc-900">{loc.name}</p>
                  <p className="text-xs text-zinc-500">
                    {loc.location.latitude.toFixed(4)}, {loc.location.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(loc.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
