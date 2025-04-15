'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function TestPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu className="mr-2 h-4 w-4" />
            Otwórz menu
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[260px]">
          <nav className="flex flex-col gap-4 mt-6">
            <Button variant="ghost" className="justify-start">Konto</Button>
            <Button variant="ghost" className="justify-start">Bezpieczeństwo</Button>
            <Button variant="ghost" className="justify-start">Powiadomienia</Button>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="mt-8">
        <h1 className="text-2xl font-bold">Testowa strona</h1>
        <p className="text-muted-foreground mt-2">Tutaj pojawi się treść strony.</p>
      </div>
    </div>
  );
}