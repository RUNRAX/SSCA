'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useTransitionContext } from './RouteTransitionProvider';
import gsap from 'gsap';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function PageTransition({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const { isTransitioning } = useTransitionContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (isTransitioning) {
        // Exit animation
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -30,
          scale: 0.98,
          filter: 'blur(8px)',
          duration: 0.3,
          ease: 'power2.in'
        });
      } else {
        // Enter animation
        gsap.fromTo(containerRef.current,
          { opacity: 0, y: 30, scale: 0.97, filter: 'blur(8px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out', clearProps: 'opacity,y,scale,filter' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isTransitioning]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {children}
    </div>
  );
}
