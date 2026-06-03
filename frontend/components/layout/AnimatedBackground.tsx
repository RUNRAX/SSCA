'use client';

import React from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

/* ─── Noise SVG (subtle texture grain) ─── */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export function AnimatedBackground() {
  const mouse = useMousePosition();

  /* Subtle parallax offset based on normalized mouse (-1…1) */
  const translateX = mouse.x * -10;
  const translateY = mouse.y * -10;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[hsl(230,60%,4%)]">
      {/* ── Image layer (Static & Optimized) ── */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/bg-dashboard.png"
          alt=""
          role="presentation"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* ── Vignette + soft darken for text readability ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 40%, rgba(5, 5, 20, 0.4) 100%),
            linear-gradient(to bottom, rgba(5, 5, 20, 0.2) 0%, rgba(5, 5, 20, 0.15) 50%, rgba(5, 5, 20, 0.3) 100%)
          `,
        }}
      />
    </div>
  );
}
