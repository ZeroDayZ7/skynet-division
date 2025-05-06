// src/services/useSupportTickets.ts
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as SupportApi from './api';
import { SupportTicket, TicketMessage, TicketDetails } from './types/support';
import { SupportTicketStatus } from '@/app/admin/support-messages/useSupportMessages';

interface UseSupportTicketsReturn {
  tickets: SupportTicket[];
  closedTickets: SupportTicket[];
  loading: boolean;
  error: string | null;
  fetchTickets: () => void;
  fetchClosedTickets: {
    refetch: () => void;
    isLoading: boolean;
    data?: SupportTicket[];
  };
  sendMessage: (args: { id: number; message: string }) => Promise<TicketMessage>;
  closeTicket: (args: { id: number; reason?: string }) => Promise<void>;
  reset: () => void;
}

export function useSupportTickets(): UseSupportTicketsReturn {
  const queryClient = useQueryClient();

  // Pobieranie aktywnych ticketów
  const fetchTickets = useQuery<SupportTicket[], Error>({
    queryKey: ['tickets', 'active'],
    queryFn: async () => {
      const data = await SupportApi.getTickets(['new', 'open', 'in_progress'], 5);
      console.log('[useSupportTickets] Fetched active tickets:', data);
      return data;
    },
  });

  // Pobieranie zamkniętych ticketów
  const fetchClosedTickets = useQuery<SupportTicket[], Error>({
    queryKey: ['tickets', 'closed'],
    queryFn: async () => {
      const data = await SupportApi.getTickets(['closed'], 5);
      console.log('[useSupportTickets] Fetched closed tickets:', data);
      return data;
    },
    enabled: false,
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
        const updated = {
          ...old,
          messages: [...(old.messages || []), newMessage],
        };
        console.log('[useSupportTickets] Updated ticketDetails with new message:', updated);
        return updated;
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
      // Aktualizuj szczegóły ticketa
      queryClient.setQueryData(['ticketDetails', id], (old: TicketDetails | undefined) => {
        if (!old) return old;
        const updated = { ...old, status: 'closed' };
        console.log('[useSupportTickets] Updated ticketDetails:', updated);
        return updated;
      });

      // Usuń ticket z listy aktywnych ticketów
      queryClient.setQueryData(['tickets', 'active'], (old: SupportTicket[] | undefined) => {
        if (!old) return old;
        const newActive = old.filter(ticket => ticket.id !== id);
        console.log('[useSupportTickets] Updated active tickets:', newActive);
        return newActive;
      });

      // Dodaj ticket do listy zamkniętych ticketów
      queryClient.setQueryData(['tickets', 'closed'], (old: SupportTicket[] | undefined) => {
        const closedTicket = (fetchTickets.data || []).find(ticket => ticket.id === id);
        if (!closedTicket) {
          console.warn('[useSupportTickets] Closed ticket not found in active tickets:', id);
          return old || [];
        }
        const updatedTicket = { ...closedTicket, status: 'closed' as SupportTicketStatus };
        const newClosed = old ? [...old, updatedTicket] : [updatedTicket];
        console.log('[useSupportTickets] Updated closed tickets:', newClosed);
        return newClosed;
      });

      // Invaliduj zapytania, aby zsynchronizować z serwerem
      // queryClient.invalidateQueries({ queryKey: ['tickets', 'active'] });
      // queryClient.invalidateQueries({ queryKey: ['tickets', 'closed'] });
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
    tickets: fetchTickets.data || [],
    closedTickets: fetchClosedTickets.data || [],
    loading: fetchTickets.isLoading || fetchClosedTickets.isLoading,
    error: fetchTickets.error?.message || fetchClosedTickets.error?.message || null,
    fetchTickets: fetchTickets.refetch,
    fetchClosedTickets: {
      refetch: fetchClosedTickets.refetch,
      isLoading: fetchClosedTickets.isLoading,
      data: fetchClosedTickets.data,
    },
    sendMessage: sendMessage.mutateAsync,
    closeTicket: closeTicket.mutateAsync,
    reset,
  };
}