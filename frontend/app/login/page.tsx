'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { useAuthContext } from '@/components/auth/AuthProvider';
import { PageTransition } from '@/components/transitions/PageTransition';
import Image from 'next/image';

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
    return <div className="min-h-screen flex items-center justify-center bg-[#0a0515]">
      <div className="animate-pulse text-white/50">Loading...</div>
    </div>;
  }

  return (
    <PageTransition>
      <main className="min-h-screen w-full relative flex items-center justify-center bg-[#0a0515] overflow-hidden">
        
        {/* Pure CSS Dynamic Aurora Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#07040f]">
          {/* Base ambient gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#07040f] via-purple-900/10 to-cyan-900/10" />
          
          {/* Moving Aurora Lights */}
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-purple-600/30 blur-[120px] mix-blend-screen animate-[auroraMove_20s_ease-in-out_infinite_alternate]" />
          <div className="absolute top-[10%] right-[-10%] w-[60%] h-[80%] rounded-full bg-cyan-400/20 blur-[130px] mix-blend-screen animate-[auroraMove_28s_ease-in-out_infinite_alternate-reverse]" />
          <div className="absolute bottom-[-20%] left-[20%] w-[80%] h-[60%] rounded-full bg-blue-500/20 blur-[140px] mix-blend-screen animate-[auroraMove_24s_ease-in-out_infinite_alternate]" />
          
          {/* Gradient overlay for readability and depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07040f] via-transparent to-[#07040f]/40 opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07040f]/90 via-[#07040f]/50 to-transparent" />
        </div>

        <div className="z-10 w-full max-w-6xl px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 pt-10 pb-10">
          
          {/* Left Side: Typography */}
          <div className="flex-1 flex flex-col items-start text-white max-w-xl pt-10">
            <h1 className="text-5xl md:text-[5rem] font-light tracking-tight mb-4 leading-[1.1]">
              Whatever happens <br/>
              here, <span className="font-bold">stays</span> here
            </h1>
            <p className="text-white/80 text-sm md:text-base mt-2 font-medium tracking-wide">
              Please fill the form on the right side.
            </p>
            
            {/* Camera Icon */}
            <div className="mt-20 w-24 h-24 rounded-full bg-[#140203] flex items-center justify-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </div>
          </div>

          {/* Right Side: Ultimate Liquid Glass Form */}
          <div className="w-full max-w-[420px] lg:mr-10 relative group">
            {/* Liquid Glass Background Layer (Separated so animations/filters don't distort text) */}
            <div className="absolute inset-0 rounded-[40px] bg-white/[0.03] backdrop-blur-[80px] shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden z-0">
              {/* Vibrant specular highlight on borders */}
              <div className="absolute inset-0 rounded-[40px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.2)] pointer-events-none" />
              
              {/* Flowing internal liquid sheen (animated) */}
              <div className="absolute inset-[-50%] animate-[liquidSpin_15s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,255,255,0.08)_25%,transparent_50%,rgba(255,255,255,0.08)_75%,transparent_100%)] blur-[20px] mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Subtle frosted texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none mix-blend-overlay" />
            </div>
            
            {/* Form Content */}
            <div className="relative p-8 md:p-10 z-10">
                <div 
                  className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
                    isLoginMode ? 'opacity-100 translate-x-0 relative' : 'opacity-0 -translate-x-12 absolute top-0 left-0 right-0 pointer-events-none'
                  }`}
                >
                  <LoginForm onToggleMode={() => setIsLoginMode(false)} />
                </div>
                <div 
                  className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
                    !isLoginMode ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-12 absolute top-0 left-0 right-0 pointer-events-none'
                  }`}
                >
                  <SignupForm onToggleMode={() => setIsLoginMode(true)} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </PageTransition>
  );
}
