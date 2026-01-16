'use client';

import React from 'react';
import { Trash2, Clock, Home, MapPin, Moon, Sun, Sunset } from 'lucide-react';
import { Reminder, ContextType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

interface ReminderCardProps {
  reminder: Reminder;
  onDelete: (id: string) => void;
}

const contextIcons: Record<ContextType, React.ReactNode> = {
  home: <Home className="w-4 h-4" />,
  outside: <MapPin className="w-4 h-4" />,
  morning: <Sun className="w-4 h-4" />,
  evening: <Sunset className="w-4 h-4" />,
  night: <Moon className="w-4 h-4" />,
};

const contextLabels: Record<ContextType, string> = {
  home: 'Home',
  outside: 'Outside',
  morning: 'Morning',
  evening: 'Evening',
  night: 'Night',
};

export function ReminderCard({ reminder, onDelete }: ReminderCardProps) {
  const formatTime = (time?: string) => {
    if (!time) return null;
    return time;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{reminder.title}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(reminder.id)}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {reminder.description && (
          <p className="text-sm text-zinc-600 mb-3">
            {reminder.description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2">
          {/* Context Badge */}
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-500/30">
            {contextIcons[reminder.context]}
            {contextLabels[reminder.context]}
          </span>
          
          {/* Time Constraint Badge */}
          {(reminder.timeConstraint?.startTime || reminder.timeConstraint?.endTime) && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-200 text-zinc-900 rounded-full text-sm font-semibold shadow-sm">
              <Clock className="w-4 h-4" />
              {formatTime(reminder.timeConstraint?.startTime)}
              {reminder.timeConstraint?.startTime && reminder.timeConstraint?.endTime && ' - '}
              {formatTime(reminder.timeConstraint?.endTime)}
            </span>
          )}
        </div>
        
        {/* Created Date */}
        <p className="text-xs text-gray-500 mt-3">
          Created {new Date(reminder.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
