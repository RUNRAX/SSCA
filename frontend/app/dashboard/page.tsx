'use client';

import { AIChatInterface } from '@/components/widgets/AIChatInterface';
import { MemoryVault } from '@/components/widgets/MemoryVault';
import { PageTransition } from '@/components/transitions/PageTransition';

export default function DashboardPage() {
  return (
    <PageTransition>
      <main className="min-h-screen w-full relative pt-28 pb-8 px-4 md:px-6 max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Cognitive Engine</h1>
          <p className="text-white/60 mt-2 text-lg">Your self-sovereign memory vault.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh] min-h-[600px]">
          {/* Main Chat Interface takes up 2/3 of the screen on desktop */}
          <div className="lg:col-span-2 h-full">
            <AIChatInterface />
          </div>

          {/* Memory Vault takes up 1/3 of the screen on desktop */}
          <div className="lg:col-span-1 h-full">
            <MemoryVault />
          </div>
        </div>

      </main>
    </PageTransition>
  );
}
