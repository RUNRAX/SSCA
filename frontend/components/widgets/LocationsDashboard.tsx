'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { LOCATION_DATA } from '@/lib/constants';
import { ChevronRight, Heart, Check, X } from 'lucide-react';
import gsap from 'gsap';

export function LocationsDashboard() {
  const [activeTab, setActiveTab] = useState<'category' | 'city'>('category');

  const handleTabChange = (tab: 'category' | 'city') => {
    setActiveTab(tab);
    // Optional: Add a GSAP transition for the content change here if desired
  };

  return (
    <div className="flex flex-col gap-4 w-[320px]">
      <GlassPanel intensity="medium" className="p-4" bobAnimation>
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-lg font-bold text-white tracking-tight">Visits</h2>
          <button className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Tab 1: By Category */}
        <div className="mt-4">
          <button 
            onClick={() => handleTabChange('category')}
            className="flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white mb-3"
          >
            By Category <ChevronRight className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-2 gap-3">
            <CategoryCard title="Nature" count={`${LOCATION_DATA.categories.nature} visits`} color="bg-green-500" />
            <CategoryCard title="Cities" count={`${LOCATION_DATA.categories.cities} visits`} color="bg-blue-500" />
          </div>
        </div>

        {/* Tab 2: By City */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <button 
            onClick={() => handleTabChange('city')}
            className="flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white mb-3"
          >
            By City <ChevronRight className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-24 rounded-xl overflow-hidden bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="absolute bottom-2 left-2 z-20">
                <p className="text-xs font-bold text-white leading-tight">San Francisco</p>
                <p className="text-[10px] text-white/80">{LOCATION_DATA.visits} visits</p>
              </div>
            </div>
            <div className="relative h-24 rounded-xl overflow-hidden bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button className="text-sm font-semibold text-[var(--color-accent-teal)] hover:text-white transition-colors flex items-center gap-1">
            All Visits <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </GlassPanel>

      <GlassPanel intensity="medium" className="p-4" bobAnimation>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[url('https://images.unsplash.com/photo-1585808795556-9b846e4cbe7b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-white text-sm truncate pr-2">{LOCATION_DATA.name}</h3>
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-white/50" />
                <button className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <Check className="w-3 h-3 text-black" />
                </button>
              </div>
            </div>
            <p className="text-xs text-white/60 mb-2 truncate">{LOCATION_DATA.description}</p>
            <p className="text-[11px] font-medium text-white/80">{LOCATION_DATA.city}, {LOCATION_DATA.visits} visits</p>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}

function CategoryCard({ title, count, color }: { title: string, count: string, color: string }) {
  return (
    <div className={`h-24 rounded-xl p-3 flex flex-col justify-between ${color} bg-opacity-80 backdrop-blur-md relative overflow-hidden group cursor-pointer`}>
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        {/* Placeholder icon based on title */}
        <span className="text-sm">{title === 'Nature' ? '🌲' : '🏙️'}</span>
      </div>
      <div>
        <p className="font-bold text-white text-sm">{title}</p>
        <p className="text-[10px] text-white/80 font-medium">{count}</p>
      </div>
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
