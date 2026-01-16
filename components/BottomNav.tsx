'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, Bell } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/reminders', icon: Bell, label: 'Reminders' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-zinc-300" 
      style={{ zIndex: 100, boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.15)' }}
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
                    ? 'text-emerald-600 scale-110 bg-emerald-50'
                    : 'text-zinc-500 hover:text-emerald-600 hover:scale-105 hover:bg-zinc-50'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
