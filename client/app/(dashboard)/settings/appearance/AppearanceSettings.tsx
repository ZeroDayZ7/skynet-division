'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sun, Moon, Monitor } from 'lucide-react';

export function AppearanceSettings() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // setTheme('system');

  console.log(`resolverTheme: ${resolvedTheme}`);
  console.log(`Theme: ${theme}`);
  console.log(`systemTheme ${systemTheme}`);

  // Po stronie klienta, by zapobiec błędom w SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <fieldset className="space-y-2">
      <legend className="flex items-center gap-2">
        <Monitor className="h-5 w-5" />
        <span>Preferowany motyw</span>
      </legend>

      <RadioGroup
        value={theme ?? 'system'}
        onValueChange={(value) => setTheme(value)}
        className="grid grid-cols-3 gap-4"
      >
        <div>
          <RadioGroupItem value="light" id="light" className="peer sr-only" />
          <Label
            htmlFor="light"
            className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
          >
            <Sun className="mb-2 h-6 w-6" />
            Jasny
          </Label>
        </div>
        <div>
          <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
          <Label
            htmlFor="dark"
            className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
          >
            <Moon className="mb-2 h-6 w-6" />
            Ciemny
          </Label>
        </div>
      </RadioGroup>
    </fieldset>
  );
}
