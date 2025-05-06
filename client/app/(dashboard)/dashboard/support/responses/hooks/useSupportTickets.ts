'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as SupportApi from '../api';
import { SupportTicket, TicketMessage, TicketDetails } from '../types/support';
import { SupportTicketStatus } from '@/app/admin/support-messages/useSupportMessages';

interface UseSupportTicketsReturn {
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
}

export function useSupportTickets(activePage: number = 1, closedPage: number = 1, defaultLimit: number = 5): UseSupportTicketsReturn {
  const queryClient = useQueryClient();

  // Pobieranie aktywnych ticketów
  const fetchTickets = useQuery<{
    tickets: SupportTicket[];
    total: number;
    page: number;
    limit: number;
  }, Error>({
    queryKey: ['tickets', 'active', activePage, defaultLimit],
    queryFn: async () => {
      const data = await SupportApi.getTicketsWithPagination(['new', 'open', 'in_progress'], defaultLimit, activePage);
      console.log('[useSupportTickets] Fetched active tickets:', data);
      return {
        tickets: data.tickets || [],
        total: data.total || 0,
        page: data.page || activePage,
        limit: data.limit || defaultLimit,
      };
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    keepPreviousData: true, // Zachowuje poprzednie dane podczas ładowania nowej strony
  });

  // Pobieranie zamkniętych ticketów
  const fetchClosedTickets = useQuery<{
    tickets: SupportTicket[];
    total: number;
    page: number;
    limit: number;
  }, Error>({
    queryKey: ['tickets', 'closed', closedPage, defaultLimit],
    queryFn: async () => {
      const data = await SupportApi.getTicketsWithPagination(['closed'], defaultLimit, closedPage);
      console.log('[useSupportTickets] Fetched closed tickets:', data);
      return {
        tickets: data.tickets || [],
        total: data.total || 0,
        page: data.page || closedPage,
        limit: data.limit || defaultLimit,
      };
    },
    enabled: false,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  // Wysyłanie wiadomości
  const sendMessage = useMutation<TicketMessage, Error, { id: number; message: string }>({
    mutationFn: async ({ id, message }) => {
      const data = await SupportApi.sendMessage(id, message);
      console.log('[useSupportTickets] Sent message:', data);
      return data;
    },
    onSuccess: (newMessage, { id }) => {
      queryClient.setQueryData(['ticketDetails', id], (old: TicketDetails | undefined) => {
        if (!old) return old;
        return {
          ...old,
          messages: [...(old.messages || []), newMessage],
        };
      });
    },
    onError: (error) => {
      console.error('[useSupportTickets] Error sending message:', error);
    },
  });

  // Zamykanie ticketa
  const closeTicket = useMutation<void, Error, { id: number; reason?: string }>({
    mutationFn: async ({ id, reason }) => {
      await SupportApi.closeTicket(id, reason);
      console.log('[useSupportTickets] Closed ticket ID:', id);
    },
    onSuccess: (_, { id }) => {
      queryClient.setQueryData(['ticketDetails', id], (old: TicketDetails | undefined) => {
        if (!old) return old;
        return { ...old, status: 'closed' };
      });

      queryClient.setQueryData(
        ['tickets', 'active', activePage, defaultLimit],
        (old: { tickets: SupportTicket[]; total: number; page: number; limit: number } | undefined) => {
          if (!old) return old;
          const newActive = old.tickets.filter((ticket) => ticket.id !== id);
          return { ...old, tickets: newActive, total: old.total - 1 };
        }
      );

      queryClient.setQueryData(
        ['tickets', 'closed', closedPage, defaultLimit],
        (old: { tickets: SupportTicket[]; total: number; page: number; limit: number } | undefined) => {
          const closedTicket = fetchTickets.data?.tickets.find((ticket) => ticket.id === id);
          if (!closedTicket) return old || { tickets: [], total: 0, page: closedPage, limit: defaultLimit };
          const updatedTicket = { ...closedTicket, status: 'closed' as SupportTicketStatus };
          const newClosed = old ? [...old.tickets, updatedTicket] : [updatedTicket];
          return { ...old, tickets: newClosed, total: (old?.total || 0) + 1 };
        }
      );

      queryClient.invalidateQueries({ queryKey: ['tickets', 'active'] });
      queryClient.invalidateQueries({ queryKey: ['tickets', 'closed'] });
    },
    onError: (error) => {
      console.error('[useSupportTickets] Error closing ticket:', error);
    },
  });

  // Resetowanie stanu
  const reset = () => {
    queryClient.removeQueries({ queryKey: ['tickets'] });
    queryClient.removeQueries({ queryKey: ['ticketDetails'] });
    console.log('[useSupportTickets] Reset queries');
  };

  return {
    tickets: fetchTickets.data?.tickets || [],
    closedTickets: fetchClosedTickets.data?.tickets || [],
    ticketsPagination: {
      currentPage: fetchTickets.data?.page || activePage,
      totalPages: Math.ceil((fetchTickets.data?.total || 0) / (fetchTickets.data?.limit || defaultLimit)) || 1,
    },
    closedTicketsPagination: {
      currentPage: fetchClosedTickets.data?.page || closedPage,
      totalPages: Math.ceil((fetchClosedTickets.data?.total || 0) / (fetchClosedTickets.data?.limit || defaultLimit)) || 1,
    },
    loading: fetchTickets.isLoading || fetchClosedTickets.isLoading,
    error: fetchTickets.error?.message || fetchClosedTickets.error?.message || null,
    fetchTickets: (page: number, limit: number) => {
      queryClient.setQueryData(['tickets', 'active', activePage, defaultLimit], undefined); // Czyści cache dla starej strony
      queryClient.fetchQuery({
        queryKey: ['tickets', 'active', page, limit],
        queryFn: async () => {
          const data = await SupportApi.getTicketsWithPagination(['new', 'open', 'in_progress'], limit, page);
          console.log('[useSupportTickets] Fetched active tickets:', data);
          return {
            tickets: data.tickets || [],
            total: data.total || 0,
            page: data.page || page,
            limit: data.limit || limit,
          };
        },
      });
    },
    fetchClosedTickets: (page: number, limit: number) => {
      queryClient.setQueryData(['tickets', 'closed', closedPage, defaultLimit], undefined); // Czyści cache dla starej strony
      queryClient.fetchQuery({
        queryKey: ['tickets', 'closed', page, limit],
        queryFn: async () => {
          const data = await SupportApi.getTicketsWithPagination(['closed'], limit, page);
          console.log('[useSupportTickets] Fetched closed tickets:', data);
          return {
            tickets: data.tickets || [],
            total: data.total || 0,
            page: data.page || page,
            limit: data.limit || limit,
          };
        },
      });
    },
    sendMessage: sendMessage.mutateAsync,
    closeTicket: closeTicket.mutateAsync,
    reset,
  };
}