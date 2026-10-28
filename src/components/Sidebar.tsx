import React from 'react';
import { LayoutDashboard, Keyboard, Code2, BookOpen, BarChart3 } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: 'overview' | 'practice' | 'languages' | 'lessons' | 'progress') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const items = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'practice', label: 'Practice', icon: Keyboard },
    { id: 'languages', label: 'Languages', icon: Code2 },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ] as const;

  return (
    <>
      {/* Desktop Compact Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-16 lg:w-56 shrink-0 border-r border-[#1f242d] bg-[#0d1015] py-4 select-none">
        <div className="px-3 lg:px-4 mb-4">
          <span className="hidden lg:block text-[11px] font-semibold uppercase tracking-wider text-[#647082]">
            Navigation
          </span>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer group ${
                  isActive
                    ? 'bg-[#191e26] text-[#b0ff38] border border-[#2d3545]'
                    : 'text-[#8c94a0] hover:text-[#f0f3f6] hover:bg-[#13161c]'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#b0ff38]' : 'text-[#8c94a0] group-hover:text-[#f0f3f6]'}`} />
                <span className="hidden lg:inline whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#1f242d] bg-[#0b0d11]/95 backdrop-blur-md px-2 py-1.5 flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg min-w-[56px] text-[10px] font-medium transition-colors ${
                isActive ? 'text-[#b0ff38]' : 'text-[#8c94a0] hover:text-[#f0f3f6]'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
