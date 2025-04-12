// components/settings/security/pin/PinSettings.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SetPinModal } from './SetPinModal';

export function PinSettings() {
  const [isSetPinModalOpen, setIsSetPinModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="pin">Kod PIN</Label>
          <p className="text-sm text-muted-foreground">
            Dodaj lub zmień dodatkową warstwę zabezpieczeń
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsSetPinModalOpen(true)}
          className="dark:hover:text-green-500"
        >
          Ustaw/Zmień PIN
        </Button>
      </div>

      <SetPinModal
        isOpen={isSetPinModalOpen}
        onClose={() => setIsSetPinModalOpen(false)}
        onSuccess={() => setIsSetPinModalOpen(false)}
      />
    </>
  );
}