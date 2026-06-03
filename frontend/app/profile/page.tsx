'use client';

import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Navbar } from '@/components/layout/Navbar';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';

export default function ProfilePage() {
  // Mock data for UI layout
  const [userProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    purpose: 'Personal Cognitive Assistant',
  });

  const [agentPersonality, setAgentPersonality] = useState('friendly');

  const personalities = [
    { id: 'friendly', name: 'Friendly', desc: 'Warm, approachable, and encouraging.' },
    { id: 'official', name: 'Official', desc: 'Direct, formal, and strictly professional.' },
    { id: 'storyteller', name: 'Storyteller', desc: 'Explains your memories as a narrative story.' },
    { id: 'humorous', name: 'Humorous', desc: 'Cracks jokes and keeps the mood light.' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0a0515] text-white overflow-hidden relative">
        <AnimatedBackground />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 flex flex-col gap-10">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Profile Settings</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Column: User Info */}
              <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
                <div className="relative p-8 rounded-[32px] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
                  
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 mb-6 flex items-center justify-center text-2xl font-bold shadow-lg">
                    {userProfile.name.charAt(0)}
                  </div>
                  
                  <div className="flex flex-col gap-4 relative z-10">
                    <div>
                      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Full Name</label>
                      <p className="text-lg font-medium">{userProfile.name}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Linked Email</label>
                      <p className="text-lg font-medium">{userProfile.email}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Purpose of Use</label>
                      <p className="text-lg font-medium">{userProfile.purpose}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Agent Settings */}
              <div className="col-span-1 md:col-span-7 flex flex-col gap-6">
                <div className="relative p-8 rounded-[32px] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-bl from-white/10 via-transparent to-transparent opacity-30 mix-blend-overlay pointer-events-none" />
                  
                  <h2 className="text-2xl font-bold mb-2 relative z-10">Agent Personality</h2>
                  <p className="text-white/60 mb-8 relative z-10">Choose how the SSCA Cognitive Engine interacts with you and recalls your memory.</p>
                  
                  <div className="flex flex-col gap-4 relative z-10">
                    {personalities.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setAgentPersonality(p.id)}
                        className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col gap-1 ${
                          agentPersonality === p.id 
                            ? 'bg-white/10 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                            : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold text-lg">{p.name}</span>
                          {agentPersonality === p.id && (
                            <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                          )}
                        </div>
                        <span className="text-sm text-white/70">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </main>

          {/* Footer Helpline */}
          <footer className="w-full py-8 text-center text-white/50 border-t border-white/10 backdrop-blur-md bg-black/20">
            <p className="text-sm">
              Need help or want to provide feedback? Contact me at <a href="mailto:helpline@example.com" className="text-white hover:underline font-medium transition-colors">helpline@example.com</a>
            </p>
          </footer>
        </div>
      </div>
    </PageTransition>
  );
}
