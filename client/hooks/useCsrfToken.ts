// hooks/useCsrfToken.ts
import { useQuery } from '@tanstack/react-query';

interface CsrfTokenResponse {
  csrfToken: string;
}

export function useCsrfToken() {
  return useQuery<CsrfTokenResponse, Error>({
    queryKey: ['csrfToken'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/csrf-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Nie udało się pobrać tokenu CSRF');
      }

      return response.json();
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // Token ważny przez 5 minut
  });
}