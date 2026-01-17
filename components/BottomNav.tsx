'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, Bell } from 'lucide-react';
import { useColorTheme } from '@/contexts/ColorThemeContext';

export function BottomNav() {
  const pathname = usePathname();
  const { mainGradient, borderColor } = useColorTheme();

  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/reminders', icon: Bell, label: 'Reminders' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav 
      className="fixed bottom-4 left-4 right-4 bg-white/70 border border-white/20 rounded-2xl" 
      style={{ 
        zIndex: 100, 
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
      }}
    >
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl transition-all duration-300 active:scale-95 ${
                  isActive
                    ? 'scale-110'
                    : 'text-zinc-500 hover:scale-105 hover:bg-zinc-50'
                }`}
                style={isActive ? {
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  '--tw-gradient-from': borderColor,
                  '--tw-gradient-to': borderColor,
                  '--tw-gradient-stops': `var(--tw-gradient-from), var(--tw-gradient-to)`,
                } as React.CSSProperties : {}}
              >
                <Icon className="w-6 h-6" style={isActive ? { stroke: borderColor } : {}} />
                <span className="text-xs font-medium" style={isActive ? { color: borderColor } : {}}>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
