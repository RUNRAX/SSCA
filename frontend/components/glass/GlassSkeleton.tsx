'use client';

import React from 'react';

interface GlassSkeletonProps {
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
}

export function GlassSkeleton({ className = '', intensity = 'medium' }: GlassSkeletonProps) {
  const intensityMap = {
    light: 'bg-white/[0.02] border-white/[0.05]',
    medium: 'bg-white/[0.04] border-white/[0.08]',
    heavy: 'bg-white/[0.08] border-white/[0.12]',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl border backdrop-blur-md ${intensityMap[intensity]} ${className}`}
    >
      {/* Shimmer animation */}
      <div 
        className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}
