// components/settings/LanguageSelector.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSelector() {
  return (
    <div className="space-y-2 pt-4">
      <Label className="flex items-center gap-2">
        <Languages className="h-4 w-4" />
        Język aplikacji
      </Label>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Polski
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          English
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          Deutsch
        </Button>
      </div>
    </div>
  );
}