'use client';

import { useState } from 'react';
import { LoginSchema } from './useLoginForm.tsx';
import { fetchCsrfToken } from '@/lib/csrf';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>('');

  // Pobierz token CSRF przy pierwszym renderowaniu
  const fetchCsrf = async () => {
    try {
      const token = await fetchCsrfToken();
      setCsrfToken(token);
    } catch (err) {
      setError('Nie udało się pobrać tokenu CSRF');
      console.error('Failed to fetch CSRF token:', err);
    }
  };

  // Funkcja logowania
  const login = async (values: LoginSchema) => {
    if (!csrfToken) {
      setError('Brak tokenu CSRF');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Nieprawidłowy email lub hasło');
      }

      const data = await response.json();
      return data; // Możesz zwrócić token JWT lub inne dane
    } catch (error: any) {
      setError(error.message || 'Błąd podczas logowania');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, fetchCsrf, isLoading, error, csrfToken };
}