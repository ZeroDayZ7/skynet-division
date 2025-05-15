// components/settings/SettingsPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { usePinStatus } from './pin/hooks/usePinStatus';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/ui/loader';
import TwoFactorSwitch from './components/TwoFactorSection';
import PinSection from './components/PinSection';

export default function SettingsPage() {
  const { isPinSet, loading, setIsPinSet, refetch } = usePinStatus();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ⬇️ Lazy loading
  const LazySetPinModal = dynamic(() => import('./pin/SetPinModal'), {
    ssr: false,
    loading: () => <Loader />,
  });

  // Synchronizuj stan switcha z isPinSet przy ładowaniu
  useEffect(() => {
    if (isPinSet !== null) {
      console.log(`isPinSet: ${isPinSet}`);
      setTwoFactorEnabled(isPinSet);
    }
  }, [isPinSet]);

  const handleToggle2FA = (checked: boolean) => {
    setTwoFactorEnabled(checked);

    if (checked && !isPinSet) {
      toast.warning('Kod PIN nie jest ustawiony', {
        description: 'Aby włączyć 2FA, musisz najpierw ustawić kod PIN.',
        action: {
          label: 'Ustaw PIN',
          onClick: () => setIsModalOpen(true),
        },
      });
      setTwoFactorEnabled(false);
      return;
    }
  };

  return (
    <div className="space-y-4">
      <TwoFactorSwitch
        checked={twoFactorEnabled}
        disabled={loading}
        isPinSet={isPinSet}
        onCheckedChange={handleToggle2FA}
        onRequirePinSetup={() => setIsModalOpen(true)}
      />

      <PinSection
        isPinSet={isPinSet}
        loading={loading}
        onClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <LazySetPinModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={(message) => {
            toast.success(message);
            setIsModalOpen(false);
            // setIsPinSet(true);
            // setTwoFactorEnabled(true);
            // refetch(); // odśwież status PIN
          }}
          isPinSet={!!isPinSet}
        />
      )}
    </div>
  );
}
