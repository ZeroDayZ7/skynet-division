// src/components/TicketContent.tsx
import { Loader } from '@/components/ui/loader';
import type { SupportTicket } from '../types/support';
import { TicketTable } from './TicketTable';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

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
  const t = useTranslations();

  return (
    <div className="overflow-x-auto">
      {loading && tickets.length === 0 ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : tickets.length === 0 ? (
        <div className="text-center text-muted-foreground">
          {showClosed
            ? t('Nie masz żadnych zamkniętych zgłoszeń wsparcia.')
            : t('Nie masz żadnych aktywnych zgłoszeń wsparcia.')}
        </div>
      ) : (
        <TicketTable
          tickets={tickets}
          selectedTicketId={selectedTicketId}
          onSelectTicket={onSelectTicket}
        />
      )}
      {totalPages > 1 && (
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Poprzednia strona
          </Button>
          <span>
            Strona {currentPage} z {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Następna strona
          </Button>
        </div>
      )}
    </div>
  );
}