// app/settings/security/PinSection.tsx
'use client';

import { Label } from '@/components/ui/label';
import PinButton from './PinButton';

export function PinSection() {
  return (
    <div className="flex items-center justify-between mt-4">
      <div>
        <Label htmlFor="pin">Kod PIN</Label>
        <p className="text-muted-foreground text-sm">
          Dodaj lub zmień dodatkową warstwę zabezpieczeń
        </p>
      </div>
      <PinButton />
    </div>
  );
}