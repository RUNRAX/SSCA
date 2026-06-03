'use client';

import dynamic from 'next/dynamic';
import { PageTransition } from '@/components/transitions/PageTransition';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlassSkeleton } from '@/components/glass/GlassSkeleton';

const AIChatInterface = dynamic(
  () => import('@/components/widgets/AIChatInterface').then(mod => mod.AIChatInterface),
  { loading: () => <GlassSkeleton className="w-full h-full min-h-[600px] rounded-3xl" intensity="heavy" /> }
);

const MemoryVault = dynamic(
  () => import('@/components/widgets/MemoryVault').then(mod => mod.MemoryVault),
  { loading: () => <GlassSkeleton className="w-full h-full min-h-[600px] rounded-3xl" intensity="medium" /> }
);

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Staggered Entrance Choreography
    const ctx = gsap.context(() => {
      // Hide initially to prevent flash
      gsap.set('.dashboard-element', { opacity: 0, y: 30, scale: 0.98 });
      
      gsap.to('.dashboard-element', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.1,
        clearProps: 'all'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <main ref={containerRef} className="min-h-screen w-full relative pt-28 pb-8 px-4 md:px-6 max-w-7xl mx-auto">
        
        <div className="mb-8 dashboard-element">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Cognitive Engine</h1>
          <p className="text-white/60 mt-2 text-lg">Your self-sovereign memory vault.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh] min-h-[600px]">
          {/* Main Chat Interface takes up 2/3 of the screen on desktop */}
          <div className="lg:col-span-2 h-full dashboard-element">
            <AIChatInterface />
          </div>

          {/* Memory Vault takes up 1/3 of the screen on desktop */}
          <div className="lg:col-span-1 h-full dashboard-element">
            <MemoryVault />
          </div>
        </div>

      </main>
    </PageTransition>
  );
}
