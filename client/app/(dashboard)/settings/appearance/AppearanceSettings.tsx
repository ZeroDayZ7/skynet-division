'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeManager } from '@/components/theme/useThemeManager';
import type { Theme } from '@/components/theme/useThemeManager';

export function AppearanceSettings() {
  const { resolvedTheme, mounted, setTheme } = useThemeManager();

  if (!mounted) return null;

  return (
    <fieldset className="space-y-2">
      <legend className="flex items-center gap-2">
        <Monitor className="h-5 w-5" />
        <span>Preferowany motyw</span>
      </legend>

      <RadioGroup
        value={resolvedTheme === 'system' ? 'system' : resolvedTheme}
        onValueChange={(value: Theme) => setTheme(value)}
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
        <div>
          <RadioGroupItem value="system" id="system" className="peer sr-only" />
          <Label
            htmlFor="system"
            className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
          >
            <Monitor className="mb-2 h-6 w-6" />
            System
          </Label>
        </div>
      </RadioGroup>
    </fieldset>
  );
}
