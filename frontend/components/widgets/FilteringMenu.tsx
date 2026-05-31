'use client';

import React, { useState } from 'react';
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

  return (
    <GlassPanel intensity="medium" className="w-[240px] flex flex-col overflow-hidden">
      <div className="p-2 flex flex-col gap-1">
        {FILTER_ITEMS.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-white/15' : 'hover:bg-white/5'
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
                <span className="text-xs font-semibold text-white/50">{item.count}</span>
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
