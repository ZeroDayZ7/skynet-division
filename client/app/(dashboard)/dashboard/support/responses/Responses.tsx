'use client';

import { useState, useCallback } from 'react';
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
import ResponseDetails from './ResponseDetails';
import { useTickets } from './useTickets';
import { Ticket } from './ticket';

/**
 * Komponent wyświetlający listę ticketów użytkownika w tabeli
 */
export default function Responses() {
  const t = useTranslations();
  const {
    tickets,
    loading,
    error,
    loadTickets,
    loadClosedTickets,
    refetch,
  } = useTickets();
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const currentUserId = 93; // TODO: Pobierz z kontekstu autoryzacji (np. useAuth)

  // Wybór ticketu do wyświetlenia szczegółów
  const handleSelectTicket = useCallback(
    (id: number) => {
      setSelectedTicketId((prev) => (prev === id ? null : id));
    },
    []
  );

  // Ładowanie zamkniętych ticketów
  const handleLoadClosed = useCallback(() => {
    loadClosedTickets();
  }, [loadClosedTickets]);

  // Wybrany ticket do wyświetlenia szczegółów
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId);

  if (loading && tickets.length === 0) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

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
                {tickets.map((ticket: Ticket) => (
                  <TableRow key={ticket.id} className="hover:bg-muted/50">
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>
                      {format(new Date(ticket.createdAt), 'dd.MM.yyyy', {
                        locale: pl,
                      })}
                    </TableCell>
                    <TableCell>
                      {t(`support.topics.${ticket.subject}`)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {t(`status.${ticket.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-[100px]"
                        onClick={() => handleSelectTicket(ticket.id)}
                        aria-label={
                          selectedTicketId === ticket.id
                            ? 'Ukryj szczegóły zgłoszenia'
                            : 'Pokaż szczegóły zgłoszenia'
                        }
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

      {/* Przycisk do ładowania zamkniętych ticketów */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={handleLoadClosed}
          disabled={loading}
          aria-label="Pokaż zamknięte zgłoszenia"
        >
          {loading ? 'Ładowanie...' : 'Pokaż zamknięte zgłoszenia'}
        </Button>
      </div>

      {/* Szczegóły wybranego ticketu */}
      {selectedTicket && (
        <ResponseDetails
          response={selectedTicket}
          currentUserId={currentUserId}
          onStatusChange={refetch}
        />
      )}
    </div>
  );
}