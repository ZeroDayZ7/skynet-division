'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBadgeVariant } from '../../utils/badgeUtils';
import type { SupportTicketStatus } from '../../hooks/support-tickets';

interface TicketDetailsStatusProps {
  status: SupportTicketStatus;
  isClosing: boolean;
  onShowCloseReason: () => void;
}

export function TicketDetailsStatus({ status, isClosing, onShowCloseReason }: TicketDetailsStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-muted-foreground">Status:</p>
      <Badge variant={getBadgeVariant(status)}>{status}</Badge>
      {status !== 'closed' && (
        <Button
          variant="outline"
          size="sm"
          onClick={onShowCloseReason}
          disabled={isClosing}
          className="ml-4"
          aria-label="Zamknij zgłoszenie"
        >
          {isClosing ? 'Zamykanie...' : 'Zamknij zgłoszenie'}
        </Button>
      )}
    </div>
  );
}