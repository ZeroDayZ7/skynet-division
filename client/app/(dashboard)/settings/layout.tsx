// app/settings/layout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';

export default function SettingsLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isRoot = pathname === '/settings';

  return (
    <div className="text-white p-4">
      {!isRoot && (
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => history.back()}
            className="text-sm text-blue-400"
          >
            ← Wstecz
          </Button>
        </div>
      )}

      {children}
    </div>
  );
}
