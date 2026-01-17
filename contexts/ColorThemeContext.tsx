'use client';

import React, { createContext, useContext, useState } from 'react';

interface ColorThemeContextType {
  mainGradient: string;
  bgGradient: string;
  borderColor: string;
  setThemeColors: (main: string, bg: string) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [mainGradient, setMainGradient] = useState('from-emerald-400 to-teal-500');
  const [bgGradient, setBgGradient] = useState('from-emerald-50 to-teal-50');

  const getBorderColor = (gradient: string) => {
    const colorMap: Record<string, string> = {
      'from-emerald-400 to-teal-500': '#34d399',
      'from-blue-400 to-cyan-500': '#60a5fa',
      'from-purple-400 to-pink-500': '#c084fc',
      'from-orange-400 to-red-500': '#fb923c'
    };
    return colorMap[gradient] || '#34d399';
  };

  const setThemeColors = (main: string, bg: string) => {
    setMainGradient(main);
    setBgGradient(bg);
  };

  return (
    <ColorThemeContext.Provider 
      value={{ 
        mainGradient, 
        bgGradient, 
        borderColor: getBorderColor(mainGradient),
        setThemeColors 
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within ColorThemeProvider');
  }
  return context;
}
