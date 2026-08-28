'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showText?: boolean;
}

export function ThemeToggle({ className = '', showText = false }: ThemeToggleProps) {
  const { theme, toggleTheme, isLoaded } = useTheme();

  if (!isLoaded) {
    return (
      <div className={`w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
        isDark
          ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-amber-400 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10'
          : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:border-slate-400 hover:shadow-sm'
      } ${className}`}
      title={isDark ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}
      aria-label={isDark ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
      )}

      {showText && (
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
          {isDark ? 'Açık Tema' : 'Koyu Tema'}
        </span>
      )}
    </button>
  );
}
