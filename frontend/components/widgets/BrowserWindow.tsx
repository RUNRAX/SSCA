'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { useChat } from '@/hooks/useChat';
import { ChevronLeft, ChevronRight, RotateCw, Plus, Send } from 'lucide-react';
import gsap from 'gsap';

export function BrowserWindow() {
  const { messages, sendMessage, isStreaming } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
    
    // Animate new messages sliding up
    if (messagesContainerRef.current && messages.length > 0) {
      const lastMessage = messagesContainerRef.current.lastElementChild?.previousElementSibling; // previous is the actual message, last is the scroll ref
      if (lastMessage) {
        gsap.fromTo(lastMessage, 
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
        );
      }
    }
  }, [messages.length]);

  useEffect(() => {
    if (isStreaming) {
      gsap.to(".typing-dot", {
        y: -5,
        duration: 0.4,
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, [isStreaming]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <GlassPanel intensity="medium" hoverGlow className="w-full max-w-[800px] h-[500px] flex flex-col overflow-hidden relative" bobAnimation>
      {/* Title Bar */}
      <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 shrink-0">
        <div className="flex gap-2 group">
          <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer hover:scale-110 transition-transform" />
          <div className="w-3 h-3 rounded-full bg-yellow-400 cursor-pointer hover:scale-110 transition-transform" />
          <div className="w-3 h-3 rounded-full bg-green-400 cursor-pointer hover:scale-110 transition-transform" />
        </div>
        <div className="ml-6 flex items-center gap-4">
          <div className="flex items-center gap-2 text-white/50">
            <ChevronLeft className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
            <ChevronRight className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
            <RotateCw className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer ml-1" />
          </div>
          <div className="bg-black/20 border border-white/10 rounded-md px-3 py-1 flex items-center min-w-[300px] hover:border-white/30 transition-colors cursor-text">
            <span className="text-xs text-white/70 font-medium">https://mockflow.com</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-white/10 bg-white/5 p-4 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-md text-sm font-medium transition-colors text-left group">
              <div className="w-6 h-6 rounded bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center">
                <Plus className="w-3.5 h-3.5" />
              </div>
              New Tab
            </button>
            <button className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-md text-sm font-medium transition-colors text-left group">
              <div className="w-6 h-6 rounded bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              Browse Private
            </button>
          </div>
          
          <div>
            <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-wider mb-3 pl-1">Bookmarks</h4>
            <div className="flex flex-col gap-1">
              <button className="text-sm text-white/80 hover:text-white hover:bg-white/10 py-1.5 px-2 rounded-md transition-colors text-left">Astro Reading List</button>
              <button className="text-sm text-white/80 hover:text-white hover:bg-white/10 py-1.5 px-2 rounded-md transition-colors text-left">Design Inspiration</button>
            </div>
          </div>
        </div>

        {/* Main Content - Chat */}
        <div className="flex-1 flex flex-col relative bg-black/10">
          
          {/* Chat Messages */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 hide-scrollbar">
            <div ref={messagesContainerRef} className="flex flex-col gap-4 min-h-full">
              {messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-xl font-bold mb-2">Welcome to SSCA</h2>
                    <p className="text-sm text-white/50 leading-relaxed">
                      I have access to your Memory Vault. Ask me anything about your past interactions or general knowledge.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[var(--color-accent-teal)] text-[var(--color-bg-base)] font-medium rounded-tr-sm' 
                        : 'bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-tl-sm shadow-md'
                    }`}>
                      {msg.content}
                      {msg.role === 'assistant' && isStreaming && i === messages.length - 1 && (
                        <span className="inline-flex items-center gap-1 ml-2">
                          <span className="w-1.5 h-1.5 bg-white/70 rounded-full typing-dot" />
                          <span className="w-1.5 h-1.5 bg-white/70 rounded-full typing-dot" />
                          <span className="w-1.5 h-1.5 bg-white/70 rounded-full typing-dot" />
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <form onSubmit={handleSubmit} className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message SSCA..."
                disabled={isStreaming}
                className="w-full bg-white/10 border border-white/20 rounded-full pl-5 pr-12 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--color-accent-teal)] transition-all disabled:opacity-50 hover:bg-white/15"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--color-accent-teal)] flex items-center justify-center disabled:opacity-50 disabled:bg-white/20 transition-all hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4 text-[var(--color-bg-base)]" />
              </button>
            </form>
          </div>

          {/* Context Dialog Overlay */}
          {messages.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <GlassPanel intensity="heavy" className="p-6 w-72 pointer-events-auto shadow-2xl animate-in zoom-in-95 fade-in duration-500 delay-300 fill-mode-both">
                <p className="text-sm font-medium leading-relaxed mb-6 text-center text-white/90">
                  Explore new tools that will let your apps flourish.
                </p>
                <div className="flex justify-between gap-3">
                  <button className="flex-1 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-semibold transition-all border border-white/10">
                    Cancel
                  </button>
                  <button className="flex-1 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 active:scale-95 text-xs font-semibold transition-all text-white shadow-lg shadow-blue-500/20">
                    Accept
                  </button>
                </div>
              </GlassPanel>
            </div>
          )}

        </div>
      </div>
    </GlassPanel>
  );
}
