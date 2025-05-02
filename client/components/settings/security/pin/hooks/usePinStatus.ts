// components/settings/security/pin/hooks/usePinStatus.ts
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchClient } from '@/lib/axiosClient';
import { fetchCsrfToken } from '@/lib/csrf';

export function usePinStatus() {
  const [isPinSet, setIsPinSet] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPinStatus = async () => {
      try {
        setLoading(true);

        const csrfToken = await fetchCsrfToken();

        const response = await fetchClient.get('/api/users/pin-status', {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        });

        setIsPinSet(response.data.isPinSet);
      } catch (error) {
        console.error('Błąd pobierania statusu PIN:', error);
        toast.error('Błąd podczas sprawdzania statusu PIN');
        setIsPinSet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPinStatus();
  }, []);

  return { isPinSet, loading, setIsPinSet };
}
