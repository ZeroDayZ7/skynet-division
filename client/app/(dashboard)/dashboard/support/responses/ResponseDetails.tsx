'use client';

import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ChatMessage from './ChatMessage';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useTicketReducer } from './useTicketReducer'; // nowa wersja z sendMessage

interface ResponseDetailsProps {
  response: {
    id: number;
    createdAt: Date;
    subject: string;
    status: string;
    SupportMessages: {
      id: number;
      message: string;
      sender_id: number;
      sender: {
        username: string;
        role: string;
      };
    }[];
  };
  currentUserId: number;
  onStatusChange?: () => void;
}

export default function ResponseDetails({ response, currentUserId, onStatusChange }: ResponseDetailsProps) {
  const t = useTranslations();
  const [isClosing, setIsClosing] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const { sendMessage, closeTicket } = useTicketReducer(); // <-- nowy hook
  const formattedDate = new Date(response.createdAt).toLocaleString('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const handleCloseTicket = async () => {
    try {
      setIsClosing(true);
      await closeTicket(response.id);
      toast.success('Zgłoszenie zostało zamknięte.');
      onStatusChange?.();
    } catch {
      toast.error('Nie udało się zamknąć zgłoszenia.');
    } finally {
      setIsClosing(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setIsSending(true);
      await sendMessage(response.id, message);
      toast.success('Wiadomość wysłana.');
      onStatusChange?.(); // ← powoduje refetch danych lub rerender z nową wiadomością
      setMessage('');
    } catch {
      toast.error('Nie udało się wysłać wiadomości.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5 text-muted-foreground" />
          Szczegóły zgłoszenia ID ~ {response.id}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarCheck className="h-4 w-4" />
          {formattedDate}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Temat: {t(`support.topics.${response.subject}`)}</p>
        </div>

        <Separator />

        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Status:</p>
          <Badge variant="outline">{t(`status.${response.status}`)}</Badge>
          {response.status !== 'closed' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCloseTicket}
              disabled={isClosing}
              className="ml-4"
            >
              {isClosing ? 'Zamykanie...' : 'Zamknij zgłoszenie'}
            </Button>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground mb-1">Rozmowa</p>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {response.SupportMessages.length > 0 ? (
              response.SupportMessages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={{
                    id: msg.id,
                    message: msg.message,
                    sender_id: msg.sender_id,
                    sender: {
                      id: msg.sender_id,
                      username: msg.sender.username,
                    },
                  }}
                  currentUserId={currentUserId}
                />
              ))
            ) : (
              <p className="italic text-muted-foreground">Brak wiadomości w rozmowie.</p>
            )}
          </div>
        </div>

        {response.status !== 'closed' && (
          <>
            <Separator />
            <div className="space-y-2">
              <Textarea
                placeholder="Wpisz wiadomość..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handleSend} disabled={isSending || !message.trim()}>
                  {isSending ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
