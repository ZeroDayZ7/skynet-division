'use client';

import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarCheck, Info } from 'lucide-react';

interface TicketDetailsHeaderProps {
  ticketId: number;
  createdAt: string;
}

export function TicketDetailsHeader({ ticketId, createdAt }: TicketDetailsHeaderProps) {
  const formattedDate = new Date(createdAt).toLocaleString('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Info className="h-5 w-5 text-muted-foreground" />
        Szczegóły zgłoszenia #{ticketId}
      </CardTitle>
      <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarCheck className="h-4 w-4" />
        {formattedDate}
      </CardDescription>
    </CardHeader>
  );
}