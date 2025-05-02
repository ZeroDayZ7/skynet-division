// components/settings/ThemeSelector.tsx
"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeManager } from "@/components/theme/useThemeManager";

export function ThemeSelector() {
  const { theme, resolvedTheme, setTheme, toggleTheme, mounted } = useThemeManager();

  if (!mounted) return null;

  return (
    <>
      <div className="flex items-center justify-between p-3 rounded-lg border">
        <Label>Tryb ciemny</Label>
        <Button 
          onClick={toggleTheme} 
          variant="ghost" 
          size="icon"
          aria-label="Zmień motyw"
        >
          {resolvedTheme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Preferowany motyw</Label>
        <RadioGroup 
          value={theme}
          onValueChange={(value) => setTheme(value)}
          className="grid grid-cols-3 gap-4"
        >
          {/* Opcje motywu */}
        </RadioGroup>
      </div>

      <div className="text-sm text-muted-foreground pt-2">
        Aktualny motyw: {theme === "system" 
          ? `Systemowy (${resolvedTheme === "dark" ? "ciemny" : "jasny"})` 
          : theme === "dark" ? "Ciemny" : "Jasny"}
      </div>
    </>
  );
}