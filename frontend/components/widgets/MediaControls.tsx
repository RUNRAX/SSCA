'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SkipBack, Play, Pause, SkipForward } from 'lucide-react';
import gsap from 'gsap';

export function MediaControls() {
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (progressRef.current) {
      if (isPlaying) {
        // Resume or start progress
        gsap.to(progressRef.current, { width: "100%", duration: 60, ease: "linear" });
      } else {
        // Pause progress
        gsap.killTweensOf(progressRef.current);
      }
    }
  }, [isPlaying]);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    
    if (playBtnRef.current) {
      // Morphing/bounce effect on the button
      gsap.fromTo(playBtnRef.current, 
        { scale: 0.8 }, 
        { scale: 1, duration: 0.5, ease: "elastic.out(1.5, 0.4)" }
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent drop-shadow-md">
        iPhone iOS
      </h1>
      
      <div className="flex items-center gap-8">
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all hover:scale-110 active:scale-95 border border-white/10 shadow-sm">
          <SkipBack className="w-4 h-4 text-white/80" />
        </button>
        
        <button 
          ref={playBtnRef}
          onClick={handlePlayClick}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white fill-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1 fill-white" />
          )}
        </button>
        
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all hover:scale-110 active:scale-95 border border-white/10 shadow-sm">
          <SkipForward className="w-4 h-4 text-white/80" />
        </button>
      </div>

      <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
        <div ref={progressRef} className="w-1/3 h-full bg-white/70 rounded-full" />
      </div>
    </div>
  );
}
