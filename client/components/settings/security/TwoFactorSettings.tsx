'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

// dynamiczne ładowanie PinSettings z SSR wyłączonym
const PinSettings = dynamic(() => import('./pin/PinSettings'), {
  ssr: false,
  loading: () => <p className="text-sm text-muted-foreground mt-2">Ładowanie ustawień PIN...</p>,
});

export function TwoFactorSettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleToggle2FA = (checked: boolean) => {


      setTwoFactorEnabled(checked);
      if (checked) {
        toast.success('2FA włączone', {
          description: 'Kod z aplikacji autoryzacyjnej będzie wymagany przy logowaniu.',
          icon: '🔐',
        });
      } else {
        toast.warning('2FA wyłączone', {
          description: 'Dwuetapowe uwierzytelnianie zostało wyłączone.',
          icon: '⚠️',
        });
      }
      
  
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="2fa">Uwierzytelnianie dwuskładnikowe</Label>
          <p className="text-sm text-muted-foreground">
            Wymagaj kodu z aplikacji autoryzacyjnej przy logowaniu
          </p>
        </div>
        <Switch
          id="2fa"
          checked={twoFactorEnabled}
          onCheckedChange={handleToggle2FA}
        />
      </div>

      {twoFactorEnabled && (
        <div className="pt-2 border-t mt-4">
          {/* <Suspense fallback={<p>Ładowanie ustawień PIN...</p>}> */}
            <PinSettings />
          {/* </Suspense> */}
        </div>
      )}
    </div>
  );
}
