'use client';

import React, { useEffect, useState } from 'react';
import { Home, MapPin, Moon, Sun, Sunset } from 'lucide-react';
import { ContextType, CustomLocation } from '@/lib/types';
import { StorageManager } from '@/lib/storage';

interface ContextSelectorProps {
  selected: ContextType;
  onChange: (context: ContextType) => void;
}

const defaultContexts: { value: ContextType; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: 'home',
    label: 'Home',
    icon: <Home className="w-6 h-6" />,
    description: 'When at home location',
  },
  {
    value: 'outside',
    label: 'Outside',
    icon: <MapPin className="w-6 h-6" />,
    description: 'When away from home',
  },
  {
    value: 'morning',
    label: 'Morning',
    icon: <Sun className="w-6 h-6" />,
    description: '5 AM - 12 PM',
  },
  {
    value: 'evening',
    label: 'Evening',
    icon: <Sunset className="w-6 h-6" />,
    description: '5 PM - 10 PM',
  },
  {
    value: 'night',
    label: 'Night',
    icon: <Moon className="w-6 h-6" />,
    description: '9 PM - 6 AM',
  },
];

export function ContextSelector({ selected, onChange }: ContextSelectorProps) {
  const [customLocations, setCustomLocations] = useState<CustomLocation[]>([]);

  useEffect(() => {
    const settings = StorageManager.getSettings();
    setCustomLocations(settings.customLocations || []);
  }, []);

  const allContexts = [
    ...defaultContexts,
    ...customLocations.map(loc => ({
      value: loc.id,
      label: loc.name,
      icon: <span className="text-2xl">{loc.icon || '📍'}</span>,
      description: 'Custom location',
    }))
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900 mb-3">
        Select Context
      </label>
      <div className="grid grid-cols-2 gap-3">
        {allContexts.map((context) => {
          const isSelected = selected === context.value;
          const customLoc = customLocations.find(loc => loc.id === context.value);
          
          return (
            <button
              key={context.value}
              type="button"
              onClick={() => onChange(context.value)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-500/10'
                  : 'border-zinc-200 hover:border-emerald-300 hover:bg-zinc-50 hover:shadow-sm'
              }`}
              style={customLoc && isSelected ? { 
                borderColor: customLoc.color,
                backgroundColor: `${customLoc.color}15`
              } : undefined}
            >
              <div className={`${
                isSelected 
                  ? customLoc ? '' : 'text-emerald-600'
                  : 'text-zinc-500'
              }`}
                style={customLoc && isSelected ? { color: customLoc.color } : undefined}
              >
                {context.icon}
              </div>
              <div className="mt-2 text-left">
                <div className={`font-bold ${
                  isSelected 
                    ? 'text-emerald-900' 
                    : 'text-zinc-900'
                }`}>
                  {context.label}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {context.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
