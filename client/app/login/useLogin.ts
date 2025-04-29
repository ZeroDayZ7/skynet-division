/**
 * Hook for handling login API calls with loading and error states.
 * @module hooks/useLogin
 */

import { useState } from 'react';
import { login } from '@/lib/api/auth';
import { LoginSchema } from '@/lib/schemas/auth/loginSchema';
import type { User } from '@/types/auth/index';

interface LoginState {
  login: (credentials: LoginSchema, csrfToken: string) => Promise<{ user: User }>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Manages login API calls with state handling.
 * @returns Login function and state.
 */
export function useLogin(): LoginState {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginFn = async (credentials: LoginSchema, csrfToken: string) => {
    setIsLoading(true);
    setError(null);

    try {
      return await login(credentials, csrfToken);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login: loginFn, isLoading, error };
}