// src/components/SupportTickets.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import * as SupportApi from '../api';
import TicketDetails2 from '../TicketDetails';
import { useSupportTickets } from '../useSupportTickets';
import { useAuth } from '@/context/AuthContext';
import { SupportTicket, TicketDetails } from '../types/support';
import { SupportTicketStatus } from '@/app/admin/support-messages/useSupportMessages';
import { TicketHeader } from './TicketHeader';
import { TicketContent } from './TicketContent';

export default function SupportTickets() {
  const {
    tickets,
    closedTickets,
    ticketsPagination,
    closedTicketsPagination,
    loading,
    error,
    fetchTickets,
    fetchClosedTickets,
  } = useSupportTickets();
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showClosed, setShowClosed] = useState(false);
  const { user } = useAuth();
  const currentUserId = user?.id || 93;

  const { data: selectedTicket, isLoading: ticketLoading, error: ticketError } = useQuery<TicketDetails, Error>({
    queryKey: ['ticketDetails', selectedTicketId],
    queryFn: async () => {
      if (!selectedTicketId) throw new Error('No ticket ID selected');
      const data = await SupportApi.getTicketDetails(selectedTicketId);
      console.log('[SupportTickets] Fetched ticket details:', data);
      return {
        id: selectedTicketId,
        messages: data.messages || [],
        status: data.status as SupportTicketStatus,
        subject: data.subject,
        createdAt: data.createdAt,
        loading: false,
        error: null,
      };
    },
    enabled: !!selectedTicketId,
  });

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleSelectTicket = useCallback(
    (id: number) => {
      const isSame = selectedTicketId === id;
      setSelectedTicketId(isSame ? null : id);
      console.log('[SupportTickets] Selected ticket ID:', id);
    },
    [selectedTicketId]
  );

  const handleShowClosed = useCallback(() => {
    setShowClosed(true);
    console.log('[SupportTickets] Fetching closed tickets');
    fetchClosedTickets.refetch();
  }, [fetchClosedTickets]);

  const handleShowActive = useCallback(() => {
    setShowClosed(false);
  }, []);

  const displayedTickets = showClosed ? closedTickets : tickets;

  const currentPage = showClosed ? closedTicketsPagination.currentPage : ticketsPagination.currentPage;
  const totalPages = showClosed ? closedTicketsPagination.totalPages : ticketsPagination.totalPages;

  const handlePageChange = (page: number) => {
    if (showClosed) {
      fetchClosedTickets.refetch(page);
    } else {
      fetchTickets(page);
    }
  };

  console.log('[SupportTickets] Tickets:', tickets);
  console.log('[SupportTickets] Closed Tickets:', closedTickets);
  console.log('[SupportTickets] Displayed Tickets:', displayedTickets);
  console.log('[SupportTickets] Pagination:', { currentPage, totalPages });

  return (
    <div className="space-y-4">
      <Card>
        <TicketHeader
          showClosed={showClosed}
          onShowClosed={handleShowClosed}
          onShowActive={handleShowActive}
        />
        <TicketContent
          tickets={displayedTickets}
          selectedTicketId={selectedTicketId}
          onSelectTicket={handleSelectTicket}
          loading={loading}
          error={error}
          showClosed={showClosed}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Card>

      {selectedTicketId && (
        <div>
          {ticketLoading && <Loader />}
          {ticketError && <div className="text-center text-red-500">{ticketError.message}</div>}
          {selectedTicket && (
            <TicketDetails2
              ticket={selectedTicket}
              currentUserId={currentUserId}
              onStatusChange={() => {
                fetchTickets();
                if (showClosed) fetchClosedTickets.refetch();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}