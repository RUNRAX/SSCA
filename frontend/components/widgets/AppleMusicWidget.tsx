'use client';

import React, { useRef } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Play } from 'lucide-react';
import gsap from 'gsap';

export function AppleMusicWidget() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handlePress = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 0.85, duration: 0.1, ease: "power2.in" });
    }
  };

  const handleRelease = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
    }
  };

  return (
    <GlassPanel bobAnimation intensity="light" className="p-5 flex flex-col justify-between w-[220px] h-[220px]">
      <div className="flex justify-between items-start">
        {/* Placeholder for Artist Profile Image */}
        <div className="w-16 h-16 rounded-[18px] bg-gradient-to-br from-red-400 to-purple-500 shadow-inner" />
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
            <path d="M15 4h5v12a3 3 0 11-2-2.83V6h-3v10a3 3 0 11-2-2.83V4z" />
          </svg>
        </div>
      </div>
      
      <div className="mt-auto mb-4">
        <h3 className="text-xl font-bold text-white tracking-tight leading-tight">Today's Hits</h3>
        <p className="text-sm text-white/60 font-medium">Apple music hits</p>
      </div>
      
      <button 
        ref={buttonRef}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        className="w-full bg-white/20 hover:bg-white/30 transition-colors py-2.5 rounded-full flex items-center justify-center gap-2 backdrop-blur-md"
      >
        <Play className="w-4 h-4 fill-white" />
        <span className="font-semibold text-sm tracking-wide">Play</span>
      </button>
    </GlassPanel>
  );
}
