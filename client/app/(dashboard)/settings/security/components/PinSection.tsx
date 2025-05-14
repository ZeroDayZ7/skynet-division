'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';

interface PinSectionProps {
  isPinSet: boolean | null;
  loading: boolean;
  onClick: () => void;
}

export default function PinSection({ isPinSet, loading, onClick }: PinSectionProps) {
  const renderButton = () => {
    if (loading) {
      return (
        <Button variant="outline" disabled>
          <Loader />
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
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <Label htmlFor="pin">Kod PIN</Label>
        <p className="text-muted-foreground text-sm">
          Dodaj lub zmień dodatkową warstwę zabezpieczeń
        </p>
      </div>
      {renderButton()}
    </div>
  );
}
