import { Loader } from '@/components/ui/loader';
import type { SupportTicket } from '../types/support';
import { TicketTable } from './TicketTable';
import PaginationControl from '@/components/ui/ui/PaginationControl';

interface TicketContentProps {
  tickets: SupportTicket[];
  selectedTicketId: number | null;
  onSelectTicket: (id: number) => void;
  loading: boolean;
  error: string | null;
  showClosed: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TicketContent({
  tickets,
  selectedTicketId,
  onSelectTicket,
  loading,
  error,
  showClosed,
  currentPage,
  totalPages,
  onPageChange,
}: TicketContentProps) {
  console.log('[TicketContent] Props:', { tickets, loading, error, currentPage, totalPages });

  return (
    <div className="overflow-x-auto">
      {loading && tickets.length === 0 ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-red-500">Błąd: {error}</div>
      ) : tickets.length === 0 ? (
        <div className="text-center text-muted-foreground">
          {showClosed ? 'Nie masz żadnych zamkniętych zgłoszeń wsparcia.' : 'Nie masz żadnych aktywnych zgłoszeń wsparcia.'}
        </div>
      ) : (
        <TicketTable
          tickets={tickets}
          selectedTicketId={selectedTicketId}
          onSelectTicket={onSelectTicket}
        />
      )}
      {totalPages > 1 && (
        <div className="mt-4">
          <PaginationControl
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
            maxVisiblePages={5}
          />
        </div>
      )}
    </div>
  );
}