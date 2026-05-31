'use client';

import React, { useState, useRef } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { LOCATION_DATA } from '@/lib/constants';
import { ChevronRight, Heart, Check, X } from 'lucide-react';
import gsap from 'gsap';

export function LocationsDashboard() {
  const [activeTab, setActiveTab] = useState<'category' | 'city'>('category');

  const handleTabChange = (tab: 'category' | 'city') => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col gap-4 w-[320px]">
      <GlassPanel intensity="medium" hoverGlow className="p-4" bobAnimation>
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-lg font-bold text-white tracking-tight">Visits</h2>
          <button className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all">
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Tab 1: By Category */}
        <div className={`mt-4 transition-all duration-300 ${activeTab === 'category' ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
          <button 
            onClick={() => handleTabChange('city')}
            className="flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white mb-3 hover:translate-x-1 transition-transform"
          >
            By Category <ChevronRight className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-2 gap-3">
            <CategoryCard title="Nature" count={`${LOCATION_DATA.categories.nature} visits`} color="bg-green-500" />
            <CategoryCard title="Cities" count={`${LOCATION_DATA.categories.cities} visits`} color="bg-blue-500" />
          </div>
        </div>

        {/* Tab 2: By City */}
        <div className={`mt-4 transition-all duration-300 ${activeTab === 'city' ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
          <button 
            onClick={() => handleTabChange('category')}
            className="flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white mb-3 hover:translate-x-1 transition-transform"
          >
            By City <ChevronRight className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-24 rounded-xl overflow-hidden bg-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              {/* Ken Burns effect image */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110 ease-out" />
              <div className="absolute bottom-2 left-2 z-20">
                <p className="text-xs font-bold text-white leading-tight">San Francisco</p>
                <p className="text-[10px] text-white/80">{LOCATION_DATA.visits} visits</p>
              </div>
            </div>
            <div className="relative h-24 rounded-xl overflow-hidden bg-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110 ease-out" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button className="text-sm font-semibold text-[var(--color-accent-teal)] hover:text-white transition-colors flex items-center gap-1 group">
            All Visits <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </GlassPanel>

      <GlassPanel intensity="medium" hoverGlow scaleOnHover className="p-4" bobAnimation>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 group">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1585808795556-9b846e4cbe7b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-125" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-white text-sm truncate pr-2">{LOCATION_DATA.name}</h3>
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-white/50 hover:text-red-400 transition-colors cursor-pointer hover:scale-110" />
                <button className="w-5 h-5 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // 3D tilt on hover
    gsap.to(cardRef.current, {
      rotationX: -y * 0.2,
      rotationY: x * 0.2,
      duration: 0.2,
      ease: "power2.out",
      transformPerspective: 500
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "elastic.out(1.2, 0.4)"
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`h-24 rounded-xl p-3 flex flex-col justify-between ${color} bg-opacity-80 backdrop-blur-md relative overflow-hidden group cursor-pointer will-change-transform`}
    >
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
        <span className="text-sm">{title === 'Nature' ? '🌲' : '🏙️'}</span>
      </div>
      <div>
        <p className="font-bold text-white text-sm group-hover:translate-x-1 transition-transform">{title}</p>
        <p className="text-[10px] text-white/80 font-medium group-hover:translate-x-1 transition-transform delay-75">{count}</p>
      </div>
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
