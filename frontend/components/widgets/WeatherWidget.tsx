import React from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { WEATHER_DATA } from '@/lib/constants';
import { Cloud, CloudSun, Sun } from 'lucide-react';

const getIcon = (iconStr: string) => {
  switch(iconStr) {
    case 'cloud': return <Cloud className="w-5 h-5 text-white/80" />;
    case 'cloud-sun': return <CloudSun className="w-5 h-5 text-white/90" />;
    case 'sun': return <Sun className="w-5 h-5 text-yellow-300" />;
    default: return <Cloud className="w-5 h-5 text-white/80" />;
  }
};

export function WeatherWidget() {
  return (
    <GlassPanel className="p-5 w-[340px] h-[220px] flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-medium text-white">{WEATHER_DATA.city}</h2>
          <div className="text-[54px] font-light leading-none tracking-tighter mt-1">
            {WEATHER_DATA.temperature}&deg;
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <CloudSun className="w-7 h-7 text-white mb-2" />
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
              {getIcon(h.icon)}
              <span className="text-sm font-bold">{h.temp}&deg;</span>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}
