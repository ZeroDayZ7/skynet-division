// src/components/TicketDetails.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CalendarCheck, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import ChatMessage from './components/ChatMessage';
import { useSupportTickets } from './hooks/useSupportTickets';
import type { TicketDetails } from './types/support';

interface TicketDetailsProps {
  ticket: TicketDetails;
  currentUserId: number;
  onStatusChange?: () => void;
}

export default function TicketDetails({ ticket, currentUserId, onStatusChange }: TicketDetailsProps) {
  const t = useTranslations();
  const { sendMessage, closeTicket } = useSupportTickets();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [closeReason, setCloseReason] = useState('');
  const [showCloseReason, setShowCloseReason] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Date(ticket.createdAt).toLocaleString('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [ticket.messages.length]);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setIsSending(true);
      await sendMessage({ id: ticket.id, message });
      toast.success(t('send_message_success'));
      setMessage('');
      onStatusChange?.();
      scrollToBottom();
    } catch (error) {
      toast.error(t('send_message_error', { error }));
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
      toast.success(t('close_ticket_success'));
      setCloseReason('');
      setShowCloseReason(false);
      onStatusChange?.();
    } catch {
      toast.error(t('close_ticket_error'));
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5 text-muted-foreground" />
          {t('ticket_details', { id: ticket.id })}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarCheck className="h-4 w-4" />
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            {t('subject')}: {ticket.subject}
          </p>
        </div>

        <Separator />

        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Status:</p>
          <Badge variant="outline">{ticket.status}</Badge>
          {ticket.status !== 'closed' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCloseReason(true)}
              disabled={isClosing}
              className="ml-4"
              aria-label={t('close_ticket')}
            >
              {isClosing ? t('closing') : t('close_ticket')}
            </Button>
          )}
        </div>

        {showCloseReason && ticket.status !== 'closed' && (
          <div className="space-y-2">
            <Textarea
              placeholder={t('enter_reason_for_closing')}
              value={closeReason}
              onChange={(e) => setCloseReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCloseReason(false)}
                disabled={isClosing}
              >
                {t('cancel')}
              </Button>
              <Button
                onClick={handleCloseTicket}
                disabled={isClosing || (ticket.status === 'new' && !closeReason.trim())}
              >
                {t('confirm')}
              </Button>
            </div>
          </div>
        )}

        <Separator />

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground mb-1">{t('conversation')}</p>
          <div
            ref={messagesContainerRef}
            className="space-y-2 max-h-[400px] overflow-y-auto pr-2"
          >
            {ticket.messages.length > 0 ? (
              ticket.messages.map((msg, index) => (
                <ChatMessage
                  key={msg.id}
                  message={{
                    id: msg.id,
                    message: msg.message,
                    sender_id: msg.sender_id,
                    sender: {
                      username: msg.sender.username,
                      role: msg.sender.role,
                    },
                    createdAt: msg.createdAt,
                  }}
                  currentUserId={currentUserId}
                  showUsername={
                    index === 0 || ticket.messages[index - 1].sender_id !== msg.sender_id
                  }
                  showTimestamp
                  isFirstMessageInGroup={
                    index === 0 || ticket.messages[index - 1].sender_id !== msg.sender_id
                  }
                />
              ))
            ) : (
              <p className="italic text-muted-foreground">{t('no_messages_in_conversation')}</p>
            )}
          </div>
        </div>

        {ticket.status !== 'closed' && (
          <>
            <Separator />
            <div className="space-y-2">
              <Textarea
                placeholder={t('enter_message')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSend}
                  disabled={isSending || !message.trim()}
                  aria-label={t('send_message')}
                >
                  {isSending ? t('sending') : t('send_message')}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}