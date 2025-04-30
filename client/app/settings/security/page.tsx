// components/settings/SecurityPage.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { PinSettings } from '@/components/settings/security/pin/PinSettings';
import { TwoFactorSettings } from '@/components/settings/security/TwoFactorSettings';
import { LoginHistory } from '@/components/settings/security/LoginHistory';

export default function SecuritySettings() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bezpieczeństwo</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ochrona konta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <TwoFactorSettings />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historia logowań</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginHistory />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}