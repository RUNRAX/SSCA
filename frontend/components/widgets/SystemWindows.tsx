import React from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Search, Phone, Video, MessageCircle } from 'lucide-react';

export function SystemWindows() {
  return (
    <div className="flex gap-4 items-center">
      {/* Search Input Bar */}
      <GlassPanel className="flex items-center px-4 py-3 min-w-[200px]" bobAnimation>
        <Search className="w-4 h-4 text-white/50 mr-2" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none outline-none text-white placeholder-white/50 text-sm font-medium w-full"
        />
      </GlassPanel>

      {/* Number Tile */}
      <GlassPanel intensity="heavy" className="w-[80px] h-[80px] flex items-center justify-center rounded-[24px]" bobAnimation>
        <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-blue-500 opacity-80" />
        <span className="relative z-10 text-4xl font-light text-white tracking-tighter">26</span>
      </GlassPanel>

      {/* Contact Tile */}
      <GlassPanel intensity="light" className="p-4 w-[160px] flex flex-col gap-3" bobAnimation>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pink-400" />
          <span className="font-semibold tracking-tight">Blest</span>
        </div>
        <div className="flex justify-between w-full px-1">
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <Phone className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <Video className="w-4 h-4" />
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
