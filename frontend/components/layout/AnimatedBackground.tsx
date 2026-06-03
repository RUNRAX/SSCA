'use client';

import React from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

/* ─── Noise SVG (same pattern as BackgroundGradient) ─── */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export function AnimatedBackground() {
  const mouse = useMousePosition();

  /* Subtle parallax offset based on normalized mouse (-1…1) */
  const translateX = mouse.x * -8;
  const translateY = mouse.y * -8;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* ── Image layer with Ken Burns + parallax ── */}
      <div
        className="absolute inset-0 scale-[1.2]"
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(1.2)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <img
          src="/bg-dashboard.png"
          alt=""
          role="presentation"
          className="h-full w-full object-cover"
          style={{
            animation: 'kenBurns 30s ease-in-out infinite',
          }}
          draggable={false}
        />
      </div>

      {/* ── Dark overlay for text readability ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,30,0.6), rgba(10,10,30,0.4))',
        }}
      />

      {/* ── Noise texture overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: NOISE_SVG }}
      />
    </div>
  );
}
