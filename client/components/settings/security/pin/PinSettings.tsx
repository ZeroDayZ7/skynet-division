// components/settings/security/pin/PinSettings.tsx
'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { SetPinModal } from './SetPinModal';
import PinButton from './PinButton';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

export function PinSettings() {
  const componentId = nanoid();
  const [isSetPinModalOpen, setIsSetPinModalOpen] = useState(false);
  const [isPinSet, setIsPinSet] = useState<boolean | null>(null);
  const router = useRouter();

  const handlePinSetSuccess = (message: string) => {
    setIsSetPinModalOpen(false);
    setIsPinSet(true); // Zaktualizuj lokalny stan po sukcesie
    toast.success('Sukces', {
      description: message,
      richColors: true,
      duration: 5000,
      position: 'top-center',
      icon: '✔',
    });
    router.refresh(); // Odśwież stronę
  };

  const handlePinButtonClick = (pinStatus: boolean) => {
    setIsPinSet(pinStatus);
    setIsSetPinModalOpen(true);
  };

  console.log(`[${componentId}] PinSettings mounted`);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="pin">Kod PIN</Label>
          <p className="text-muted-foreground text-sm">
            Dodaj lub zmień dodatkową warstwę zabezpieczeń
          </p>
        </div>
        <Suspense fallback={<button disabled className="opacity-50">Ładowanie...</button>}>
          <PinButton onClick={handlePinButtonClick} />
        </Suspense>
      </div>

      {isPinSet !== null && (
        <SetPinModal
          isOpen={isSetPinModalOpen}
          onClose={() => setIsSetPinModalOpen(false)}
          onSuccess={handlePinSetSuccess}
          isPinSet={isPinSet}
        />
      )}
    </>
  );
}