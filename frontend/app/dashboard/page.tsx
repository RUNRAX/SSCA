'use client';

import dynamic from 'next/dynamic';
import { PageTransition } from '@/components/transitions/PageTransition';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { GlassSkeleton } from '@/components/glass/GlassSkeleton';
import { HorizontalLoader } from '@/components/widgets/HorizontalLoader';

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
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // Mark as ready on mount (after hydration + first paint)
  useEffect(() => {
    // Use a short delay so dynamic imports have time to resolve
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Run entrance animation only after 'ready'
  useEffect(() => {
    if (!ready || !containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.dashboard-element');
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <PageTransition>
      {showLoader && (
        <HorizontalLoader color="bg-blue-500" duration={3.5} onComplete={() => setShowLoader(false)} />
      )}
      <main ref={containerRef} className="min-h-screen w-full relative pt-28 pb-8 px-4 md:px-6 max-w-7xl mx-auto">
        
        <div className="mb-8 dashboard-element" style={{ opacity: ready ? undefined : 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Cognitive Engine</h1>
          <p className="text-white/60 mt-2 text-lg">Your self-sovereign memory vault.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh] min-h-[600px]">
          {/* Main Chat Interface takes up 2/3 of the screen on desktop */}
          <div className="lg:col-span-2 h-full dashboard-element" style={{ opacity: ready ? undefined : 0 }}>
            <AIChatInterface />
          </div>

          {/* Memory Vault takes up 1/3 of the screen on desktop */}
          <div className="lg:col-span-1 h-full dashboard-element" style={{ opacity: ready ? undefined : 0 }}>
            <MemoryVault />
          </div>
        </div>

      </main>
    </PageTransition>
  );
}
