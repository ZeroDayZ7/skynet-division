import { useState } from 'react';
import { LoginSchema } from './useLoginForm';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Funkcja logowania
  const login = async (values: LoginSchema, token: string) => {
    if (!token) {
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
          'X-CSRF-Token': token,  // Używamy przekazanego tokenu CSRF
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Nieprawidłowy email lub hasło');
      }

      const data = await response.json();
      console.log('Dane użytkownika po zalogowaniu:', data);
      return data;  // Zwracamy dane użytkownika (np. token JWT, dane użytkownika)

    } catch (error: any) {
      setError(error.message || 'Błąd podczas logowania');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
