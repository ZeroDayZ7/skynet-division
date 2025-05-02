// components/IntegratedAppearanceSettings.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor, Languages } from "lucide-react";
import { ModeToggle } from "@/components/theme/theme-button";

export function IntegratedAppearanceSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5" />
          Preferencje wyglądu
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Twoj istniejący komponent ModeToggle w nowym stylu */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <Label>Tryb ciemny</Label>
          <ModeToggle />
        </div>

        {/* Selektor języka */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Język
          </Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              PL
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              EN
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              DE
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}