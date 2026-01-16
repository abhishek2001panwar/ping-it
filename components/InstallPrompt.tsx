'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Check if user has dismissed before
      const dismissed = localStorage.getItem('install-prompt-dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installed');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('install-prompt-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-slideDown">
      <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 max-w-lg mx-auto">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 text-neutral-950">Install Ping It</h3>
            <p className="text-sm text-neutral-600">
              Install our app for quick access and better experience!
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-neutral-900" />
          </button>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleDismiss}
            variant="secondary"
            className="flex-1"
          >
            Not Now
          </Button>
          <Button
            onClick={handleInstall}
            variant="primary"
            className="flex-1"
          >
            Install
          </Button>
        </div>
      </div>
    </div>
  );
}
