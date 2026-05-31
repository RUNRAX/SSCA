import { useState, useCallback, useEffect } from 'react';
import { apiFetch } from '../lib/api';
import { Memory, MemoryListResponse, MemoryCreateRequest } from '../lib/types';
import { useAuthContext } from '../components/auth/AuthProvider';

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuthContext();

  const fetchMemories = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const data = await apiFetch<MemoryListResponse>('/api/v1/memories/');
      setMemories(data.memories);
      setCount(data.count);
    } catch (error) {
      console.error("Failed to fetch memories", error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const createMemory = async (content: string, metadata?: Record<string, any>) => {
    // Optimistic update
    const tempId = 'temp-' + Math.random().toString(36).substring(7);
    const newMemory: Memory = {
      id: tempId,
      content,
      metadata: metadata || {},
      created_at: new Date().toISOString()
    };
    
    setMemories(prev => [newMemory, ...prev]);
    setCount(c => c + 1);

    try {
      const created = await apiFetch<Memory>('/api/v1/memories/', {
        method: 'POST',
        body: JSON.stringify({ content, metadata } as MemoryCreateRequest)
      });
      
      // Replace temp with real
      setMemories(prev => prev.map(m => m.id === tempId ? created : m));
    } catch (error) {
      // Revert on error
      setMemories(prev => prev.filter(m => m.id !== tempId));
      setCount(c => c - 1);
      throw error;
    }
  };

  const deleteMemory = async (id: string) => {
    // Optimistic update
    const previousMemories = [...memories];
    setMemories(prev => prev.filter(m => m.id !== id));
    setCount(c => Math.max(0, c - 1));

    try {
      await apiFetch(`/api/v1/memories/${id}`, { method: 'DELETE' });
    } catch (error) {
      // Revert on error
      setMemories(previousMemories);
      setCount(previousMemories.length);
      throw error;
    }
  };

  return {
    memories,
    count,
    isLoading,
    createMemory,
    deleteMemory,
    refresh: fetchMemories
  };
}
