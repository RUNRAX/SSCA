import React from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { X } from 'lucide-react';

export function ActiveCallOverlay() {
  return (
    <GlassPanel intensity="heavy" className="px-6 py-4 flex items-center justify-between w-[380px]">
      <div>
        <h3 className="text-lg font-semibold text-white tracking-tight">Hold This Call?</h3>
        <p className="text-sm text-white/70 mt-0.5">You'll be notified to pick up.</p>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full font-semibold text-sm transition-colors shadow-sm border border-white/10">
          Hold
        </button>
        <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </GlassPanel>
  );
}
