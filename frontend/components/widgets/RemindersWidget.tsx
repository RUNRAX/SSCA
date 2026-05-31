'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { useMemories } from '@/hooks/useMemories';
import { REMINDERS_DEFAULT } from '@/lib/constants';
import { Check, Plus } from 'lucide-react';
import gsap from 'gsap';

export function RemindersWidget() {
  const { memories, count, deleteMemory, createMemory } = useMemories();
  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState('');
  const addFormRef = useRef<HTMLFormElement>(null);

  // Map API memories or fallback to defaults if none exist
  const displayItems = memories.length > 0 
    ? memories.slice(0, 4).map(m => ({ id: m.id, text: m.content, checked: false, isReal: true }))
    : REMINDERS_DEFAULT.map(r => ({ ...r, isReal: false }));

  const displayCount = memories.length > 0 ? count : 3;

  useEffect(() => {
    if (isAdding && addFormRef.current) {
      gsap.fromTo(addFormRef.current, 
        { opacity: 0, y: -10, height: 0 },
        { opacity: 1, y: 0, height: 'auto', duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  }, [isAdding]);

  const handleCheck = async (e: React.MouseEvent, id: string, isReal: boolean) => {
    const btn = e.currentTarget;
    const itemContainer = btn.closest('.reminder-item');
    const checkIcon = btn.querySelector('.check-icon');
    
    // Draw check mark animation (scale and rotate slightly)
    gsap.fromTo(checkIcon, 
      { scale: 0.5, opacity: 0, rotation: -45 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.3, ease: "back.out(2)" }
    );
    
    if (itemContainer) {
      // Slide left and fade dismiss
      gsap.to(itemContainer, { 
        opacity: 0, 
        x: -40,
        height: 0, 
        marginTop: 0, 
        marginBottom: 0, 
        duration: 0.4, 
        delay: 0.4, 
        ease: "power2.inOut",
        onComplete: async () => {
          if (isReal) {
            await deleteMemory(id);
          }
        }
      });
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    
    await createMemory(newText, { type: 'reminder' });
    setNewText('');
    setIsAdding(false);
  };

  return (
    <GlassPanel intensity="medium" hoverGlow scaleOnHover className="p-5 w-[260px] flex flex-col min-h-[220px]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold tracking-tight text-white/90">Reminders</h2>
        <span className="text-xl font-bold text-white">{displayCount}</span>
      </div>

      <div className="flex flex-col gap-3 flex-1 overflow-hidden">
        {displayItems.map((item) => (
          <div key={item.id} className="reminder-item flex items-start gap-3 group">
            <button 
              onClick={(e) => handleCheck(e, item.id, item.isReal)}
              className="w-5 h-5 rounded-full border border-white/30 shrink-0 mt-0.5 flex items-center justify-center group-hover:border-white/60 transition-colors bg-black/10"
            >
              <Check className="check-icon w-3 h-3 text-[var(--color-accent-teal)] scale-0 opacity-0" strokeWidth={3} />
            </button>
            <p className="text-sm font-medium text-white/80 leading-snug line-clamp-2 transition-colors group-hover:text-white">
              {item.text}
            </p>
          </div>
        ))}
        
        {displayItems.length === 0 && !isAdding && (
          <p className="text-sm text-white/40 italic text-center mt-4">All done!</p>
        )}
      </div>

      {isAdding ? (
        <form ref={addFormRef} onSubmit={handleAdd} className="mt-4 pt-3 border-t border-white/10 overflow-hidden">
          <input 
            type="text" 
            autoFocus
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onBlur={() => { if (!newText) setIsAdding(false) }}
            placeholder="New reminder..."
            className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-white/30"
          />
        </form>
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-white/50 hover:text-[var(--color-accent-teal)] transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add List
        </button>
      )}
    </GlassPanel>
  );
}
