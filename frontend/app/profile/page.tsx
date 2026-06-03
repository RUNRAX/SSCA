'use client';

import React, { useState, useEffect } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Navbar } from '@/components/layout/Navbar';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { HorizontalLoader } from '@/components/widgets/HorizontalLoader';
import { useAuthContext } from '@/components/auth/AuthProvider';

export default function ProfilePage() {
  // Mock data for UI layout
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    purpose: '',
  });
  const [agentPersonality, setAgentPersonality] = useState('friendly');
  const [showLoader, setShowLoader] = useState(true);
  const { userId } = useAuthContext();

  // Load from local storage on mount
  useEffect(() => {
    if (!userId) return;
    
    const savedProfile = localStorage.getItem(`ssca_user_profile_${userId}`);
    const savedPersonality = localStorage.getItem(`ssca_agent_personality_${userId}`);
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      // Default fallback
      setUserProfile({
        name: 'User',
        email: 'user@example.com',
        purpose: 'Personal Cognitive Assistant',
      });
    }
    
    if (savedPersonality) {
      setAgentPersonality(savedPersonality);
    }
  }, [userId]);

  const handleProfileChange = (field: string, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = () => {
    if (userId) localStorage.setItem(`ssca_user_profile_${userId}`, JSON.stringify(userProfile));
    setIsEditing(false);
  };

  const handlePersonalityChange = (id: string) => {
    setAgentPersonality(id);
    if (userId) localStorage.setItem(`ssca_agent_personality_${userId}`, id);
  };

  const personalities = [
    { id: 'friendly', name: 'Friendly', desc: 'Warm, approachable, and encouraging.' },
    { id: 'official', name: 'Official', desc: 'Direct, formal, and strictly professional.' },
    { id: 'storyteller', name: 'Storyteller', desc: 'Explains your memories as a narrative story.' },
    { id: 'humorous', name: 'Humorous', desc: 'Cracks jokes and keeps the mood light.' },
  ];

  return (
    <>
      {showLoader && (
        <HorizontalLoader color="bg-cyan-500" duration={2} text="Initializing Profile..." onComplete={() => setShowLoader(false)} />
      )}
      <PageTransition>
        <div className="min-h-screen text-white relative">
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-1 max-w-5xl w-full mx-auto px-6 pt-32 pb-12 flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                  aria-label="Back to Dashboard"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <h1 className="text-4xl font-extrabold tracking-tight">Profile Settings</h1>
              </div>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="text-sm font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                  Edit Profile
                </button>
              ) : (
                <button onClick={saveProfile} className="text-sm font-semibold bg-[#e83445] hover:bg-[#c32230] px-4 py-2 rounded-lg transition-colors shadow-lg shadow-red-500/20">
                  Save Changes
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Column: User Info */}
              <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
                <div className="relative p-8 rounded-[32px] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
                  
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 mb-6 flex items-center justify-center text-2xl font-bold shadow-lg">
                    {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  
                  <div className="flex flex-col gap-5 relative z-10">
                    <div>
                      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1 block">Full Name</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={userProfile.name} 
                          onChange={(e) => handleProfileChange('name', e.target.value)}
                          className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      ) : (
                        <p className="text-lg font-medium">{userProfile.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1 block">Linked Email</label>
                      {isEditing ? (
                        <input 
                          type="email" 
                          value={userProfile.email} 
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      ) : (
                        <p className="text-lg font-medium">{userProfile.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1 block">Purpose of Use</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={userProfile.purpose} 
                          onChange={(e) => handleProfileChange('purpose', e.target.value)}
                          className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      ) : (
                        <p className="text-lg font-medium">{userProfile.purpose}</p>
                      )}
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
                        onClick={() => handlePersonalityChange(p.id)}
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
          <footer className="w-full py-8 text-center text-white/50 border-t border-white/10 backdrop-blur-md bg-black/20 mt-auto">
            <p className="text-sm">
              Need help or want to provide feedback? Contact me at <a href="mailto:helpline@example.com" className="text-white hover:underline font-medium transition-colors">helpline@example.com</a>
            </p>
          </footer>
        </div>
      </div>
    </PageTransition>
    </>
  );
}
