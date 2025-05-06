'use client';

import { CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function TicketDetailsSkeleton() {
  return (
    <>
      <CardHeader>
        <div className="h-6 w-1/3 bg-muted animate-pulse" /> {/* Miejsce na nagłówek */}
        <div className="h-4 w-1/4 bg-muted animate-pulse mt-2" /> {/* Miejsce na datę */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-4 w-1/2 bg-muted animate-pulse" /> {/* Temat */}
        <Separator />
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-muted animate-pulse" /> {/* Status */}
          <div className="h-6 w-20 bg-muted animate-pulse" /> {/* Badge */}
          <div className="h-8 w-32 bg-muted animate-pulse ml-4" /> {/* Przycisk */}
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted animate-pulse" /> {/* Nagłówek rozmowy */}
          <div className="h-32 w-full bg-muted animate-pulse" /> {/* Lista wiadomości */}
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="h-20 w-full bg-muted animate-pulse" /> {/* Textarea */}
          <div className="h-10 w-32 bg-muted animate-pulse ml-auto" /> {/* Przycisk wysyłania */}
        </div>
      </CardContent>
    </>
  );
}