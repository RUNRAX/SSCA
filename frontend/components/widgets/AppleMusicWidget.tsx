'use client';

import React, { useRef, useEffect } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Play } from 'lucide-react';
import gsap from 'gsap';

export function AppleMusicWidget() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Subtle art rotation (vinyl record effect)
    if (artRef.current) {
      gsap.to(artRef.current, { rotation: 360, duration: 20, repeat: -1, ease: "linear" });
    }
    // Note pulse
    if (noteRef.current) {
      gsap.to(noteRef.current, { scale: 1.1, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
  }, []);

  const handlePress = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 0.85, duration: 0.1, ease: "power2.in" });
      
      // Ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'absolute bg-white/30 rounded-full w-full h-full inset-0 z-0 pointer-events-none';
      buttonRef.current.appendChild(ripple);
      
      gsap.fromTo(ripple,
        { scale: 0, opacity: 1 },
        { scale: 2, opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => ripple.remove() }
      );
    }
  };

  const handleRelease = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
    }
  };

  return (
    <GlassPanel bobAnimation intensity="light" hoverGlow scaleOnHover className="p-5 flex flex-col justify-between w-[220px] h-[220px]">
      <div className="flex justify-between items-start">
        {/* Artist Profile Image / Vinyl Record */}
        <div ref={artRef} className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-purple-500 shadow-inner overflow-hidden relative">
           <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.2\'/%3E%3C/svg%3E')]" />
           <div className="absolute inset-[30%] rounded-full bg-black/30 border border-white/10 backdrop-blur-sm" />
        </div>
        <div ref={noteRef} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
            <path d="M15 4h5v12a3 3 0 11-2-2.83V6h-3v10a3 3 0 11-2-2.83V4z" />
          </svg>
        </div>
      </div>
      
      <div className="mt-auto mb-4 relative z-10">
        <h3 className="text-xl font-bold text-white tracking-tight leading-tight">Today's Hits</h3>
        <p className="text-sm text-white/60 font-medium">Apple music hits</p>
      </div>
      
      <button 
        ref={buttonRef}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        className="relative w-full bg-white/20 hover:bg-white/30 transition-colors py-2.5 rounded-full flex items-center justify-center gap-2 backdrop-blur-md overflow-hidden"
      >
        <Play className="w-4 h-4 fill-white relative z-10" />
        <span className="font-semibold text-sm tracking-wide relative z-10">Play</span>
      </button>
    </GlassPanel>
  );
}
