// src/services/useSupportTickets.ts
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
  fetchTickets: (page?: number, limit?: number) => void;
  fetchClosedTickets: {
    refetch: (page?: number, limit?: number) => void;
    isLoading: boolean;
    data?: SupportTicket[];
  };
  sendMessage: (args: { id: number; message: string }) => Promise<TicketMessage>;
  closeTicket: (args: { id: number; reason?: string }) => Promise<void>;
  reset: () => void;
}

export function useSupportTickets(): UseSupportTicketsReturn {
  const queryClient = useQueryClient();
  const defaultLimit = 5;

  // Pobieranie aktywnych ticketów
  const fetchTickets = useQuery<{
    tickets: SupportTicket[];
    total: number;
    page: number;
    limit: number;
  }, Error>({
    queryKey: ['tickets', 'active', 1, defaultLimit],
    queryFn: async ({ queryKey }) => {
      const [, , page, limit] = queryKey as [string, string, number, number];
      const data = await SupportApi.getTicketsWithPagination(['new', 'open', 'in_progress'], limit, page);
      console.log('[useSupportTickets] Fetched active tickets:', data);
      return data;
    },
    staleTime: 60 * 1000, // 1 minuta
    retry: 1,
  });

  // Pobieranie zamkniętych ticketów
  const fetchClosedTickets = useQuery<{
    tickets: SupportTicket[];
    total: number;
    page: number;
    limit: number;
  }, Error>({
    queryKey: ['tickets', 'closed', 1, defaultLimit],
    queryFn: async ({ queryKey }) => {
      const [, , page, limit] = queryKey as [string, string, number, number];
      const data = await SupportApi.getTicketsWithPagination(['closed'], limit, page);
      console.log('[useSupportTickets] Fetched closed tickets:', data);
      return data;
    },
    enabled: false,
    staleTime: 60 * 1000,
    retry: 1,
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
        ['tickets', 'active', 1, defaultLimit],
        (old: { tickets: SupportTicket[]; total: number; page: number; limit: number } | undefined) => {
          if (!old) return old;
          const newActive = old.tickets.filter((ticket) => ticket.id !== id);
          return { ...old, tickets: newActive, total: newActive.length };
        }
      );

      queryClient.setQueryData(
        ['tickets', 'closed', 1, defaultLimit],
        (old: { tickets: SupportTicket[]; total: number; page: number; limit: number } | undefined) => {
          const closedTicket = fetchTickets.data?.tickets.find((ticket) => ticket.id === id);
          if (!closedTicket) return old || { tickets: [], total: 0, page: 1, limit: defaultLimit };
          const updatedTicket = { ...closedTicket, status: 'closed' as SupportTicketStatus };
          const newClosed = old ? [...old.tickets, updatedTicket] : [updatedTicket];
          return { ...old, tickets: newClosed, total: newClosed.length };
        }
      );
    },
  });

  // Resetowanie stanu
  const reset = () => {
    queryClient.removeQueries({ queryKey: ['tickets'] });
    queryClient.removeQueries({ queryKey: ['ticketDetails'] });
  };

  return {
    tickets: fetchTickets.data?.tickets || [],
    closedTickets: fetchClosedTickets.data?.tickets || [],
    ticketsPagination: {
      currentPage: fetchTickets.data?.page || 1,
      totalPages: Math.ceil((fetchTickets.data?.total || 0) / (fetchTickets.data?.limit || defaultLimit)),
    },
    closedTicketsPagination: {
      currentPage: fetchClosedTickets.data?.page || 1,
      totalPages: Math.ceil((fetchClosedTickets.data?.total || 0) / (fetchClosedTickets.data?.limit || defaultLimit)),
    },
    loading: fetchTickets.isLoading || fetchClosedTickets.isLoading,
    error: fetchTickets.error?.message || fetchClosedTickets.error?.message || null,
    fetchTickets: (page = 1, limit = defaultLimit) => {
      queryClient.invalidateQueries({ queryKey: ['tickets', 'active', page, limit] });
      queryClient.fetchQuery({
        queryKey: ['tickets', 'active', page, limit],
        queryFn: async () => {
          const data = await SupportApi.getTicketsWithPagination(['new', 'open', 'in_progress'], limit, page);
          console.log('[useSupportTickets] Fetched active tickets:', data);
          return data;
        },
      });
    },
    fetchClosedTickets: {
      refetch: (page = 1, limit = defaultLimit) => {
        queryClient.invalidateQueries({ queryKey: ['tickets', 'closed', page, limit] });
        queryClient.fetchQuery({
          queryKey: ['tickets', 'closed', page, limit],
          queryFn: async () => {
            const data = await SupportApi.getTicketsWithPagination(['closed'], limit, page);
            console.log('[useSupportTickets] Fetched closed tickets:', data);
            return data;
          },
        });
      },
      isLoading: fetchClosedTickets.isLoading,
      data: fetchClosedTickets.data?.tickets,
    },
    sendMessage: sendMessage.mutateAsync,
    closeTicket: closeTicket.mutateAsync,
    reset,
  };
}