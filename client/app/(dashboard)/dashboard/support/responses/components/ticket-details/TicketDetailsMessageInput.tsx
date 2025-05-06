'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface TicketDetailsMessageInputProps {
  message: string;
  isSending: boolean;
  onMessageChange: (message: string) => void;
  onSend: () => void;
}

export function TicketDetailsMessageInput({
  message,
  isSending,
  onMessageChange,
  onSend,
}: TicketDetailsMessageInputProps) {
  return (
    <div className="space-y-2">
      <Textarea
        name="reply"
        placeholder="Wpisz wiadomość"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          onClick={onSend}
          disabled={isSending || !message.trim()}
          aria-label="Wyślij wiadomość"
        >
          {isSending ? 'Wysyłanie...' : 'Wyślij wiadomość'}
        </Button>
      </div>
    </div>
  );
}