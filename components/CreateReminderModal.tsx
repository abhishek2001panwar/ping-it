'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input, TextArea } from './ui/Input';
import { ContextSelector } from './ContextSelector';
import { ContextType } from '@/lib/types';
import { useReminders } from '@/contexts/ReminderContext';

export function CreateReminderModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [context, setContext] = useState<ContextType>('home');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
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
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[88px] right-6 rounded-full w-14 h-14 shadow-2xl hover:shadow-emerald-500/50 z-[110] flex items-center justify-center p-0"
        size="lg"
      >
        <Plus className="w-7 h-7" />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Reminder"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            placeholder="e.g., Bring matchbox"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />

          <TextArea
            label="Description (Optional)"
            placeholder="Add more details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <ContextSelector
            selected={context}
            onChange={setContext}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Time Constraint (Optional)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="time"
                label="Start Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <Input
                type="time"
                label="End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
            >
              Create Reminder
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
