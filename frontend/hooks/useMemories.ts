import useSWR from 'swr';
import { apiFetch } from '../lib/api';
import { Memory, MemoryListResponse, MemoryCreateRequest } from '../lib/types';
import { useAuthContext } from '../components/auth/AuthProvider';

export function useMemories() {
  const { isAuthenticated } = useAuthContext();

  const fetcher = async (url: string) => {
    if (!isAuthenticated) return { memories: [], count: 0 };
    return apiFetch<MemoryListResponse>(url);
  };

  // SWR handles caching, stale-while-revalidate, and background syncing
  const { data, error, mutate, isLoading } = useSWR<MemoryListResponse>(
    isAuthenticated ? '/api/v1/memories/' : null,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 2000,
      fallbackData: { memories: [], count: 0 }
    }
  );

  const memories = data?.memories || [];
  const count = data?.count || 0;

  const createMemory = async (content: string, metadata?: Record<string, any>) => {
    const tempId = 'temp-' + Math.random().toString(36).substring(7);
    const newMemory: Memory = {
      id: tempId,
      content,
      metadata: metadata || {},
      created_at: new Date().toISOString()
    };
    
    // Optimistic UI update instantly shows the new memory
    mutate(
      { memories: [newMemory, ...memories], count: count + 1 },
      false // Do not immediately revalidate from server
    );

    try {
      const created = await apiFetch<Memory>('/api/v1/memories/', {
        method: 'POST',
        body: JSON.stringify({ content, metadata } as MemoryCreateRequest)
      });
      
      // Update with the actual server-assigned ID and timestamp
      mutate();
    } catch (err) {
      // Revert optimism if request fails
      mutate();
      throw err;
    }
  };

  const deleteMemory = async (id: string) => {
    // Optimistic delete
    mutate(
      { memories: memories.filter(m => m.id !== id), count: Math.max(0, count - 1) },
      false
    );

    try {
      await apiFetch(`/api/v1/memories/${id}`, { method: 'DELETE' });
      mutate(); // Sync with server
    } catch (err) {
      // Revert optimism
      mutate();
      throw err;
    }
  };

  return {
    memories,
    count,
    isLoading: isLoading && isAuthenticated,
    createMemory,
    deleteMemory,
    refresh: () => mutate()
  };
}
