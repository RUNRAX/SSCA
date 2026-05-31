export interface SignUpRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user_id: string;
}

export interface UserResponse {
  user_id: string;
}

export interface ChatRequest {
  query: string;
  top_k?: number;
  threshold?: number;
  store_interaction?: boolean;
  stream?: boolean;
}

export interface ChatResponse {
  response: string;
  query: string;
  user_id: string;
}

export interface MemoryCreateRequest {
  content: string;
  metadata?: Record<string, any>;
}

export interface Memory {
  id: string;
  content: string;
  metadata: Record<string, any>;
  created_at?: string;
  similarity?: number;
}

export interface MemoryListResponse {
  memories: Memory[];
  count: number;
}
