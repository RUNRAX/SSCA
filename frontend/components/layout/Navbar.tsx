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
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/5 backdrop-blur-2xl border-b border-white/10"
      style={{
        boxShadow: '0 1px 20px rgba(100, 150, 255, 0.08)',
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-8">
        {/* ── Left: Logo + Brand ── */}
        <div className="flex items-center gap-3">
          {/* Gradient circle logo */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/20">
            <span
              className="text-xs font-bold tracking-wide text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AI
            </span>
          </div>

          <span
            className="text-base font-semibold text-white/90 tracking-tight hidden sm:inline-block"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            SSCA Cognitive Engine
          </span>
        </div>

        {/* ── Right: User + Logout ── */}
        <div className="flex items-center gap-4">
          {/* User avatar */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-xs font-bold text-white shadow-md shadow-purple-500/15">
              {initials}
            </div>
            <span className="text-sm text-white/70 hidden md:inline-block">
              {userId}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-200"
            aria-label="Log out"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm hidden md:inline-block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
