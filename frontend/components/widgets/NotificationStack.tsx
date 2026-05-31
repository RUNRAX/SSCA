import React from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { NOTIFICATION_DATA } from '@/lib/constants';

export function NotificationStack() {
  return (
    <div className="relative w-[340px] h-[160px]">
      {/* Background stacked cards for depth effect */}
      <GlassPanel intensity="heavy" className="absolute inset-x-4 -top-3 h-full opacity-40 scale-[0.92] blur-sm" />
      <GlassPanel intensity="heavy" className="absolute inset-x-2 -top-1.5 h-full opacity-60 scale-[0.96] blur-[2px]" />
      
      {/* Main Container */}
      <GlassPanel intensity="medium" className="absolute inset-0 p-4 flex flex-col gap-3 border-t border-white/30" bobAnimation>
        
        {/* Avatars sticking out top */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex -space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-blue-400 to-indigo-600 border-2 border-transparent shadow-lg flex items-center justify-center">
            <span className="text-xl">👨🏽‍🦱</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-pink-400 to-rose-600 border-2 border-transparent shadow-lg flex items-center justify-center">
            <span className="text-xl">👩🏼‍🦰</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {NOTIFICATION_DATA.map((notif, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500 shrink-0 flex items-center justify-center shadow-inner mt-0.5">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-sm text-white truncate pr-2">{notif.name}</span>
                  <span className="text-xs text-white/50 shrink-0">{notif.time}</span>
                </div>
                <p className="text-[13px] text-white/70 leading-snug line-clamp-2">
                  {notif.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
