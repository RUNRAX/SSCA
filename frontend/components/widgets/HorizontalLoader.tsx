import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface HorizontalLoaderProps {
  color?: string;
  duration?: number;
  onComplete?: () => void;
}

export function HorizontalLoader({ color = 'bg-white', duration = 3.5, onComplete }: HorizontalLoaderProps) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Animate the bar width
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to('.loader-container', {
          opacity: 0,
          duration: 0.8, // Smooth fade out
          ease: 'power2.inOut',
          onComplete: () => {
            setIsDone(true);
            if (onComplete) onComplete();
          }
        });
      }
    });

    tl.to('.loader-progress', {
      width: '100%',
      duration: duration,
      ease: 'power1.inOut'
    });

    return () => {
      tl.kill();
    };
  }, [duration, onComplete]);

  if (isDone) return null;

  return (
    <div className="loader-container fixed inset-0 w-full h-screen z-[99999] flex flex-col items-center justify-center bg-black/40 backdrop-blur-[60px] border border-white/[0.05] shadow-[0_0_80px_rgba(0,0,0,0.8)]">
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <div className={`loader-progress h-full w-0 rounded-full shadow-[0_0_20px_inherit] ${color}`} />
      </div>
      <p className="mt-6 text-[10px] text-white/40 tracking-[0.3em] uppercase animate-pulse">
        Initializing Engine...
      </p>
    </div>
  );
}
