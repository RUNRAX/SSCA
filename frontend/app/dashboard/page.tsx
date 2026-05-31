'use client';

import { CollageGrid } from '@/components/layout/CollageGrid';
import { SpringDrag } from '@/components/layout/SpringDrag';
import { AppleMusicWidget } from '@/components/widgets/AppleMusicWidget';
import { RemindersWidget } from '@/components/widgets/RemindersWidget';
import { WeatherWidget } from '@/components/widgets/WeatherWidget';
import { BrowserWindow } from '@/components/widgets/BrowserWindow';
import { NotificationStack } from '@/components/widgets/NotificationStack';
import { PhoneControls } from '@/components/widgets/PhoneControls';
import { FilteringMenu } from '@/components/widgets/FilteringMenu';
import { LocationsDashboard } from '@/components/widgets/LocationsDashboard';
import { SystemWindows } from '@/components/widgets/SystemWindows';
import { MediaControls } from '@/components/widgets/MediaControls';
import { ActiveCallOverlay } from '@/components/widgets/ActiveCallOverlay';

export default function DashboardPage() {
  return (
    <main className="min-h-screen w-full relative">
      <CollageGrid>
        
        <SpringDrag id="music" className="top-[5%] left-[5%] z-20">
          <AppleMusicWidget />
        </SpringDrag>
        
        <SpringDrag id="reminders" className="top-[2%] left-[30%] z-10">
          <RemindersWidget />
        </SpringDrag>
        
        <SpringDrag id="weather" className="top-[3%] right-[5%] z-10">
          <WeatherWidget />
        </SpringDrag>
        
        <SpringDrag id="chat" className="top-[30%] left-[8%] z-30">
          <BrowserWindow />
        </SpringDrag>
        
        <SpringDrag id="notifications" className="top-[28%] right-[32%] z-20">
          <NotificationStack />
        </SpringDrag>
        
        <SpringDrag id="phone" className="bottom-[8%] left-[6%] z-10">
          <PhoneControls />
        </SpringDrag>
        
        <SpringDrag id="filter" className="bottom-[6%] left-[36%] z-20">
          <FilteringMenu />
        </SpringDrag>
        
        <SpringDrag id="locations" className="bottom-[4%] right-[4%] z-30">
          <LocationsDashboard />
        </SpringDrag>
        
        <SpringDrag id="active-call" className="top-[60%] left-[12%] z-40">
          <ActiveCallOverlay />
        </SpringDrag>

        <div className="absolute top-[48%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <MediaControls />
        </div>
        
        <SpringDrag id="system-windows" className="top-[42%] right-[10%] z-40">
          <SystemWindows />
        </SpringDrag>
        
      </CollageGrid>
    </main>
  );
}
