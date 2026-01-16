'use client';

import React from 'react';
import { Home, MapPin, Moon, Sun, Sunset } from 'lucide-react';
import { ContextType } from '@/lib/types';

interface ContextSelectorProps {
  selected: ContextType;
  onChange: (context: ContextType) => void;
}

const contexts: { value: ContextType; label: string; icon: React.ReactNode; description: string }[] = [
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
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
        Select Context
      </label>
      <div className="grid grid-cols-2 gap-3">
        {contexts.map((context) => {
          const isSelected = selected === context.value;
          
          return (
            <button
              key={context.value}
              type="button"
              onClick={() => onChange(context.value)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-600 dark:from-emerald-950/30 dark:to-teal-950/30 shadow-md shadow-emerald-500/10'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:shadow-sm'
              }`}
            >
              <div className={`${
                isSelected 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}>
                {context.icon}
              </div>
              <div className="mt-2 text-left">
                <div className={`font-bold ${
                  isSelected 
                    ? 'text-emerald-900 dark:text-emerald-100' 
                    : 'text-zinc-900 dark:text-white'
                }`}>
                  {context.label}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
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
