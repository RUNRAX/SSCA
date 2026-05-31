import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../lib/api';
import { LoginRequest, SignUpRequest, AuthResponse, UserResponse } from '../lib/types';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = useCallback(async () => {
    const storedToken = localStorage.getItem('ssca_token');
    if (storedToken) {
      try {
        const user = await apiFetch<UserResponse>('/auth/me');
        setIsAuthenticated(true);
        setUserId(user.user_id);
        setToken(storedToken);
      } catch (error) {
        // Token invalid or expired
        localStorage.removeItem('ssca_token');
        setIsAuthenticated(false);
        setUserId(null);
        setToken(null);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await apiFetch<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      localStorage.setItem('ssca_token', response.access_token);
      setIsAuthenticated(true);
      setUserId(response.user_id);
      setToken(response.access_token);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignUpRequest) => {
    setIsLoading(true);
    try {
      const response = await apiFetch<AuthResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      localStorage.setItem('ssca_token', response.access_token);
      setIsAuthenticated(true);
      setUserId(response.user_id);
      setToken(response.access_token);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ssca_token');
    setIsAuthenticated(false);
    setUserId(null);
    setToken(null);
  };

  return {
    isAuthenticated,
    userId,
    token,
    isLoading,
    login,
    signup,
    logout,
  };
}
