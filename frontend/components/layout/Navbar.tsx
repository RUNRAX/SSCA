'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuthContext } from '@/components/auth/AuthProvider';

/* ─── Helpers ─── */
function getInitials(userId: string | null): string {
  if (!userId) return '?';
  return userId
    .split(/[\s._@-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join('');
}

/* ─── Component ─── */
export function Navbar() {
  const { userId, logout } = useAuthContext();
  const initials = getInitials(userId);

  return (
    <div className="fixed top-0 left-0 right-0 z-[999] px-4 md:px-6 pt-3 pointer-events-none">
      {/* Progressive Flowing Blur Background */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none select-none z-[-1] flex justify-center">
        <div className="w-full max-w-7xl relative h-full">
          {/* Layer 1 */}
          <div 
            className="absolute inset-0" 
            style={{ 
              backdropFilter: 'blur(1px)', 
              WebkitBackdropFilter: 'blur(1px)', 
              maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)', 
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
            }} 
          />
          
          {/* Layer 2 */}
          <div 
            className="absolute inset-0" 
            style={{ 
              backdropFilter: 'blur(2px)', 
              WebkitBackdropFilter: 'blur(2px)', 
              maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 90%)', 
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 90%)'
            }} 
          />
          
          {/* Layer 3 */}
          <div 
            className="absolute inset-0" 
            style={{ 
              backdropFilter: 'blur(4px) saturate(110%)', 
              WebkitBackdropFilter: 'blur(4px) saturate(110%)', 
              maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 85%)', 
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 85%)'
            }} 
          />
          
          {/* Layer 4 */}
          <div 
            className="absolute inset-0" 
            style={{ 
              backdropFilter: 'blur(5px) saturate(120%)', 
              WebkitBackdropFilter: 'blur(5px) saturate(120%)', 
              maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 80%)', 
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 80%)'
            }} 
          />
          
          {/* Ambient tint overlay to match the glass panel */}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'linear-gradient(to bottom, var(--color-bg-base) 0%, rgba(15, 20, 35, 0.4) 70%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
            }} 
          />
        </div>
      </div>
      <nav
        className="ios-liquid-glass mx-auto max-w-7xl h-14 flex items-center justify-between px-5 md:px-6 pointer-events-auto relative"
        style={{
          borderRadius: '18px',
          background: 'rgba(15, 20, 35, 0.05)', // 5% opacity dark tint over the glass
          backdropFilter: 'blur(5px) saturate(120%)',
          WebkitBackdropFilter: 'blur(5px) saturate(120%)',
        }}
      >
        {/* ── Left: Logo + Brand ── */}
        <div className="flex items-center gap-3">
          {/* Gradient circle logo */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/20">
            <span
              className="text-[10px] font-bold tracking-wide text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AI
            </span>
          </div>

          <span
            className="text-sm font-semibold text-white/90 tracking-tight hidden sm:inline-block"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            SSCA Cognitive Engine
          </span>
        </div>

        {/* ── Right: User + Logout ── */}
        <div className="flex items-center gap-3">
          {/* User avatar */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-[10px] font-bold text-white shadow-md shadow-purple-500/15">
              {initials}
            </div>
            <span className="text-xs text-white/60 hidden md:inline-block max-w-[150px] truncate">
              {userId}
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10" />

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors duration-200"
            aria-label="Log out"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs hidden md:inline-block">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
