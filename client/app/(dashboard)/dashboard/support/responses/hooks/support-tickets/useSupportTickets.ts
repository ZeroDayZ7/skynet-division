'use client';

import { useFetchTickets } from './fetchTickets';
import { useFetchClosedTickets } from './fetchClosedTickets';
import { useSendMessage } from './sendMessage';
import { useCloseTicket } from './closeTicket';
import { useReset } from './reset';
import { useFetchHandlers } from './fetchHandlers';
import { UseSupportTicketsReturn } from './types';

export function useSupportTickets(
  activePage: number = 1,
  closedPage: number = 1,
  defaultLimit: number = 5
): UseSupportTicketsReturn {
  const fetchTickets = useFetchTickets(activePage, defaultLimit);
  const fetchClosedTickets = useFetchClosedTickets(closedPage, defaultLimit);
  const sendMessage = useSendMessage();
  const closeTicket = useCloseTicket(fetchTickets.data);
  const reset = useReset();
  const { fetchTicketsHandler, fetchClosedTicketsHandler } = useFetchHandlers();

  return {
    tickets: fetchTickets.data?.tickets ?? [],
    closedTickets: fetchClosedTickets.data?.tickets ?? [],
    ticketsPagination: {
      currentPage: fetchTickets.data?.page ?? activePage,
      totalPages: Math.ceil((fetchTickets.data?.total ?? 0) / (fetchTickets.data?.limit ?? defaultLimit)) || 1,
    },
    closedTicketsPagination: {
      currentPage: fetchClosedTickets.data?.page ?? closedPage,
      totalPages: Math.ceil((fetchClosedTickets.data?.total ?? 0) / (fetchClosedTickets.data?.limit ?? defaultLimit)) || 1,
    },
    loading: fetchTickets.isLoading || fetchClosedTickets.isLoading,
    error: fetchTickets.error?.message ?? fetchClosedTickets.error?.message ?? null,
    fetchTickets: (page: number, limit: number) => fetchTicketsHandler(page, limit, activePage, defaultLimit),
    fetchClosedTickets: (page: number, limit: number) => fetchClosedTicketsHandler(page, limit, closedPage, defaultLimit),
    sendMessage: sendMessage.mutateAsync,
    closeTicket: closeTicket.mutateAsync,
    reset,
  };
}