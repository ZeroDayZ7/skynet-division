// components/settings/security/TwoFactorSettings.tsx
'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { fetchClient } from '@/lib/fetchClient';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
        <div className="flex items-center gap-2">
        <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
    </div>
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