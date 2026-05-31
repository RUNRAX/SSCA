'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { FILTER_ITEMS } from '@/lib/constants';
import { Check, UserX, AlertTriangle, Trash2, MessageCircle } from 'lucide-react';
import gsap from 'gsap';

const getIcon = (iconStr: string) => {
  switch(iconStr) {
    case 'check': return <MessageCircle className="w-4 h-4" />;
    case 'user-x': return <UserX className="w-4 h-4" />;
    case 'alert-triangle': return <AlertTriangle className="w-4 h-4" />;
    case 'trash-2': return <Trash2 className="w-4 h-4" />;
    default: return <Check className="w-4 h-4" />;
  }
};

export function FilteringMenu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // When active index changes, animate the badge to scale in
    if (badgeRefs.current[activeIndex]) {
      gsap.fromTo(badgeRefs.current[activeIndex],
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }
      );
    }
  }, [activeIndex]);

  return (
    <GlassPanel intensity="medium" hoverGlow className="w-[240px] flex flex-col overflow-hidden">
      <div className="p-2 flex flex-col gap-1 relative">
        {/* Animated highlight background */}
        <div 
          className="absolute left-2 right-2 h-10 bg-white/15 rounded-xl transition-all duration-300 ease-out z-0"
          style={{ top: `${8 + (activeIndex * 44)}px` }}
        />
        
        {FILTER_ITEMS.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative z-10 flex items-center justify-between w-full px-3 h-10 rounded-xl transition-colors duration-300 ${
                !isActive ? 'hover:bg-white/5' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`text-white/80 transition-colors ${isActive ? 'text-white' : ''}`}>
                  {getIcon(item.icon)}
                </div>
                <span className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/70'}`}>
                  {item.label}
                </span>
              </div>
              {item.count !== null && (
                <span 
                  ref={(el) => { badgeRefs.current[idx] = el; }} 
                  className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-white/50'}`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="border-t border-white/10 p-4 flex flex-col gap-3 bg-black/10">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-white/50" />
          <span className="text-sm font-medium text-white/70">Filter by: <span className="text-white">Unread</span></span>
        </div>
        <button className="text-sm font-medium text-[var(--color-accent-teal)] text-left hover:text-[var(--color-accent-blue)] transition-colors">
          Manage Filtering
        </button>
      </div>
    </GlassPanel>
  );
}
