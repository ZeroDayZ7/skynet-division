// components/settings/security/pin/PinSettings.tsx
'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
// import { SetPinModal } from './SetPinModal';
import PinButton from './PinButton';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { usePinStatus } from './hooks/usePinStatus';

export default function PinSettings() {
  const componentId = nanoid();
  const [isSetPinModalOpen, setIsSetPinModalOpen] = useState(false);
  const { isPinSet, loading, setIsPinSet } = usePinStatus();
  const router = useRouter();

  const handlePinSetSuccess = (message: string) => {
    setIsSetPinModalOpen(false);
    setIsPinSet(true); // Aktualizuj stan
    toast.success('Sukces', {
      description: message,
      richColors: true,
      duration: 5000,
      position: 'top-center',
      icon: '✔',
    });
    router.refresh(); // Odśwież stronę
  };

  const handlePinButtonClick = () => {
    if (isPinSet !== null) {
      setIsSetPinModalOpen(true);
    }
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
          <PinButton isPinSet={isPinSet} loading={loading} onClick={handlePinButtonClick} />
      </div>

      {/* {isPinSet !== null && (
        <SetPinModal
          isOpen={isSetPinModalOpen}
          onClose={() => setIsSetPinModalOpen(false)}
          onSuccess={handlePinSetSuccess}
          isPinSet={isPinSet}
        />
      )} */}
    </>
  );
}