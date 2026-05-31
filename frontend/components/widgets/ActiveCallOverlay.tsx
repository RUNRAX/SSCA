'use client';

import React, { useEffect, useRef } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { X } from 'lucide-react';
import gsap from 'gsap';

export function ActiveCallOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shakeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Slide down entry animation
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { y: -60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)", delay: 1.5 }
      );
    }
    
    // Periodic shake to draw attention to the hold button
    if (shakeRef.current) {
      const shakeAction = () => {
        gsap.to(shakeRef.current, {
          x: 4,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.set(shakeRef.current, { x: 0 });
          }
        });
      };
      
      // Start shaking after a delay, then loop
      const timeout = setTimeout(() => {
        shakeAction();
        const interval = setInterval(shakeAction, 6000);
        return () => clearInterval(interval);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div ref={containerRef}>
      <GlassPanel intensity="heavy" hoverGlow className="px-6 py-4 flex items-center justify-between w-[380px] shadow-[0_15px_40px_rgba(0,0,0,0.5)] border-white/20">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Hold This Call?
          </h3>
          <p className="text-sm text-white/70 mt-0.5">You'll be notified to pick up.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button ref={shakeRef} className="px-6 py-2 bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-md rounded-full font-semibold text-sm transition-all shadow-sm border border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Hold
          </button>
          <button className="w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 active:scale-95 flex items-center justify-center transition-all shadow-lg shadow-red-500/20">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
