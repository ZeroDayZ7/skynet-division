// Głupi komponent
import { Button } from '@/components/ui/button';

interface PinButtonProps {
  onClick: (pinStatus: boolean) => void;
  isPinSet: boolean;
}

export function PinButton({ onClick, isPinSet }: PinButtonProps) {
  return (
    <Button onClick={() => onClick(isPinSet)}>
      {isPinSet ? 'Zmień PIN' : 'Ustaw PIN'}
    </Button>
  );
}

// Logika w hooku
import { useState } from 'react';

export function usePinSettings() {
  const [isPinSet, setIsPinSet] = useState<boolean>(false);
  const handleClick = (pinStatus: boolean) => {
    setIsPinSet(pinStatus);
    // Dodatkowa logika
  };
  return { isPinSet, handleClick };
}

// Użycie
import { PinButton } from './PinButton';
import { usePinSettings } from './usePinSettings';

export function PinSettings() {
  const { isPinSet, handleClick } = usePinSettings();
  return <PinButton onClick={handleClick} isPinSet={isPinSet} />;
}