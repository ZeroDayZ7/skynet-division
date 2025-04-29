/**
 * Custom hook for managing CSRF token state and retrieval.
 * @module hooks/useCsrfToken
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchCsrfToken } from '@/lib/csrf';

interface CsrfTokenState {
  csrfToken: string | null;
  isLoading: boolean;
  error: string | null;
  refreshToken: () => Promise<void>;
}

/**
 * Manages CSRF token fetching with loading and error states.
 * @param autoFetch - Whether to fetch the token automatically on mount (default: true).
 * @returns Object containing token, loading state, error, and refresh function.
 */
export function useCsrfToken({ autoFetch = true } = {}): CsrfTokenState {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadToken = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await fetchCsrfToken();
      console.log(`[useCsrfToken]: ${token}`);
      setCsrfToken(token);
    } catch (err: any) {
      setError(err.message);
      setCsrfToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      loadToken();
    } else {
      setIsLoading(false); // Prevent indefinite loading if not fetching
    }
  }, [loadToken, autoFetch]);

  const refreshToken = useCallback(async () => {
    await loadToken();
  }, [loadToken]);

  return { csrfToken, isLoading, error, refreshToken };
}