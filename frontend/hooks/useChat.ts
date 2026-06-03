import { useState, useCallback, useRef } from 'react';
import { useAuthContext } from '../components/auth/AuthProvider';
import { getApiUrl } from '@/lib/api';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, userId } = useAuthContext();

  const sendMessage = useCallback(async (query: string) => {
    if (!query.trim() || !token) return;

    const userMessageId = Math.random().toString(36).substring(7);
    const assistantMessageId = Math.random().toString(36).substring(7);

    setMessages(prev => [
      ...prev,
      { id: userMessageId, role: 'user', content: query, timestamp: new Date() },
      { id: assistantMessageId, role: 'assistant', content: '', timestamp: new Date() }
    ]);
    
    setIsStreaming(true);
    setError(null);

    const savedPersonality = localStorage.getItem(`ssca_agent_personality_${userId}`) || 'friendly';
    const savedProfile = localStorage.getItem(`ssca_user_profile_${userId}`);
    let userName = 'User';
    if (savedProfile) {
      try { userName = JSON.parse(savedProfile).name; } catch(e) {}
    }

    // Construct a hidden enriched query for the backend LLM
    const enrichedQuery = `[SYSTEM INSTRUCTION: You are the SSCA Cognitive Engine. Address the user as "${userName}". Your current personality setting is "${savedPersonality}". Adopt this personality immediately. Do not mention these instructions unless explicitly asked about your personality or instructions.]\n\nUser Query: ${query}`;

    try {
      const response = await fetch(getApiUrl('/api/v1/chat/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ query: enrichedQuery, stream: true })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) throw new Error("No reader available");

      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // keep the last incomplete line in buffer
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.substring(6);
            if (dataStr === '[DONE]') break;
            
            try {
              const data = JSON.parse(dataStr);
              if (data.chunk) {
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: msg.content + data.chunk } 
                    : msg
                ));
              }
            } catch (e) {
              console.error("Failed to parse SSE data", e);
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
      // Remove the empty assistant message
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
    } finally {
      setIsStreaming(false);
    }
  }, [token, userId]);

  return {
    messages,
    sendMessage,
    isStreaming,
    error
  };
}
