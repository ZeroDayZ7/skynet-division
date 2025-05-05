'use client';

import { useState, useEffect } from 'react';
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
import { Loader } from '@/components/ui/loader';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import TicketDetails from './TicketDetails';
import { Badge } from '@/components/ui/badge';
import { useSupportTickets } from './useSupportTickets';

/**
 * Komponent wyświetlający listę ticketów wsparcia użytkownika
 */
export default function SupportTickets() {
  const t = useTranslations();
  const { tickets, fetchTickets, fetchClosedTickets, ticketDetails } = useSupportTickets();
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showClosed, setShowClosed] = useState(false);
  const currentUserId = 93; // TODO: Pobierz z kontekstu autoryzacji

  useEffect(() => {
    fetchTickets(); // Pobierz aktywne tickety przy montowaniu
  }, [fetchTickets]);

  const handleShowClosed = () => {
    setShowClosed(true);
    fetchClosedTickets();
  };

  const selectedTicket = selectedTicketId ? ticketDetails[selectedTicketId] : null;

  return (
    <div className="space-y-4">
      {tickets.length === 0 && !showClosed ? (
        <div>Nie masz żadnych aktywnych zgłoszeń wsparcia.</div>
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
                        onClick={() => {
                          setSelectedTicketId((prev) =>
                            prev === ticket.id ? null : ticket.id
                          );
                          if (selectedTicketId !== ticket.id) {
                            // Ładuj szczegóły tylko, jeśli ticket nie jest już wybrany
                            useSupportTickets().loadTicketDetails(ticket.id);
                          }
                        }}
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
          onStatusChange={() => fetchTickets()} // Odśwież listę po zmianie statusu
        />
      )}
    </div>
  );
}