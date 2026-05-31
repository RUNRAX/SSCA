'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CollageGridProps {
  children: React.ReactNode;
}

export function CollageGrid({ children }: CollageGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      // Entrance animation for all children
      const childrenElements = Array.from(gridRef.current.children);
      
      gsap.fromTo(childrenElements, 
        { 
          y: 60, 
          opacity: 0, 
          scale: 0.8,
          rotation: () => (Math.random() - 0.5) * 5 
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotation: 0,
          duration: 1.2, 
          stagger: 0.08, 
          ease: "elastic.out(1, 0.6)",
          delay: 0.2
        }
      );

      // Subtle parallax effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        childrenElements.forEach((el, i) => {
          const depth = 1 + (i % 3) * 0.5; // Pseudo depth
          gsap.to(el, {
            x: x * depth,
            y: y * depth,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto" // Only overwrite x/y animations
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div 
      ref={gridRef}
      className="relative w-full max-w-[1440px] mx-auto min-h-screen p-8 sm:p-12 lg:p-20 overflow-hidden"
    >
      {/* 
        We use an absolute positioning strategy for the collage to allow overlapping and physics-based drag.
        The layout positions are defined as top/left/right/bottom classes on the children wrappers.
      */}
      {children}
    </div>
  );
}
