'use client';

import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useSupportTickets } from './hooks/support-tickets';
import type { TicketDetails } from './types/support';
import { TicketDetailsHeader } from './components/ticket-details/TicketDetailsHeader';
import { TicketDetailsSubject } from './components/ticket-details/TicketDetailsSubject';
import { TicketDetailsStatus } from './components/ticket-details/TicketDetailsStatus';
import { TicketDetailsCloseReason } from './components/ticket-details/TicketDetailsCloseReason';
import { TicketDetailsMessages } from './components/ticket-details/TicketDetailsMessages';
import { TicketDetailsMessageInput } from './components/ticket-details/TicketDetailsMessageInput';

interface TicketDetailsProps {
  ticket: TicketDetails;
  currentUserId: number;
  onStatusChange?: () => void;
}

export default function TicketDetails({ ticket, currentUserId, onStatusChange }: TicketDetailsProps) {
  const { sendMessage, closeTicket } = useSupportTickets();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [closeReason, setCloseReason] = useState('');
  const [showCloseReason, setShowCloseReason] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setIsSending(true);
      await sendMessage({ id: ticket.id, message });
      toast.success('Wiadomość została wysłana.');
      setMessage('');
      onStatusChange?.();
    } catch (error) {
      toast.error(`Błąd podczas wysyłania wiadomości: ${error}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleCloseTicket = async () => {
    if (ticket.status === 'new' && !closeReason.trim()) {
      setShowCloseReason(true);
      return;
    }

    try {
      setIsClosing(true);
      await closeTicket({ id: ticket.id, reason: closeReason || undefined });
      toast.success('Zgłoszenie zostało zamknięte.');
      setCloseReason('');
      setShowCloseReason(false);
      onStatusChange?.();
    } catch {
      toast.error('Błąd podczas zamykania zgłoszenia.');
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <>
      <TicketDetailsHeader ticketId={ticket.id} createdAt={ticket.createdAt} />
      <CardContent className="space-y-4">
        <TicketDetailsSubject subject={ticket.subject} />
        <Separator />
        <TicketDetailsStatus
          status={ticket.status}
          isClosing={isClosing}
          onShowCloseReason={() => setShowCloseReason(true)}
        />
        {showCloseReason && ticket.status !== 'closed' && (
          <TicketDetailsCloseReason
            closeReason={closeReason}
            isClosing={isClosing}
            onCloseReasonChange={setCloseReason}
            onCancel={() => setShowCloseReason(false)}
            onConfirm={handleCloseTicket}
            isConfirmDisabled={ticket.status === 'new' && !closeReason.trim()}
          />
        )}
        <Separator />
        <TicketDetailsMessages messages={ticket.messages} currentUserId={currentUserId} />
        {ticket.status !== 'closed' && (
          <>
            <Separator />
            <TicketDetailsMessageInput
              message={message}
              isSending={isSending}
              onMessageChange={setMessage}
              onSend={handleSend}
            />
          </>
        )}
      </CardContent>
    </>
  );
}