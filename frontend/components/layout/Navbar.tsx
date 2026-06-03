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
      {/* Background mask to prevent elements from crossing above the navbar in the gap */}
      <div 
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'linear-gradient(to bottom, var(--color-bg-base) 0%, rgba(15, 20, 35, 0.4) 65%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
        }}
      />
      <nav
        className="glass-panel glass-glow mx-auto max-w-7xl h-14 flex items-center justify-between px-5 md:px-6 pointer-events-auto relative"
        style={{
          borderRadius: '18px',
          background: 'rgba(15, 20, 35, 0.05)', // 5% opacity dark tint
          backdropFilter: 'blur(12px)', // Reduced blur
          WebkitBackdropFilter: 'blur(12px)',
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
