import React from 'react';
import { Terminal, Volume2, VolumeX, Moon, Sun, Play } from 'lucide-react';
import { UserPreferences } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: 'overview' | 'practice' | 'languages' | 'lessons' | 'progress') => void;
  preferences: UserPreferences;
  onToggleSound: () => void;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  preferences,
  onToggleSound,
  onToggleTheme,
}) => {
  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'practice', label: 'Practice' },
    { id: 'languages', label: 'Languages' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'progress', label: 'Progress' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1f242d] bg-[#0b0d11]/90 backdrop-blur-md px-4 sm:px-6 py-3 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-[#191e26] border border-[#2d3545] flex items-center justify-center text-[#b0ff38] transition-transform group-hover:scale-105">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-base tracking-tight text-[#f0f3f6]">CodeType</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#b0ff38] bg-[#b0ff38]/10 px-1.5 py-0.5 rounded border border-[#b0ff38]/20">
              Flow
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#f0f3f6] bg-[#191e26] border border-[#2d3545]'
                    : 'text-[#8c94a0] hover:text-[#f0f3f6] hover:bg-[#13161c]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Sound, Theme, Start CTA) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleSound}
            title={preferences.soundEnabled ? 'Mute keyboard sound effects' : 'Enable keyboard sound effects'}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              preferences.soundEnabled
                ? 'border-[#b0ff38]/40 bg-[#b0ff38]/10 text-[#b0ff38]'
                : 'border-[#1f242d] bg-[#12151b] text-[#8c94a0] hover:text-[#f0f3f6] hover:border-[#2d3545]'
            }`}
            aria-label={preferences.soundEnabled ? 'Mute keyboard sound' : 'Unmute keyboard sound'}
          >
            {preferences.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onToggleTheme}
            title="Toggle theme"
            className="p-2 rounded-lg border border-[#1f242d] bg-[#12151b] text-[#8c94a0] hover:text-[#f0f3f6] hover:border-[#2d3545] transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {preferences.theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onNavigate('practice')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#b0ff38] text-[#0b0d11] hover:bg-[#9ee628] transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(176,255,56,0.3)] whitespace-nowrap shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Practice</span>
          </button>
        </div>
      </div>
    </header>
  );
};
