'use client';

import React, { useRef, useEffect } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Volume2, Video, MicOff, Grid, MoreHorizontal, Phone } from 'lucide-react';
import gsap from 'gsap';

export function PhoneControls() {
  return (
    <GlassPanel intensity="heavy" hoverGlow scaleOnHover className="p-6 w-fit">
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        <ControlButton icon={<Volume2 />} label="Speaker" index={0} />
        <ControlButton icon={<Video />} label="FaceTime" index={1} />
        <ControlButton icon={<MicOff />} label="Mute" index={2} />
        
        <ControlButton icon={<MoreHorizontal />} label="More" index={3} />
        <ControlButton 
          icon={<Phone className="fill-white" />} 
          label="End" 
          index={4}
          colorClass="bg-red-500 hover:bg-red-600 border-red-400" 
          isEndButton={true}
        />
        <ControlButton icon={<Grid />} label="Keypad" index={5} />
      </div>
    </GlassPanel>
  );
}

function ControlButton({ 
  icon, 
  label, 
  colorClass = "bg-white/10 hover:bg-white/20 border-white/20",
  isEndButton = false,
  index
}: { 
  icon: React.ReactNode, 
  label: string,
  colorClass?: string,
  isEndButton?: boolean,
  index: number
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEndButton && btnRef.current) {
      // Continuous pulsing red glow for the end button
      gsap.to(btnRef.current, {
        boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    if (containerRef.current) {
      // Stagger entrance with ripple pattern from center outward
      gsap.fromTo(containerRef.current, 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          ease: "back.out(1.5)",
          delay: 0.1 + (index * 0.05) 
        }
      );
    }
  }, [isEndButton, index]);

  const handlePress = () => {
    if (btnRef.current) {
      // Haptic-style rapid micro-scale
      gsap.fromTo(btnRef.current, 
        { scale: 1 }, 
        { scale: 0.9, duration: 0.05, ease: "power2.in" }
      );
    }
  };
  
  const handleRelease = () => {
    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 1, duration: 0.5, ease: "elastic.out(1.2, 0.4)" });
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-2">
      <button
        ref={btnRef}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        className={`w-16 h-16 rounded-full flex items-center justify-center border backdrop-blur-md transition-colors ${colorClass}`}
      >
        <div className="text-white w-7 h-7 flex items-center justify-center">
          {icon}
        </div>
      </button>
      <span className="text-xs font-medium text-white/80 tracking-wide">{label}</span>
    </div>
  );
}
