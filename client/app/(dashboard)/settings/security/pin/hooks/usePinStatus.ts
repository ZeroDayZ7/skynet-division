import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchClient } from '@/lib/axiosClient';

interface PinStatus {
  isPinSet: boolean;
  isTwoFactorEnabled: boolean;
}

export function usePinStatus() {
  const [status, setStatus] = useState<PinStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPinStatus = async () => {
    try {
      setLoading(true);
      const response = await fetchClient.get('/api/settings/two-factor');
      setStatus(response.data);
    } catch (error) {
      console.error('Błąd pobierania statusu PIN i 2FA:', error);
      toast.error('Błąd podczas sprawdzania statusu zabezpieczeń');
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const updateTwoFactorSetting = async (enabled: boolean) => {
    try {
      await fetchClient.post('/api/settings/two-factor', { enabled });
      setStatus((prev) => (prev ? { ...prev, isTwoFactorEnabled: enabled } : null));
    } catch (error) {
      console.error('Błąd aktualizacji 2FA:', error);
    }
  };

  useEffect(() => {
    fetchPinStatus();
  }, []);

  return {
    isPinSet: status?.isPinSet ?? null,
    isTwoFactorEnabled: status?.isTwoFactorEnabled ?? false,
    loading,
    refetch: fetchPinStatus,
    setIsPinSet: (value: boolean) =>
      setStatus((prev) => (prev ? { ...prev, isPinSet: value } : null)),

    // Ta funkcja aktualizuje bazę danych!
    setIsTwoFactorEnabled: updateTwoFactorSetting,
  };
}
