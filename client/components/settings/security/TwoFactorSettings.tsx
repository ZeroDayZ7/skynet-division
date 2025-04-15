// components/settings/security/TwoFactorSettings.tsx
'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { fetchClient } from '@/lib/fetchClient';
import { toast } from 'sonner';

export function TwoFactorSettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle2FA = async (checked: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetchClient<{ success: boolean; message?: string }>(
        '/api/user/two-factor',
        {
          method: 'POST',
          body: JSON.stringify({ enabled: checked }),
          csrf: true,
        }
      );

      if (response.success) {
        setTwoFactorEnabled(checked);
        toast.success("Sukces", {
          description: `Uwierzytelnianie dwuskładnikowe ${checked ? 'włączone' : 'wyłączone'}.`,
          richColors: true,
          duration: 5000,
          position: "top-center",
          icon: "✔",
        });
        // ⚠️
      } else {
        throw new Error(response.message || 'Błąd operacji');
      }
    } catch (error: any) {
      toast.error("Błąd", {
        description: error.message || 'Nie udało się zmienić ustawień 2FA',
        richColors: true,
        duration: 5000,
        position: "top-center",
        icon: "❌",
      });
      setTwoFactorEnabled(!checked); // Przywracamy stan
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        disabled={isLoading}
      />
    </div>
  );
}