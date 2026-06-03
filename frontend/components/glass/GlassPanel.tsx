'use client';

import React, { useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';

// Prevent Next.js warning
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface GlassPanelProps {
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
  children?: React.ReactNode;
  bobAnimation?: boolean;
  hoverGlow?: boolean;
  scaleOnHover?: boolean;
  enterAnimation?: boolean;
  glowBorder?: boolean;
  style?: React.CSSProperties;
}

export function GlassPanel({
  intensity = 'medium',
  className = '',
  children = null,
  bobAnimation = false,
  hoverGlow = false,
  scaleOnHover = false,
  enterAnimation = false,
  glowBorder = false,
  style = {},
}: GlassPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!panelRef.current) return;

    // Entry animation
    if (enterAnimation) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.96, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)', delay: 0.05, clearProps: 'all' }
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
        boxShadow: `
          0 4px 24px 0 rgba(0, 0, 0, 0.3),
          0 16px 56px 0 rgba(0, 0, 0, 0.2),
          0 0 30px hsla(220, 90%, 65%, 0.15),
          0 0 60px hsla(270, 70%, 60%, 0.08),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
          inset 0 0 20px 0 rgba(255, 255, 255, 0.04),
          inset 0 -1px 0 0 rgba(0, 0, 0, 0.08)
        `,
        borderColor: 'rgba(255, 255, 255, 0.18)',
        duration: 0.4 
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
        duration: 0.4 
      });
    }
  };

  const glassClass = `glass-${intensity}`;
  const hoverClass = hoverGlow ? 'group hover-shimmer' : '';
  const glowClass = glowBorder ? 'glass-glow' : '';

  return (
    <div
      ref={panelRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel ${glassClass} ${hoverClass} ${glowClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
