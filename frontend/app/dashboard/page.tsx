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
import { PageTransition } from '@/components/transitions/PageTransition';

export default function DashboardPage() {
  return (
    <PageTransition>
      <main className="min-h-screen w-full relative">
        <CollageGrid>
        
        <SpringDrag id="music" className="relative md:absolute md:top-[5%] md:left-[5%] z-20">
          <AppleMusicWidget />
        </SpringDrag>
        
        <SpringDrag id="reminders" className="relative md:absolute md:top-[2%] md:left-[30%] z-10">
          <RemindersWidget />
        </SpringDrag>
        
        <SpringDrag id="weather" className="relative md:absolute md:top-[3%] md:right-[5%] z-10">
          <WeatherWidget />
        </SpringDrag>
        
        <SpringDrag id="chat" className="relative md:absolute md:top-[30%] md:left-[8%] z-30">
          <BrowserWindow />
        </SpringDrag>
        
        <SpringDrag id="notifications" className="relative md:absolute md:top-[28%] md:right-[32%] z-20">
          <NotificationStack />
        </SpringDrag>
        
        <SpringDrag id="phone" className="relative md:absolute md:bottom-[8%] md:left-[6%] z-10">
          <PhoneControls />
        </SpringDrag>
        
        <SpringDrag id="filter" className="relative md:absolute md:bottom-[6%] md:left-[36%] z-20">
          <FilteringMenu />
        </SpringDrag>
        
        <SpringDrag id="locations" className="relative md:absolute md:bottom-[4%] md:right-[4%] z-30">
          <LocationsDashboard />
        </SpringDrag>
        
        <SpringDrag id="active-call" className="relative md:absolute md:top-[60%] md:left-[12%] z-40">
          <ActiveCallOverlay />
        </SpringDrag>

        <div className="relative md:absolute md:top-[48%] md:left-[55%] md:-translate-x-1/2 md:-translate-y-1/2 z-0 pointer-events-none mb-6 md:mb-0">
          <MediaControls />
        </div>
        
        <SpringDrag id="system-windows" className="relative md:absolute md:top-[42%] md:right-[10%] z-40">
          <SystemWindows />
        </SpringDrag>
        
        </CollageGrid>
      </main>
    </PageTransition>
  );
}
