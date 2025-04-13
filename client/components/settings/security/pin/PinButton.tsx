'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PinButton({ onClick }: { onClick: () => void }) {
  const [isPinSet, setIsPinSet] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPinStatus = async () => {
      try {
        setLoading(true);

        // Czekaj przynajmniej 1 sekundę
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        const request = fetch('/api/users/pin-status', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        const [response] = await Promise.all([request, delay]);

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

  if (loading) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Ładowanie...
      </Button>
    );
  }

  if (isPinSet === null) {
    return (
      <Button variant="outline" disabled className="dark:hover:text-green-500">
        Błąd ładowania
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="dark:hover:text-green-500"
      aria-label={isPinSet ? 'Zmień kod PIN' : 'Ustaw kod PIN'}
    >
      {isPinSet ? 'Zmień PIN' : 'Ustaw PIN'}
    </Button>
  );
}
