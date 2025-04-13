// components/PinSettings.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SetPinModal } from './SetPinModal';
import { useSetPin } from '@/hooks/useSetPin';
import { toast } from 'sonner'; // Zakładam, że używasz shadcn toast
import { useSuccessModal } from '@/components/ui/successProvider';

export function PinSettings() {
  const [isSetPinModalOpen, setIsSetPinModalOpen] = useState(false);
  const { pinExists } = useSetPin(() => setIsSetPinModalOpen(false));
  const { show: showSuccess } = useSuccessModal();


  const handleSuccess = (message: string) => {
    setIsSetPinModalOpen(false); // Zamknij modal
    
    console.log(`message: ${message}`);

    showSuccess('Sukces', {
      description: message,
      duration: 3000,
      icon: '✔',
    });

    // toast.success('Sukces', {
    //   description: `${message}`,
    //   duration: 5000,
    //   icon: '✔',
    // });
    
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
        <Button
          variant="outline"
          onClick={() => setIsSetPinModalOpen(true)}
          className="dark:hover:text-green-500"
        >
          {pinExists ? 'Zmień PIN' : 'Ustaw PIN'}
        </Button>
      </div>

      <SetPinModal
        isOpen={isSetPinModalOpen}
        onClose={() => setIsSetPinModalOpen(false)}
        onSuccess={handleSuccess}
      />

    </>
  );
}
