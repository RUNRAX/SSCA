'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMousePosition } from '@/hooks/useMousePosition';

interface CollageGridProps {
  children: React.ReactNode;
}

export function CollageGrid({ children }: CollageGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();

  useEffect(() => {
    if (gridRef.current) {
      const childrenElements = Array.from(gridRef.current.children);
      
      // Staggered cascade entrance
      childrenElements.forEach((el, i) => {
        // Elements further back start smaller
        const depthScale = 1 - (i % 3) * 0.05; // 1.0 to 0.9
        const isLeft = i % 2 === 0;
        
        gsap.fromTo(el, 
          { 
            y: 80 + Math.random() * 40, 
            x: isLeft ? -40 : 40,
            opacity: 0, 
            scale: 0.7,
            rotation: (Math.random() - 0.5) * 10
          },
          { 
            y: 0, 
            x: 0,
            opacity: 1, 
            scale: depthScale,
            rotation: 0,
            duration: 1.4, 
            ease: "elastic.out(1, 0.7)",
            delay: 0.1 + (i * 0.06),
            clearProps: "scale" // Clear scale so drag interactions can take over smoothly
          }
        );
      });
    }
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    if (gridRef.current) {
      const childrenElements = Array.from(gridRef.current.children);
      const x = mouse.x * 15;
      const y = mouse.y * 15;
      
      childrenElements.forEach((el, i) => {
        const depth = 1 + (i % 3) * 0.4;
        
        gsap.to(el, {
          x: x * depth,
          y: y * depth,
          rotationX: mouse.y * -3 * depth, // 3D tilt
          rotationY: mouse.x * 3 * depth,  // 3D tilt
          duration: 1.2,
          ease: "power1.out",
          overwrite: "auto"
        });
      });
    }
  }, [mouse]);

  return (
    <div 
      ref={gridRef}
      className="relative w-full max-w-[1440px] mx-auto min-h-screen p-4 sm:p-12 lg:p-20 overflow-x-hidden overflow-y-auto md:overflow-hidden flex flex-col md:block items-center gap-8 pt-24 md:pt-12 pb-24 md:pb-12"
      style={{ perspective: "1000px" }} // For 3D rotation
    >
      {children}
    </div>
  );
}
