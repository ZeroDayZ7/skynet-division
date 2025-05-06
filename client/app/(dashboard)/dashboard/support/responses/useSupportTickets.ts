// src/services/useSupportTickets.ts
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as SupportApi from './api';
import { SupportTicket, TicketMessage, TicketDetails } from './types/support';
import { SupportTicketStatus } from '@/app/admin/support-messages/useSupportMessages';

interface UseSupportTicketsReturn {
  tickets: SupportTicket[];
  loading: boolean;
  error: string | null;
  fetchTickets: () => void;
  fetchClosedTickets: () => void;
  sendMessage: (args: { id: number; message: string }) => Promise<TicketMessage>;
  closeTicket: (args: { id: number; reason?: string }) => Promise<void>;
  reset: () => void;
}

export function useSupportTickets(): UseSupportTicketsReturn {
  const queryClient = useQueryClient();

  // Pobieranie aktywnych ticketów
  const fetchTickets = useQuery<SupportTicket[], Error>({
    queryKey: ['tickets', 'active'],
    queryFn: () => SupportApi.getTickets(['new', 'open', 'in_progress'], 5),
  });

  // Pobieranie zamkniętych ticketów
  const fetchClosedTickets = useQuery<SupportTicket[], Error>({
    queryKey: ['tickets', 'closed'],
    queryFn: () => SupportApi.getTickets(['closed'], 5),
    enabled: false,
  });

  // Wysyłanie wiadomości
  const sendMessage = useMutation<TicketMessage, Error, { id: number; message: string }>({
    mutationFn: ({ id, message }) => SupportApi.sendMessage(id, message),
    onSuccess: (newMessage, { id }) => {
      queryClient.setQueryData(['ticketDetails', id], (old: TicketDetails | undefined) => {
        if (!old) return old;
        return {
          ...old,
          messages: [...(old.messages || []), newMessage],
        };
      });
      // queryClient.invalidateQueries({ queryKey: ['ticketDetails', id] });
    },
  });

  // Zamykanie ticketa
  const closeTicket = useMutation<void, Error, { id: number; reason?: string }>({
    mutationFn: ({ id, reason }) => SupportApi.closeTicket(id, reason),
    onSuccess: (_, { id }) => {
      queryClient.setQueryData(['ticketDetails', id], (old: TicketDetails | undefined) => {
        if (!old) return old;
        return {
          ...old,
          status: 'closed',
        };
      });
      queryClient.invalidateQueries({ queryKey: ['tickets', 'active'] });
      queryClient.invalidateQueries({ queryKey: ['tickets', 'closed'] });
    },
  });

  // Resetowanie stanu
  const reset = () => {
    queryClient.removeQueries({ queryKey: ['tickets'] });
    queryClient.removeQueries({ queryKey: ['ticketDetails'] });
  };

  return {
    tickets: fetchTickets.data || [],
    loading: fetchTickets.isLoading || fetchClosedTickets.isLoading,
    error: fetchTickets.error?.message || fetchClosedTickets.error?.message || null,
    fetchTickets: fetchTickets.refetch,
    fetchClosedTickets: fetchClosedTickets.refetch,
    sendMessage: sendMessage.mutateAsync,
    closeTicket: closeTicket.mutateAsync,
    reset,
  };
}