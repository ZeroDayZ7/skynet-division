'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { fetchClient } from '@/lib/fetchClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type SupportTicketStatus = 'new' | 'open' | 'in_progress' | 'closed';
export type SupportTicketFilterStatus = 'all' | SupportTicketStatus;

export interface SupportTicket {
  id: number;
  user_id: number;
  email: string;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  createdAt: string;
  updatedAt: string;
  response?: string;
  responder_id?: number;
}

export function useSupportMessages() {
  const queryClient = useQueryClient();
  const [activeStatus, setActiveStatus] = useState<SupportTicketFilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Klucz zapytania
  const queryKey = ['tickets', activeStatus, searchQuery, currentPage] as const;

  // Zapytanie do pobierania ticketów
  const { data, isLoading, error, isError } = useQuery({
    queryKey,
    queryFn: async () => {
      const statusParam = activeStatus === 'all' ? '' : `&status=${activeStatus}`;
      const queryParam = searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : '';
      const response = await fetchClient(
        `/api/support/admin/tickets?page=${currentPage}&limit=10${statusParam}${queryParam}`
      );

      if (!response || !Array.isArray(response.tickets) || typeof response.totalPages !== 'number') {
        console.error('Invalid API response structure:', response);
        throw new Error('Invalid data structure from server');
      }

      console.log('API response:', response);

      return {
        tickets: response.tickets as SupportTicket[],
        totalPages: response.totalPages,
      };
    },
    staleTime: 1000 * 60 * 5, // Dane są świeże przez 5 minut
    gcTime: 1000 * 60 * 10, // Dane są w cache przez 10 minut
  });

  // Obsługa błędów
  if (isError && error) {
    console.error('Error fetching tickets:', error);
    toast.error(`Failed to fetch tickets: ${error.message}`);
  }

  // Mutacja do aktualizacji statusu ticketa
  const updateTicketMutation = useMutation({
    mutationFn: async ({ ticketId, response, status }: { ticketId: number; response: string; status: SupportTicketStatus }) => {
      console.log('Attempting to update ticket:', { ticketId, response, status });
      const result = await fetchClient(`/api/support/admin/tickets/${ticketId}/response`, {
        method: 'PATCH',
        body: JSON.stringify({ response, status }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!result || !result.data) {
        console.error('Invalid API response for update:', result);
        throw new Error('Failed to get updated ticket data from server');
      }

      console.log('Ticket update successful, received data:', result.data);
      return result.data as SupportTicket;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<{ tickets: SupportTicket[]; totalPages: number }>(queryKey);

      if (previousData) {
        queryClient.setQueryData(queryKey, {
          ...previousData,
          tickets: previousData.tickets.map((ticket) =>
            ticket.id === variables.ticketId
              ? {
                  ...ticket,
                  status: variables.status,
                  response: variables.response,
                  updatedAt: new Date().toISOString(),
                }
              : ticket
          ),
        });
      }

      return { previousData };
    },
    onError: (error: Error, _variables, context) => {
      console.error('Error updating ticket:', error);
      toast.error(`Failed to update ticket: ${error.message}`);
      if (context && 'previousData' in context && context.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSuccess: () => {
      toast.success('Ticket updated successfully');
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    activeStatus,
    setActiveStatus,
    searchQuery,
    setSearchQuery,
    tickets: data?.tickets || [],
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages: data?.totalPages || 1,
    updateTicketStatus: updateTicketMutation.mutate,
    isUpdating: updateTicketMutation.isPending,
  };
}