// app/settings/security/TwoFactorSwitch.tsx
'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamiczne ładowanie PinSection
const PinSection = dynamic(() => import('./PinSection'), {
    loading: () => <p>Ładowanie sekcji PIN...</p>,
    ssr: false, // jeżeli komponent zależy od przeglądarki (np. localStorage, window itp.)
  });

interface TwoFactorSwitchProps {
  initialEnabled: boolean;
}

export function TwoFactorSwitch({ initialEnabled }: TwoFactorSwitchProps) {
  const [isEnabled, setIsEnabled] = useState(initialEnabled);

  const handleToggle = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/two-factor/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ enable: !isEnabled }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle 2FA');
      }

      setIsEnabled(!isEnabled);
      toast.success(isEnabled ? 'Uwierzytelnianie dwuskładnikowe wyłączone' : 'Uwierzytelnianie dwuskładnikowe włączone');
    } catch (error) {
      console.error('Error toggling 2FA:', error);
      toast.error('Błąd podczas zmiany ustawień uwierzytelniania');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="two-factor">Uwierzytelnianie dwuskładnikowe</Label>
          <p className="text-muted-foreground text-sm">
            Włącz dodatkową warstwę zabezpieczeń dla swojego konta
          </p>
        </div>
        <Switch id="two-factor" checked={isEnabled} onCheckedChange={handleToggle} />
      </div>

      {isEnabled && (
        <Suspense fallback={<div>Ładowanie opcji PIN...</div>}>
          <PinSection />
        </Suspense>
      )}
    </div>
  );
}