import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Returns normalized mouse position (-1 to 1).
 * Uses throttled updates instead of rAF loop to avoid
 * constant re-renders when the mouse is idle.
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (pendingRef.current) return; // skip until the last frame flushes
      pendingRef.current = true;

      rafRef.current = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        setMousePosition({ x, y });
        pendingRef.current = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return mousePosition;
}
