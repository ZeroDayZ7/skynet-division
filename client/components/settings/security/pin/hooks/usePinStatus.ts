// components/settings/security/pin/hooks/usePinStatus.ts
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function usePinStatus() {
  const [isPinSet, setIsPinSet] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPinStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/users/pin-status', {
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

        const data = await response.json();
        setIsPinSet(data.isPinSet);
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

  return { isPinSet, loading, setIsPinSet }; // Dodajemy setIsPinSet do aktualizacji
}