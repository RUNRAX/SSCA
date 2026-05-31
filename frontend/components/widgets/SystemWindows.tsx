'use client';

import React, { useRef, useEffect } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Search, Phone, Video, MessageCircle } from 'lucide-react';
import gsap from 'gsap';

export function SystemWindows() {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Number count-up animation
    if (numberRef.current) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 26,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = Math.round(obj.val).toString();
          }
        }
      });
    }
  }, []);

  return (
    <div className="flex gap-4 items-center">
      {/* Search Input Bar */}
      <GlassPanel hoverGlow className="flex items-center px-4 py-3 min-w-[200px] group transition-all focus-within:ring-2 focus-within:ring-[var(--color-accent-teal)] focus-within:ring-opacity-50" bobAnimation>
        <Search className="w-4 h-4 text-white/50 mr-2 group-focus-within:text-[var(--color-accent-teal)] transition-colors" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none outline-none text-white placeholder-white/50 text-sm font-medium w-full"
        />
      </GlassPanel>

      {/* Number Tile */}
      <GlassPanel intensity="heavy" hoverGlow scaleOnHover className="w-[80px] h-[80px] flex items-center justify-center rounded-[24px] overflow-hidden group cursor-pointer" bobAnimation>
        <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-blue-500 opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500 ease-out" />
        <span ref={numberRef} className="relative z-10 text-4xl font-light text-white tracking-tighter drop-shadow-md">0</span>
      </GlassPanel>

      {/* Contact Tile */}
      <GlassPanel intensity="light" hoverGlow scaleOnHover className="p-4 w-[160px] flex flex-col gap-3" bobAnimation>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pink-400 shadow-inner overflow-hidden flex items-center justify-center">
            <span className="text-sm">👩🏼‍🦰</span>
          </div>
          <span className="font-semibold tracking-tight text-white group-hover:text-[var(--color-accent-teal)] transition-colors">Blest</span>
        </div>
        <div className="flex justify-between w-full px-1">
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all text-white/80 hover:text-white">
            <MessageCircle className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all text-white/80 hover:text-green-400">
            <Phone className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all text-white/80 hover:text-blue-400">
            <Video className="w-4 h-4" />
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
