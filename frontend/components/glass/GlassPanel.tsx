'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface GlassPanelProps {
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
  children: React.ReactNode;
  bobAnimation?: boolean;
}

export function GlassPanel({
  intensity = 'medium',
  className = '',
  children,
  bobAnimation = false,
}: GlassPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bobAnimation && panelRef.current) {
      const duration = 3 + Math.random() * 2;
      const delay = Math.random() * 2;
      
      gsap.to(panelRef.current, {
        y: "+=6",
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, [bobAnimation]);

  const glassClass = `glass-${intensity}`;

  return (
    <div
      ref={panelRef}
      className={`glass-panel ${glassClass} ${className}`}
      style={{
        filter: 'url(#liquidDistortion)', // Apply SVG distortion filter
      }}
    >
      {children}
    </div>
  );
}
