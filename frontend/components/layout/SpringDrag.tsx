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
      // Use standard draggable for simplicity, but with bounds if needed
      dragInstance.current = Draggable.create(containerRef.current, {
        type: "x,y",
        inertia: true,
        bounds: "body",
        onPress: function() {
          // Bring to front and add press effect
          gsap.to(this.target, { 
            scale: 1.02, 
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            duration: 0.2, 
            ease: "back.out(1.7)" 
          });
          // Ensure it's on top of other widgets
          this.target.style.zIndex = "100";
        },
        onRelease: function() {
          // Remove press effect
          gsap.to(this.target, { 
            scale: 1, 
            boxShadow: "var(--glass-shadow)",
            duration: 0.5, 
            ease: "elastic.out(1, 0.5)" 
          });
          this.target.style.zIndex = "10";
          if (onDragEnd) {
            onDragEnd(this.x, this.y);
          }
        }
      });
    }

    return () => {
      if (dragInstance.current[0]) {
        dragInstance.current[0].kill();
      }
    };
  }, [onDragEnd]);

  return (
    <div ref={containerRef} id={id} className={`absolute touch-none cursor-grab active:cursor-grabbing ${className}`}>
      {children}
    </div>
  );
}
