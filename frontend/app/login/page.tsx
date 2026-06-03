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
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-[-10%] w-[120%] h-[120%] animate-aurora">
            <Image 
              src="/bg-northern-lights.png" 
              alt="Violet Blue Northern Lights" 
              fill 
              className="object-cover opacity-90 mix-blend-screen"
              priority
            />
          </div>
          {/* Gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0515]/90 via-[#0a0515]/50 to-transparent" />
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

          {/* Right Side: Glass Form */}
          <div className="w-full max-w-[420px] lg:mr-10">
            <div className="ios-liquid-glass p-8 md:p-10 relative overflow-hidden group">
              {/* Ultra-soft specular highlight that moves on hover (simulated liquid sheen) */}
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -rotate-45 pointer-events-none" />
              
              <div className="relative w-full">
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
