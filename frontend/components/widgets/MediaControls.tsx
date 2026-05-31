'use client';

import React, { useRef } from 'react';
import { SkipBack, Play, SkipForward } from 'lucide-react';
import gsap from 'gsap';

export function MediaControls() {
  const playBtnRef = useRef<HTMLButtonElement>(null);

  const handlePlayClick = () => {
    if (playBtnRef.current) {
      gsap.fromTo(playBtnRef.current, 
        { scale: 0.8 }, 
        { scale: 1, duration: 0.5, ease: "elastic.out(1.5, 0.4)" }
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
        iPhone iOS
      </h1>
      
      <div className="flex items-center gap-8">
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors border border-white/10">
          <SkipBack className="w-4 h-4 text-white/80" />
        </button>
        
        <button 
          ref={playBtnRef}
          onClick={handlePlayClick}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/20 shadow-lg"
        >
          <Play className="w-6 h-6 text-white ml-1 fill-white" />
        </button>
        
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors border border-white/10">
          <SkipForward className="w-4 h-4 text-white/80" />
        </button>
      </div>

      <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div className="w-1/3 h-full bg-white/50 rounded-full" />
      </div>
    </div>
  );
}
