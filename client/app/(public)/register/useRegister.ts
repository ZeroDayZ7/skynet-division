/**
 * Hook do obsługi wywołań API rejestracji z zarządzaniem stanem ładowania i błędów.
 * @module hooks/useRegister
 */

import { useState } from 'react';
import { register } from '@/lib/api/auth';
import { RegisterSchema } from '@/lib/schemas/auth';

interface RegisterState {
  register: (credentials: Pick<RegisterSchema, 'email' | 'password'>, csrfToken: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Zarządza wywołaniami API rejestracji z obsługą stanu.
 * @returns Funkcja rejestracji oraz stan.
 */
export function useRegister(): RegisterState {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerFn = async (credentials: Pick<RegisterSchema, 'email' | 'password'>, csrfToken: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await register(credentials, csrfToken);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register: registerFn, isLoading, error };
}