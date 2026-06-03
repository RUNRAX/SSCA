'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, FlaskConical, AlertCircle } from 'lucide-react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { MarkdownRenderer } from '@/components/widgets/MarkdownRenderer';
import { useChat, type ChatMessage } from '@/hooks/useChat';
import { useAuthContext } from '@/components/auth/AuthProvider';

export function AIChatInterface() {
  const { isAuthenticated } = useAuthContext();
  const { messages, sendMessage, isStreaming, error } = useChat();
  const [query, setQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !isAuthenticated || isStreaming) return;

    const currentQuery = query.trim();
    setQuery('');
    await sendMessage(currentQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  /** Determine if a given assistant message is currently being streamed */
  const isMessageStreaming = (msg: ChatMessage, index: number): boolean => {
    if (!isStreaming || msg.role !== 'assistant') return false;
    // The last assistant message in the list is the one being streamed
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') {
        return i === index;
      }
    }
    return false;
  };

  return (
    <GlassPanel
      intensity="heavy"
      className="flex flex-col h-full rounded-3xl overflow-hidden p-6 glass-glow"
      enterAnimation
      style={{
        background: 'rgba(15, 20, 35, 0.05)',
        backdropFilter: 'blur(36px) saturate(2.2)',
        WebkitBackdropFilter: 'blur(36px) saturate(2.2)',
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(0,230,255,0.5)]">
          AI
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-white tracking-tight">
            SSCA Cognitive Engine
          </h2>
          <p className="text-xs text-white/50 font-medium tracking-wider uppercase">
            Secure Vector Search Active
          </p>
        </div>
      </div>

      {/* ── Messages Area ── */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
            <FlaskConical className="w-16 h-16 mb-4 text-white/50" strokeWidth={1} />
            <p className="text-white text-lg font-medium">No active session</p>
            <p className="text-white/60 text-sm mt-1 max-w-[250px]">
              Ask me anything about your past interactions, or tell me something new to remember.
            </p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'user' ? (
                /* ── User Bubble ── */
                <div className="max-w-[80%] p-4 rounded-2xl rounded-br-sm bg-gradient-to-br from-blue-500/80 to-purple-600/80 text-white shadow-lg border border-white/10">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              ) : (
                /* ── Assistant Bubble ── */
                <div className="max-w-[85%] p-4 rounded-2xl rounded-bl-sm bg-white/5 backdrop-blur-md text-white/90 border border-white/10">
                  {msg.content ? (
                    <div className={isMessageStreaming(msg, i) ? 'streaming-cursor' : ''}>
                      <MarkdownRenderer content={msg.content} />
                    </div>
                  ) : isMessageStreaming(msg, i) ? (
                    /* Bouncing dots while waiting for first chunk */
                    <div className="flex space-x-2 items-center h-5">
                      <div
                        className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div className="flex items-center gap-2 mb-3 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Input Form ── */}
      <form onSubmit={handleSubmit} className="relative mt-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask SSCA or store a memory..."
          className="w-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] rounded-2xl py-4 pl-5 pr-14 text-white placeholder-white/30 focus:outline-none focus:border-white/25 focus:shadow-[0_0_30px_hsla(220,90%,65%,0.12),0_0_60px_hsla(270,70%,60%,0.06)] transition-all duration-300"
          style={{
            boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.06), inset 0 -1px 0 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.15)',
          }}
          disabled={isStreaming}
        />
        <button
          type="submit"
          disabled={!query.trim() || isStreaming}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-tr from-cyan-400 to-purple-500 text-white rounded-xl hover:shadow-[0_0_20px_hsla(220,90%,65%,0.3)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </GlassPanel>
  );
}
