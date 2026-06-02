'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface GlassPanelProps {
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
  children?: React.ReactNode;
  bobAnimation?: boolean;
  hoverGlow?: boolean;
  scaleOnHover?: boolean;
  enterAnimation?: boolean;
}

export function GlassPanel({
  intensity = 'medium',
  className = '',
  children = null,
  bobAnimation = false,
  hoverGlow = false,
  scaleOnHover = false,
  enterAnimation = false,
}: GlassPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;

    // Entry animation
    if (enterAnimation) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)', delay: 0.1 }
      );
    }

    // Bob animation
    if (bobAnimation) {
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
  }, [bobAnimation, enterAnimation]);

  const handleMouseEnter = () => {
    if (!panelRef.current) return;
    
    if (scaleOnHover) {
      gsap.to(panelRef.current, { scale: 1.02, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    }
    
    if (hoverGlow) {
      gsap.to(panelRef.current, { 
        boxShadow: '0 0 25px rgba(0, 230, 255, 0.15), var(--glass-shadow)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        duration: 0.3 
      });
    }
  };

  const handleMouseLeave = () => {
    if (!panelRef.current) return;
    
    if (scaleOnHover) {
      gsap.to(panelRef.current, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    }
    
    if (hoverGlow) {
      gsap.to(panelRef.current, { 
        boxShadow: 'var(--glass-shadow)',
        borderColor: 'var(--glass-border)',
        duration: 0.3 
      });
    }
  };

  const glassClass = `glass-${intensity}`;
  const hoverClass = hoverGlow ? 'group hover-shimmer' : '';

  return (
    <div
      ref={panelRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel ${glassClass} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
