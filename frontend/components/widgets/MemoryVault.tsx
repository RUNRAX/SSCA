'use client';

import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { Search, X, Plus, RefreshCw, Download, Trash2, ChevronDown, Brain } from 'lucide-react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassSkeleton } from '@/components/glass/GlassSkeleton';
import { useAuthContext } from '@/components/auth/AuthProvider';
import { useMemories } from '@/hooks/useMemories';

// ---------------------------------------------------------------------------
// Category config
// ---------------------------------------------------------------------------

const CATEGORY_MAP: Record<string, { bg: string; text: string; label: string }> = {
  personal: { bg: 'bg-cyan-500/20', text: 'text-cyan-300', label: 'Personal' },
  work: { bg: 'bg-amber-500/20', text: 'text-amber-300', label: 'Work' },
  ideas: { bg: 'bg-purple-500/20', text: 'text-purple-300', label: 'Ideas' },
  notes: { bg: 'bg-green-500/20', text: 'text-green-300', label: 'Notes' },
  conversation: { bg: 'bg-blue-500/20', text: 'text-blue-300', label: 'Conversation' },
};

const CATEGORY_KEYS = Object.keys(CATEGORY_MAP);

function getCategoryInfo(memory: { metadata?: Record<string, any> }) {
  const type = memory.metadata?.type ?? 'conversation';
  return CATEGORY_MAP[type] ?? CATEGORY_MAP.conversation;
}

function getCategoryKey(memory: { metadata?: Record<string, any> }) {
  const type = memory.metadata?.type ?? 'conversation';
  return CATEGORY_KEYS.includes(type) ? type : 'conversation';
}

// ---------------------------------------------------------------------------
// Dropdown sub-component (portaled) — with blur + entrance animation
// ---------------------------------------------------------------------------

interface DropdownMenuProps {
  coords: { bottom: number; left: number; width: number };
  currentCategory: string;
  onSelect: (key: string) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

function DropdownMenu({ coords, currentCategory, onSelect, menuRef }: DropdownMenuProps) {

  useEffect(() => {
    if (!menuRef.current) return;
    gsap.fromTo(
      menuRef.current,
      { opacity: 0, scale: 0.92, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'back.out(2)' }
    );
  }, []);

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] origin-bottom-left"
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        bottom: coords.bottom,
        left: coords.left,
        width: coords.width,
        background: 'transparent',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.04)',
        overflow: 'hidden',
      }}
    >
      <div className="p-1.5 flex flex-col gap-0.5">
        {CATEGORY_KEYS.map((key) => (
          <button
            key={key}
            onPointerDown={(e) => {
              e.preventDefault();
              onSelect(key);
            }}
            className={`flex items-center gap-2.5 px-3 py-2.5 text-sm text-left rounded-[10px] transition-all duration-150 ${
              currentCategory === key
                ? 'bg-white/10 text-white font-medium'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${CATEGORY_MAP[key].bg.replace('/20', '')} ${
                currentCategory === key ? 'shadow-[0_0_8px_currentColor]' : ''
              }`}
            />
            {CATEGORY_MAP[key].label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MemoryVault() {
  const { isAuthenticated } = useAuthContext();
  const { memories, count, isLoading, createMemory, deleteMemory, refresh } = useMemories();

  // --- Local state ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('conversation');
  const [isCreating, setIsCreating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState({ bottom: 0, left: 0, width: 0 });

  // --- Refs ---
  const addFormRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  // --- Close dropdown on click outside or scroll ---
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const inTrigger = dropdownRef.current?.contains(target);
      const inMenu = dropdownMenuRef.current?.contains(target);
      if (!inTrigger && !inMenu) {
        setIsDropdownOpen(false);
      }
    }
    function handleScroll() {
      setIsDropdownOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true); // Use capture to catch all scroll events
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  // --- Filtered memories ---
  const filteredMemories = useMemo(() => {
    return memories.filter((m) => {
      const matchesSearch =
        !searchQuery || m.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !activeCategory || getCategoryKey(m) === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [memories, searchQuery, activeCategory]);

  // --- Toggle add form ---
  const toggleAddForm = useCallback(() => {
    if (!isAddOpen) {
      setIsAddOpen(true);
      requestAnimationFrame(() => {
        if (addFormRef.current) {
          addFormRef.current.style.overflow = 'hidden';
          gsap.fromTo(
            addFormRef.current,
            { height: 0, opacity: 0 },
            { 
              height: 'auto', 
              opacity: 1, 
              duration: 0.2, 
              ease: 'power3.out',
              onComplete: () => {
                if (addFormRef.current) addFormRef.current.style.overflow = 'visible';
              }
            },
          );
        }
      });
    } else {
      if (addFormRef.current) {
        addFormRef.current.style.overflow = 'hidden';
        gsap.to(addFormRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.15,
          ease: 'power3.in',
          onComplete: () => setIsAddOpen(false),
        });
      } else {
        setIsAddOpen(false);
      }
    }
  }, [isAddOpen]);

  // --- Create memory ---
  const handleCreate = async () => {
    if (!newContent.trim() || isCreating) return;
    setIsCreating(true);
    try {
      await createMemory(newContent.trim(), { type: newCategory });
      setNewContent('');
      setNewCategory('conversation');
      // Collapse form
      if (addFormRef.current) {
        addFormRef.current.style.overflow = 'hidden';
        gsap.to(addFormRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.15,
          ease: 'power3.in',
          onComplete: () => setIsAddOpen(false),
        });
      } else {
        setIsAddOpen(false);
      }
    } catch (err) {
      console.error('Failed to create memory', err);
    } finally {
      setIsCreating(false);
    }
  };

  // --- Export ---
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(memories, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().slice(0, 10);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ssca-memories-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- Category pill click ---
  const handleCategoryClick = (key: string | null) => {
    setActiveCategory((prev) => (prev === key ? null : key));
  };

  return (
    <GlassPanel
      intensity="medium"
      className="glass-glow flex flex-col h-full rounded-3xl p-6 relative"
      style={{
        /* Add a bluish tint to the frosted glass */
        background: 'rgba(20, 50, 120, 0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        overflow: 'visible',
      }}
    >
      {/* ---- Header ---- */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">Memory Vault</h2>
          <p className="text-xs text-white/60 mt-1">
            {count} vector embedded memor{count === 1 ? 'y' : 'ies'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export */}
          <button
            onClick={handleExport}
            disabled={memories.length === 0}
            className="p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 active:scale-90 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Export memories"
          >
            <Download className="w-4 h-4 text-white" />
          </button>

          {/* Refresh */}
          <button
            onClick={refresh}
            className="p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 active:scale-90 transition-all duration-200"
            title="Refresh memories"
          >
            <RefreshCw className={`w-4 h-4 text-white ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* ---- Add Memory Button ---- */}
      <button
        onClick={toggleAddForm}
        className="mb-3 flex items-center gap-2 w-full px-4 py-2.5 bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 text-sm text-white/70 hover:text-white"
      >
        <Plus className="w-4 h-4" />
        <span>Add Memory</span>
        <ChevronDown
          className={`w-4 h-4 ml-auto transition-transform duration-300 ${isAddOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* ---- Add Form (animated) ---- */}
      {isAddOpen && (
        <div ref={addFormRef} className="mb-3" style={{ overflow: 'hidden' }}>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="What would you like to remember?"
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/25 resize-none transition-colors duration-200"
            />
            <div className="flex items-center gap-3">
              {/* Custom Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setDropdownCoords({
                      bottom: window.innerHeight - rect.top + 8, // 8px spacing
                      left: rect.left,
                      width: Math.max(176, rect.width) // w-44 is 176px
                    });
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-white/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-all duration-200"
                >
                  <span className={`w-2 h-2 rounded-full ${CATEGORY_MAP[newCategory].bg.replace('/20', '')} shadow-[0_0_8px_currentColor]`} />
                  {CATEGORY_MAP[newCategory].label}
                  <ChevronDown className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && typeof document !== 'undefined' && createPortal(
                  <DropdownMenu
                    coords={dropdownCoords}
                    currentCategory={newCategory}
                    menuRef={dropdownMenuRef}
                    onSelect={(key) => {
                      setNewCategory(key);
                      setIsDropdownOpen(false);
                    }}
                  />,
                  document.body
                )}
              </div>

              <button
                onClick={handleCreate}
                disabled={!newContent.trim() || isCreating}
                className="ml-auto px-5 py-2.5 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 rounded-xl text-sm font-medium text-white transition-all duration-200 disabled:opacity-30 disabled:active:scale-100 disabled:cursor-not-allowed"
              >
                {isCreating ? 'Saving…' : 'Save Memory'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Search ---- */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search memories…"
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/25"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ---- Category Filter Pills ---- */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
        {/* All pill */}
        <button
          onClick={() => handleCategoryClick(null)}
          className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
            activeCategory === null
              ? 'bg-white/15 text-white border-white/25'
              : 'bg-white/5 text-white/50 border-white/8 hover:bg-white/10 hover:text-white/70'
          }`}
        >
          All
        </button>
        {CATEGORY_KEYS.map((key) => {
          const cat = CATEGORY_MAP[key];
          const isActive = activeCategory === key;
          return (
            <button
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                isActive
                  ? `${cat.bg} ${cat.text} border-white/20`
                  : 'bg-white/5 text-white/50 border-white/8 hover:bg-white/10 hover:text-white/70'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ---- Memory List ---- */}
      <div className={`flex-1 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth space-y-3 ${filteredMemories.length > 0 ? 'overflow-y-auto' : 'overflow-hidden'}`}>
        {isLoading && memories.length === 0 ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <GlassSkeleton key={i} className="w-full h-28" intensity="light" />
            ))}
          </div>
        ) : filteredMemories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 opacity-60">
            <Brain className="w-12 h-12 text-white/30 mb-3" />
            <p className="text-white text-sm font-medium">No memories found</p>
            <p className="text-xs text-white/40 mt-1">
              {memories.length === 0
                ? 'Chat with the AI or add one manually.'
                : 'Try adjusting your search or filters.'}
            </p>
          </div>
        ) : (
          filteredMemories.map((memory) => {
            const cat = getCategoryInfo(memory);
            return (
              <div
                key={memory.id}
                className="group relative bg-white/5 hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/15 transition-all rounded-xl p-4"
              >
                {/* Category badge */}
                <span
                  className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider mb-2 ${cat.bg} ${cat.text}`}
                >
                  {cat.label}
                </span>

                <p className="text-white/90 text-sm leading-relaxed pr-8">{memory.content}</p>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-[10px] text-white/40 font-mono tracking-wider">
                    {memory.created_at
                      ? new Date(memory.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : '—'}
                  </span>
                </div>

                {/* Delete */}
                <button
                  onClick={() => deleteMemory(memory.id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-lg transition-all"
                  title="Delete memory"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </GlassPanel>
  );
}
