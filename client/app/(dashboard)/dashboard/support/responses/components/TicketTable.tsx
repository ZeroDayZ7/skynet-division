import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import type { SupportTicket } from '../types/support';
import type { SupportTicketStatus } from '@/app/admin/support-messages/useSupportMessages';
import { getBadgeVariant } from '../utils/badgeUtils'; // Import nowej funkcji

interface TicketTableProps {
  tickets: SupportTicket[];
  selectedTicketId: number | null;
  onSelectTicket: (id: number) => void;
}

export function TicketTable({
  tickets,
  selectedTicketId,
  onSelectTicket,
}: TicketTableProps) {
  const statusLabels: Record<SupportTicketStatus, string> = {
    new: 'Nowy',
    open: 'Otwarty',
    in_progress: 'W trakcie',
    closed: 'Zamknięty',
  };

  const subjectLabels: Record<string, string> = {
    bug: 'Błąd',
    feature: 'Funkcjonalność',
    other: 'Inne',
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px]">ID</TableHead>
          <TableHead className="w-[120px]">Data</TableHead>
          <TableHead className="w-[180px]">Temat</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
          <TableHead className="w-[120px] text-right">Akcja</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id} className="hover:bg-muted/50">
            <TableCell className="w-[60px]">{ticket.id}</TableCell>
            <TableCell className="w-[120px]">
              {format(new Date(ticket.createdAt), 'dd.MM.yyyy', { locale: pl })}
            </TableCell>
            <TableCell className="w-[180px]">
              {subjectLabels[ticket.subject] || ticket.subject}
            </TableCell>
            <TableCell className="w-[120px]">
              <Badge variant={getBadgeVariant(ticket.status)}>
                {statusLabels[ticket.status] || ticket.status}
              </Badge>
            </TableCell>
            <TableCell className="w-[120px] text-right">
              <Button
                variant="outline"
                size="sm"
                className="w-[100px]"
                onClick={() => onSelectTicket(ticket.id)}
                aria-label={
                  selectedTicketId === ticket.id
                    ? 'Ukryj szczegóły'
                    : 'Pokaż szczegóły'
                }
              >
                {selectedTicketId === ticket.id ? 'Ukryj' : 'Zobacz'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}