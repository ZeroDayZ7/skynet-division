import { useState } from 'react';
import { LoginSchema } from './useLoginForm';
import { fetchClient } from '@/lib/fetchClient'; // zakładam, że tu umieścisz funkcję
const LOGIN_ENDPOINT = '/api/auth/login';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (values: LoginSchema, token: string) => {
    if (!token) {
      setError('Brak tokenu CSRF');
      console.error('Brak tokenu CSRF');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchClient(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
          'X-CSRF-Token': token,
        },
        body: JSON.stringify(values),
      });

      // console.log('Dane użytkownika po zalogowaniu:', response);
      return response;
    } catch (error: any) {
      setError(error.message || 'Błąd podczas logowania');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
