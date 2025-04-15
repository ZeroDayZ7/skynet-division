// components/settings/security/pin/hooks/usePinStatus.ts
import { useQuery } from '@tanstack/react-query';
import { getCsrfToken } from '@/lib/getCsrfToken';

interface PinStatusResponse {
  isPinSet: boolean;
}

export function usePinStatus() {
  const { data, isLoading, error, refetch } = useQuery<PinStatusResponse, Error>({
    queryKey: ['pinStatus'],
    queryFn: async () => {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        throw new Error('Brak tokenu CSRF');
      }
      const response = await fetch('http://localhost:3001/api/users/pin-status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        credentials: 'include',
        
      });

      if (!response.ok) {
        throw new Error('Nie udało się sprawdzić statusu PIN');
      }

      return response.json() as Promise<PinStatusResponse>;
    },
    // Opcje dodatkowe
    retry: 2, // Ponawiaj 2 razy w razie błędu
    staleTime: 1000 * 60, // Dane świeże przez 1 minutę
  });

  return {
    isPinSet: data?.isPinSet ?? null,
    loading: isLoading,
    error,
    refetch,
  };
}