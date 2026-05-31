'use client';

import React, { useEffect, useRef } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { WEATHER_DATA } from '@/lib/constants';
import { Cloud, CloudSun, Sun } from 'lucide-react';
import gsap from 'gsap';

const getIcon = (iconStr: string) => {
  switch(iconStr) {
    case 'cloud': return <Cloud className="w-5 h-5 text-white/80" />;
    case 'cloud-sun': return <CloudSun className="w-5 h-5 text-white/90" />;
    case 'sun': return <Sun className="w-5 h-5 text-yellow-300" />;
    default: return <Cloud className="w-5 h-5 text-white/80" />;
  }
};

export function WeatherWidget() {
  const tempRef = useRef<HTMLDivElement>(null);
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Number count up animation for temperature
    if (tempRef.current) {
      const obj = { val: 40 }; // Start value
      gsap.to(obj, {
        val: WEATHER_DATA.temperature,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          if (tempRef.current) {
            tempRef.current.innerHTML = `${Math.round(obj.val)}&deg;`;
          }
        }
      });
    }

    // Cloud floating stagger animation
    cloudRefs.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          y: -4,
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3
        });
      }
    });
  }, []);

  return (
    <GlassPanel intensity="medium" hoverGlow scaleOnHover className="p-5 w-[340px] h-[220px] flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-medium text-white">{WEATHER_DATA.city}</h2>
          <div ref={tempRef} className="text-[54px] font-light leading-none tracking-tighter mt-1">
            {WEATHER_DATA.temperature}&deg;
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div ref={(el) => { cloudRefs.current[0] = el; }}>
            <CloudSun className="w-7 h-7 text-white mb-2" />
          </div>
          <p className="text-sm font-medium">{WEATHER_DATA.condition}</p>
          <p className="text-xs text-white/70 font-semibold mt-0.5">
            H:{WEATHER_DATA.high}&deg; L:{WEATHER_DATA.low}&deg;
          </p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-white/10 w-full overflow-x-auto hide-scrollbar">
        <div className="flex gap-6 pb-1">
          {WEATHER_DATA.hourly.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-max">
              <span className="text-xs font-semibold text-white/80">{h.hour}</span>
              <div ref={(el) => { cloudRefs.current[i + 1] = el; }}>
                {getIcon(h.icon)}
              </div>
              <span className="text-sm font-bold">{h.temp}&deg;</span>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}
