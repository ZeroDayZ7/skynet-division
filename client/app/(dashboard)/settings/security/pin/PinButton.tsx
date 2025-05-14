// components/settings/security/pin/PinButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PinButtonProps {
  isPinSet: boolean | null;
  loading: boolean;
  onClick: () => void;
}

export default function PinButton({ isPinSet, loading, onClick }: PinButtonProps) {
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
      <Button variant="outline" disabled aria-label="Błąd ładowania PIN-u">
        Błąd ładowania
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={onClick}
      aria-label={isPinSet ? 'Zmień kod PIN' : 'Ustaw kod PIN'}
    >
      {isPinSet ? 'Zmień PIN' : 'Ustaw PIN'}
    </Button>
  );
}