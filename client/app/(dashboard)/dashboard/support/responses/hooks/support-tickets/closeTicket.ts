'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SupportApi from '../../api';
import { TicketDetails, SupportTicket, SupportTicketStatus } from './types';

export function useCloseTicket(fetchTicketsData: { tickets: SupportTicket[] } | undefined) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number; reason?: string }>({
    mutationFn: async ({ id, reason }) => {
      await SupportApi.closeTicket(id, reason);
      console.log('[useCloseTicket] Closed ticket ID:', id);
    },
    onSuccess: (_, { id }) => {
      queryClient.setQueryData(['ticketDetails', id], (old: TicketDetails | undefined) => {
        if (!old) return old;
        return { ...old, status: 'closed' as SupportTicketStatus };
      });

      queryClient.setQueryData(
        ['tickets', 'active'],
        (old: { tickets: SupportTicket[]; total: number; page: number; limit: number } | undefined) => {
          if (!old) return old;
          const newActive = old.tickets.filter((ticket) => ticket.id !== id);
          return { ...old, tickets: newActive, total: old.total - 1 };
        }
      );

      queryClient.setQueryData(
        ['tickets', 'closed'],
        (old: { tickets: SupportTicket[]; total: number; page: number; limit: number } | undefined) => {
          const closedTicket = fetchTicketsData?.tickets.find((ticket) => ticket.id === id);
          if (!closedTicket) return old ?? { tickets: [], total: 0, page: 1, limit: 5 };
          const updatedTicket = { ...closedTicket, status: 'closed' as SupportTicketStatus };
          const newClosed = old ? [...old.tickets, updatedTicket] : [updatedTicket];
          return { ...old, tickets: newClosed, total: (old?.total ?? 0) + 1 };
        }
      );

      queryClient.invalidateQueries({ queryKey: ['tickets', 'active'] });
      queryClient.invalidateQueries({ queryKey: ['tickets', 'closed'] });
    },
    onError: (error) => {
      console.error('[useCloseTicket] Error closing ticket:', error);
    },
  });
}