'use client';

import { AppearanceSettings } from './AppearanceSettings';
import LanguageSelector from './LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor } from 'lucide-react';

export default function AppearanceSettingsPage() {
  return (
    <div className="py-2 w-3/4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Ustawienia wyglądu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AppearanceSettings />
          <LanguageSelector />
        </CardContent>
      </Card>
    </div>
  );
}
