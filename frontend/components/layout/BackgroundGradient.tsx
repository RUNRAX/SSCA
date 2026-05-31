'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMousePosition } from '@/hooks/useMousePosition';

export function BackgroundGradient() {
  const bgRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();

  useEffect(() => {
    if (bgRef.current) {
      const circles = bgRef.current.querySelectorAll('.gradient-circle');
      
      circles.forEach((circle, i) => {
        // Base random organic movement
        gsap.to(circle, {
          x: "random(-30vw, 30vw)", // Increased range
          y: "random(-30vh, 30vh)",
          duration: "random(15, 30)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * -5, 
        });

        // Opacity pulsing
        gsap.to(circle, {
          opacity: "random(0.3, 0.8)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * -2,
        });
      });
    }
  }, []);

  // Parallax effect using CSS transform for performance
  const parallaxStyle = {
    transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)`,
    transition: 'transform 0.1s ease-out'
  };

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-[var(--color-bg-base)]">
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-full filter blur-[100px] opacity-80"
        style={parallaxStyle}
      >
        <div className="gradient-circle absolute top-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent-teal)] mix-blend-screen opacity-50" />
        <div className="gradient-circle absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-[var(--color-accent-purple)] mix-blend-screen opacity-40" />
        <div className="gradient-circle absolute top-[40%] left-[50%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-accent-blue)] mix-blend-screen opacity-60" />
        {/* 4th circle: Warm amber */}
        <div className="gradient-circle absolute top-[60%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-amber-500/50 mix-blend-screen opacity-30" />
      </div>
      {/* Noise overlay with animated grain */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
