'use client';

import React, { useRef, useEffect } from 'react';
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

interface SpringDragProps {
  children: React.ReactNode;
  className?: string;
  onDragEnd?: (x: number, y: number) => void;
  id?: string;
}

export function SpringDrag({ children, className = '', onDragEnd, id }: SpringDragProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragInstance = useRef<Draggable[]>([]);

  useEffect(() => {
    if (containerRef.current && typeof window !== 'undefined') {
      let lastX = 0;
      let lastY = 0;
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        dragInstance.current = Draggable.create(containerRef.current, {
        type: "x,y",
        inertia: true, // Will fall back gracefully if InertiaPlugin isn't registered
        bounds: "body",
        onPress: function() {
          gsap.to(this.target, { 
            scale: 1.05, 
            boxShadow: "0 30px 60px rgba(0,0,0,0.5)", 
            duration: 0.3, 
            ease: "back.out(1.7)" 
          });
          this.target.style.zIndex = "100";
          lastX = this.x;
          lastY = this.y;
        },
        onDrag: function() {
          // Calculate momentum for tilt
          const dx = this.x - lastX;
          const dy = this.y - lastY;
          lastX = this.x;
          lastY = this.y;
          
          // Clamp rotation to max 15 degrees
          const tiltX = gsap.utils.clamp(-15, 15, dy * -0.5);
          const tiltY = gsap.utils.clamp(-15, 15, dx * 0.5);
          
          gsap.to(this.target, {
            rotationX: tiltX,
            rotationY: tiltY,
            duration: 0.1,
            ease: "power1.out",
            overwrite: "auto"
          });
        },
        onRelease: function() {
          // Elastic bounce back on release
          gsap.to(this.target, { 
            scale: 1, 
            boxShadow: "var(--glass-shadow)",
            rotationX: 0,
            rotationY: 0,
            duration: 0.8, 
            ease: "elastic.out(1.2, 0.4)" 
          });
          this.target.style.zIndex = "10";
          if (onDragEnd) {
            onDragEnd(this.x, this.y);
          }
        }
      });
      }
    }

    return () => {
      if (dragInstance.current[0]) {
        dragInstance.current[0].kill();
      }
    };
  }, [onDragEnd]);

  return (
    <div 
      ref={containerRef} 
      id={id} 
      className={`touch-none cursor-grab active:cursor-grabbing will-change-transform ${className.includes('relative') ? '' : 'absolute'} ${className}`}
      style={{ perspective: '800px' }} // Needed for 3D tilt on children
    >
      <div className="w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
}
