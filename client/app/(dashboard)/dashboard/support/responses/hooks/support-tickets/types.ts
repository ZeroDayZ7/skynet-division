import { SupportTicket, TicketMessage, TicketDetails } from '../../types/support';
import { SupportTicketStatus } from '@/app/admin/support-messages/useSupportMessages';

export interface UseSupportTicketsReturn {
  tickets: SupportTicket[];
  closedTickets: SupportTicket[];
  ticketsPagination: { currentPage: number; totalPages: number };
  closedTicketsPagination: { currentPage: number; totalPages: number };
  loading: boolean;
  error: string | null;
  fetchTickets: (page: number, limit: number) => void;
  fetchClosedTickets: (page: number, limit: number) => void;
  sendMessage: (args: { id: number; message: string }) => Promise<TicketMessage>;
  closeTicket: (args: { id: number; reason?: string }) => Promise<void>;
  reset: () => void;
  selectedTicket?: TicketDetails; // Dodajemy pole dla szczegółów zgłoszenia
  ticketLoading: boolean; // Stan ładowania
  ticketError: Error | null; // Błąd, jeśli występuje
}

export type FetchTicketsData = {
  tickets: SupportTicket[];
  total: number;
  page: number;
  limit: number;
};

export type { SupportTicket, TicketMessage, TicketDetails, SupportTicketStatus };