'use client';

import React, { useState, useEffect } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { useAuth } from '@/hooks/useAuth';

interface Memory {
  id: string;
  content: string;
  metadata?: any;
  created_at: string;
}

export function MemoryVault() {
  const { token, isAuthenticated } = useAuth();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMemories = async () => {
    if (!isAuthenticated || !token) {
        setIsLoading(false);
        return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/memories`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch memories');
      const data = await res.json();
      setMemories(data.memories || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, [isAuthenticated, token]);

  const handleDelete = async (id: string) => {
    if (!isAuthenticated || !token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/memories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete memory');
      setMemories(memories.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting memory');
    }
  };

  return (
    <GlassPanel intensity="medium" className="flex flex-col h-full rounded-3xl overflow-hidden p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">Memory Vault</h2>
          <p className="text-xs text-white/60 mt-1">Vector embedded knowledge</p>
        </div>
        <div className="p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-colors" onClick={fetchMemories}>
          <svg className={`w-5 h-5 text-white ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
        {isLoading && memories.length === 0 ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-400 text-sm p-4 bg-red-900/20 rounded-xl border border-red-500/30">
            {error}
          </div>
        ) : memories.length === 0 ? (
          <div className="text-center py-10 opacity-50">
            <svg className="w-12 h-12 mx-auto mb-3 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-white text-sm">No memories found.</p>
            <p className="text-xs text-white/60 mt-1">Chat with the AI to store insights.</p>
          </div>
        ) : (
          memories.map((memory) => (
            <div key={memory.id} className="group relative bg-black/20 hover:bg-black/40 border border-white/10 hover:border-white/20 transition-all rounded-xl p-4">
              <p className="text-white/90 text-sm leading-relaxed pr-8">{memory.content}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-[10px] text-white/40 font-mono tracking-wider">
                  {new Date(memory.created_at).toLocaleDateString()}
                </span>
              </div>
              <button 
                onClick={() => handleDelete(memory.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-lg transition-all"
                title="Delete memory"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </GlassPanel>
  );
}
