'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { useAuthContext } from '@/components/auth/AuthProvider';
import { PageTransition } from '@/components/transitions/PageTransition';

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-white/50">Loading...</div>
    </div>;
  }

  return (
    <PageTransition>
      <main className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      
      {/* Decorative floating widgets in the background */}
      <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none animate-pulse duration-[5000ms]" />
      <div className="absolute bottom-[10%] right-[15%] w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[7000ms]" />
      <div className="absolute top-[40%] right-[30%] w-40 h-40 bg-[var(--color-accent-teal)]/20 rounded-full blur-[60px] pointer-events-none animate-pulse duration-[6000ms]" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdGllcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI0MDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 pointer-events-none mix-blend-overlay" />

      <div className="w-full max-w-sm z-10 relative">
        
        {/* iOS-style dynamic island / top pill hint */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/80 rounded-full flex items-center justify-center gap-2 border border-white/10 shadow-2xl backdrop-blur-md z-20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest whitespace-nowrap">SSCA Secured</span>
        </div>

        <GlassPanel intensity="heavy" className="p-8 pb-10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.7)] border-white/20 relative" bobAnimation>
          
          <div className="text-center mb-10">
            {/* iOS Face ID / App Icon replacement */}
            <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-[var(--color-accent-teal)] to-[var(--color-accent-purple)] rounded-[22px] flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 border border-white/30 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-white drop-shadow-md z-10 transform group-hover:scale-110 transition-transform duration-500">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
              </svg>
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight mb-3 bg-gradient-to-br from-white via-white/90 to-white/60 bg-clip-text text-transparent drop-shadow-sm">
              Welcome
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] font-medium px-2 leading-relaxed">
              Sign in with your Apple ID or SSCA credentials to continue.
            </p>
          </div>

          {/* Premium Segmented Control */}
          <div className="relative flex rounded-xl bg-black/30 p-1.5 mb-8 border border-white/10 backdrop-blur-xl shadow-inner">
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white/15 border border-white/10 rounded-lg shadow-md transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
                !isLoginMode ? 'left-[calc(50%+1.5px)]' : 'left-1.5'
              }`}
            />
            <button
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold z-10 transition-colors duration-300 ${
                isLoginMode ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
              onClick={() => setIsLoginMode(true)}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold z-10 transition-colors duration-300 ${
                !isLoginMode ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
              onClick={() => setIsLoginMode(false)}
            >
              Sign Up
            </button>
          </div>

          <div className="relative w-full">
            <div 
              className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
                isLoginMode ? 'opacity-100 translate-x-0 relative' : 'opacity-0 -translate-x-12 absolute top-0 left-0 right-0 pointer-events-none'
              }`}
            >
              <LoginForm />
            </div>
            <div 
              className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
                !isLoginMode ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-12 absolute top-0 left-0 right-0 pointer-events-none'
              }`}
            >
              <SignupForm />
            </div>
          </div>
          
        </GlassPanel>
      </div>
    </main>
    </PageTransition>
  );
}
