// components/settings/security/pin/PinButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PinButtonProps {
  onClick: (isPinSet: boolean) => void;
}

export default function PinButton({ onClick }: PinButtonProps) {
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
      <Button
        variant="outline"
        disabled
        className="dark:hover:text-green-500"
        aria-label="Błąd ładowania PIN-u"
      >
        Błąd ładowania
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => onClick(isPinSet)}
      className="dark:hover:text-green-500"
      aria-label={isPinSet ? 'Zmień kod PIN' : 'Ustaw kod PIN'}
    >
      {isPinSet ? 'Zmień PIN' : 'Ustaw PIN'}
    </Button>
  );
}