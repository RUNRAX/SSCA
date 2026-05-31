'use client';

import React, { useRef } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Volume2, Video, MicOff, Grid, MoreHorizontal, Phone } from 'lucide-react';
import gsap from 'gsap';

export function PhoneControls() {
  return (
    <GlassPanel intensity="heavy" className="p-6 w-fit">
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        <ControlButton icon={<Volume2 />} label="Speaker" />
        <ControlButton icon={<Video />} label="FaceTime" />
        <ControlButton icon={<MicOff />} label="Mute" />
        
        <ControlButton icon={<MoreHorizontal />} label="More" />
        <ControlButton 
          icon={<Phone className="fill-white" />} 
          label="End" 
          colorClass="bg-red-500 hover:bg-red-600 border-red-400" 
        />
        <ControlButton icon={<Grid />} label="Keypad" />
      </div>
    </GlassPanel>
  );
}

function ControlButton({ 
  icon, 
  label, 
  colorClass = "bg-white/10 hover:bg-white/20 border-white/20" 
}: { 
  icon: React.ReactNode, 
  label: string,
  colorClass?: string 
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handlePress = () => {
    if (btnRef.current) gsap.to(btnRef.current, { scale: 0.88, duration: 0.1, ease: "power2.in" });
  };
  const handleRelease = () => {
    if (btnRef.current) gsap.to(btnRef.current, { scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
  };

  return (
    <div className="flex flex-col items-center gap-2">
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
