'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader } from '@/components/ui/loader';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import TicketDetails from './TicketDetails';
import { useSupportTickets } from './useSupportTickets';
import { useAuth } from '@/context/AuthContext';

/**
 * Komponent wyświetlający listę ticketów wsparcia użytkownika
 */
export default function SupportTickets() {
  const t = useTranslations();
  const {
    tickets,
    loading,
    error,
    fetchTickets,
    fetchClosedTickets,
    ticketDetails,
    loadTicketDetails,
  } = useSupportTickets();
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showClosed, setShowClosed] = useState(false);
  const { user } = useAuth();
  const currentUserId = user?.id || 93; // Fallback na 93, jeśli brak usera

  useEffect(() => {
    fetchTickets(); // Pobierz aktywne tickety przy montowaniu
  }, [fetchTickets]);

  const handleSelectTicket = useCallback(
    (id: number) => {
      const isSame = selectedTicketId === id;
      setSelectedTicketId(isSame ? null : id);
      if (!isSame && !ticketDetails[id]) {
        loadTicketDetails(id);
      }
    },
    [selectedTicketId, ticketDetails, loadTicketDetails]
  );

  const handleShowClosed = useCallback(() => {
    setShowClosed(true);
    fetchClosedTickets();
  }, [fetchClosedTickets]);

  const selectedTicket = selectedTicketId ? ticketDetails[selectedTicketId] : null;

  if (loading && tickets.length === 0) return <Loader />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {tickets.length === 0 ? (
        <div className="text-center text-muted-foreground">
          Nie masz żadnych zgłoszeń wsparcia.
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Twoje zgłoszenia wsparcia</CardTitle>
            {!showClosed && (
              <Button variant="outline" onClick={handleShowClosed}>
                Pokaż zamknięte zgłoszenia
              </Button>
            )}
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead className="w-[120px]">Data</TableHead>
                  <TableHead>Temat</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Akcja</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id} className="hover:bg-muted/50">
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>
                      {format(new Date(ticket.createdAt), 'dd.MM.yyyy', { locale: pl })}
                    </TableCell>
                    <TableCell>{t(`support.topics.${ticket.subject}`)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t(`status.${ticket.status}`)}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-[100px]"
                        onClick={() => handleSelectTicket(ticket.id)}
                        aria-label={selectedTicketId === ticket.id ? 'Ukryj szczegóły' : 'Pokaż szczegóły'}
                      >
                        {selectedTicketId === ticket.id ? 'Ukryj' : 'Zobacz'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          currentUserId={currentUserId}
          onStatusChange={() => fetchTickets()}
        />
      )}
    </div>
  );
}