'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface TicketDetailsCloseReasonProps {
  closeReason: string;
  isClosing: boolean;
  onCloseReasonChange: (reason: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  isConfirmDisabled: boolean;
}

export function TicketDetailsCloseReason({
  closeReason,
  isClosing,
  onCloseReasonChange,
  onCancel,
  onConfirm,
  isConfirmDisabled,
}: TicketDetailsCloseReasonProps) {
  return (
    <div className="space-y-2">
      <Textarea
        name='reason'
        placeholder="Podaj powód zamknięcia zgłoszenia"
        value={closeReason}
        onChange={(e) => onCloseReasonChange(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel} disabled={isClosing}>
          Anuluj
        </Button>
        <Button onClick={onConfirm} disabled={isClosing || isConfirmDisabled}>
          Potwierdź
        </Button>
      </div>
    </div>
  );
}