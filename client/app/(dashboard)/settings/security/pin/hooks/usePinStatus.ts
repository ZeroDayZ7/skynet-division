// components/settings/security/pin/hooks/usePinStatus.ts
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchClient } from '@/lib/axiosClient';

export function usePinStatus() {
  const [isPinSet, setIsPinSet] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPinStatus = async () => {
    try {
      setLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetchClient.get('/api/settings/two-factor');
      setIsPinSet(response.data.isPinSet);
    } catch (error) {
      console.error('Błąd pobierania statusu PIN:', error);
      toast.error('Błąd podczas sprawdzania statusu PIN');
      setIsPinSet(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPinStatus();
  }, []);

  return { isPinSet, loading, setIsPinSet, refetch: fetchPinStatus};
}