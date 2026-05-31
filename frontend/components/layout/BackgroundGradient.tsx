'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function BackgroundGradient() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bgRef.current) {
      const circles = bgRef.current.querySelectorAll('.gradient-circle');
      
      circles.forEach((circle, i) => {
        gsap.to(circle, {
          x: "random(-20vw, 20vw)",
          y: "random(-20vh, 20vh)",
          duration: "random(15, 25)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * -5, // Start at different points in the animation
        });
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-[var(--color-bg-base)]">
      <div ref={bgRef} className="absolute inset-0 w-full h-full filter blur-[100px] opacity-80">
        <div className="gradient-circle absolute top-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent-teal)] mix-blend-screen opacity-50" />
        <div className="gradient-circle absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-[var(--color-accent-purple)] mix-blend-screen opacity-40" />
        <div className="gradient-circle absolute top-[40%] left-[50%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-accent-blue)] mix-blend-screen opacity-60" />
      </div>
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
