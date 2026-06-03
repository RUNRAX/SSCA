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
      {/* ── Image layer with Ken Burns ── */}
      <div className="absolute inset-[-10%] w-[120%] h-[120%]">
        <img
          src="/bg-dashboard.png"
          alt=""
          role="presentation"
          className="h-full w-full object-cover"
          style={{
            animation: 'kenBurns 40s ease-in-out infinite',
            willChange: 'transform',
          }}
          draggable={false}
        />
      </div>

      {/* ── Subtle Vignette (removed black overlay) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 60%, rgba(5, 5, 20, 0.2) 100%)`,
        }}
      />

      {/* ── Noise texture overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: NOISE_SVG }}
      />
    </div>
  );
}
