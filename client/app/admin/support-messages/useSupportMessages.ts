'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchClient } from '@/lib/fetchClient';

export type SupportTicketStatus = 'open' | 'inprogress' | 'closed';

export interface SupportTicket {
  id: number;
  user_id: number;
  email: string;
  subject: string;
  message: string;
  status: Exclude<SupportTicketStatus, 'all'>;
  createdAt: string;
  updatedAt: string;
}

export function useSupportMessages() {
  const [activeStatus, setActiveStatus] = useState<SupportTicketStatus>('open');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const response = await fetchClient(`/api/support/admin/tickets?status=${activeStatus}&query=${searchQuery}&page=${currentPage}`);
      
      // Zabezpieczenie przed brakiem danych
      if (!response) {
        throw new Error('Empty response from server');
      }
    console.log(`res: ${JSON.stringify(response)}`);
      // Sprawdź czy odpowiedź zawiera tickets i totalPages
      const ticketsData = Array.isArray(response.tickets) ? response.tickets : [];
      const pagesTotal = typeof response.totalPages === 'number' ? response.totalPages : 1;

      setTickets(ticketsData);
      setTotalPages(pagesTotal);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to fetch tickets');
      setTickets([]); // Ustaw puste tickets w przypadku błędu
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [activeStatus, searchQuery, currentPage]);

  const updateTicketStatus = async (ticketId: number, response: string, status: SupportTicketStatus) => {
    try {
      await fetchClient(`/api/support/admin/tickets/${ticketId}/response`, {
        method: 'PATCH',
        body: JSON.stringify({
          response,
          status
        }),
      });
      toast.success('Status updated successfully');
      setActiveStatus(status);
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error('Failed to update ticket status');
    }
  };
  

  return {
    activeStatus,
    setActiveStatus,
    searchQuery,
    setSearchQuery,
    tickets,
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    updateTicketStatus,
  };
}