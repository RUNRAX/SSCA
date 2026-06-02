'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { useAuth } from '@/hooks/useAuth';

export function AIChatInterface() {
  const { token, isAuthenticated } = useAuth();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !isAuthenticated || !token) return;

    const userMessage = query.trim();
    setQuery('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: userMessage,
          stream: false,
          store_interaction: true,
        }),
      });

      if (!res.ok) throw new Error('Chat request failed');

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', content: data.response }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'ai', content: "Sorry, I encountered an error connecting to my memory vault." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassPanel intensity="heavy" className="flex flex-col h-full rounded-3xl overflow-hidden p-6" enterAnimation>
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(0,230,255,0.5)]">
          AI
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-white tracking-tight">SSCA Cognitive Engine</h2>
          <p className="text-xs text-white/50 font-medium tracking-wider uppercase">Secure Vector Search Active</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
            <svg className="w-16 h-16 mb-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <p className="text-white text-lg font-medium">No active session</p>
            <p className="text-white/60 text-sm mt-1 max-w-[250px]">Ask me anything about your past interactions, or tell me something new to remember.</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-blue-500/80 to-purple-600/80 text-white rounded-br-sm shadow-lg border border-white/10' 
                    : 'bg-white/10 backdrop-blur-md text-white/90 rounded-bl-sm border border-white/20'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl rounded-bl-sm border border-white/20">
              <div className="flex space-x-2 items-center h-5">
                <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="relative mt-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask SSCA or store a memory..."
          className="w-full bg-black/20 border border-white/20 rounded-2xl py-4 pl-5 pr-14 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors shadow-inner"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-white text-black rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </form>
    </GlassPanel>
  );
}
