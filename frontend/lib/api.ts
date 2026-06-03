const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function getApiUrl(path: string) {
  let base = API_BASE.replace(/\/$/, '');
  if (base.endsWith('/api/v1') && path.startsWith('/api/v1')) {
    base = base.slice(0, -7);
  }
  return `${base}${path}`;
}
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('ssca_token') : null;
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(getApiUrl(path), {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorDetail = response.statusText;
    try {
      const errorData = await response.json();
      if (errorData.detail) errorDetail = errorData.detail;
    } catch (e) {
      // Ignore parsing error
    }
    throw new ApiError(response.status, errorDetail);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
