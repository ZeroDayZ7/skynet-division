'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { SetPinModal } from './SetPinModal';
import PinButton from './PinButton';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';

export function PinSettings() {
  const componentId = nanoid();
  const [isSetPinModalOpen, setIsSetPinModalOpen] = useState(false);
  const [pinWasSet, setPinWasSet] = useState(false);

  const handlePinSetSuccess = () => {
    setPinWasSet(true);
    toast.success('Kod PIN został ustawiony');
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="pin">Kod PIN</Label>
          <p className="text-muted-foreground text-sm">
            Dodaj lub zmień dodatkową warstwę zabezpieczeń
          </p>
        </div>
        <PinButton onClick={() => setIsSetPinModalOpen(true)} />
      </div>

      <SetPinModal
        isOpen={isSetPinModalOpen}
        onClose={() => setIsSetPinModalOpen(false)}
        onSuccess={handlePinSetSuccess}
      />
    </>
  );
}
