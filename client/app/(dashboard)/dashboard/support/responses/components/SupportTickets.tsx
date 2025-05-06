'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import * as SupportApi from '../api';
import TicketDetails from '../TicketDetails';
import { useSupportTickets } from '../hooks/useSupportTickets';
import { useAuth } from '@/context/AuthContext';
import { TicketDetails as TicketDetailsType } from '../types/support';
import { SupportTicketStatus } from '@/app/admin/support-messages/useSupportMessages';
import { TicketHeader } from './TicketHeader';
import { TicketContent } from './TicketContent';
import { Loader } from '@/components/ui/loader';

export default function SupportTickets() {
  const { user } = useAuth();
  const currentUserId = user?.id || 93;
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showClosed, setShowClosed] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [closedPage, setClosedPage] = useState(1);
  const defaultLimit = 5;

  const {
    tickets,
    closedTickets,
    ticketsPagination,
    closedTicketsPagination,
    loading,
    error,
    fetchTickets,
    fetchClosedTickets,
  } = useSupportTickets(activePage, closedPage, defaultLimit);

  const { data: selectedTicket, isLoading: ticketLoading, error: ticketError } = useQuery<
    TicketDetailsType,
    Error
  >({
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
      };
    },
    enabled: !!selectedTicketId,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

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
    setClosedPage(1); // Reset strony przy zmianie widoku
    fetchClosedTickets(1, defaultLimit);
  }, [fetchClosedTickets]);

  const handleShowActive = useCallback(() => {
    setShowClosed(false);
    setActivePage(1); // Reset strony przy zmianie widoku
    fetchTickets(1, defaultLimit);
  }, [fetchTickets]);

  const handlePageChange = useCallback(
    (page: number) => {
      console.log('[SupportTickets] Page change:', { page, showClosed });
      if (showClosed) {
        setClosedPage(page);
        fetchClosedTickets(page, defaultLimit);
      } else {
        setActivePage(page);
        fetchTickets(page, defaultLimit);
      }
    },
    [showClosed, fetchTickets, fetchClosedTickets]
  );

  const displayedTickets = showClosed ? closedTickets : tickets;
  const currentPage = showClosed ? closedTicketsPagination.currentPage : ticketsPagination.currentPage;
  const totalPages = showClosed ? closedTicketsPagination.totalPages : ticketsPagination.totalPages;

  console.log('[SupportTickets] Tickets:', tickets);
  console.log('[SupportTickets] Closed Tickets:', closedTickets);
  console.log('[SupportTickets] Displayed Tickets:', displayedTickets);
  console.log('[SupportTickets] Pagination:', { currentPage, totalPages });
  console.log('[SupportTickets] Loading:', loading, 'Error:', error);

  return (
    <div className="space-y-4">
      <Card>
        <TicketHeader showClosed={showClosed} onShowClosed={handleShowClosed} onShowActive={handleShowActive} />
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
            <TicketDetails
              ticket={selectedTicket}
              currentUserId={currentUserId}
              onStatusChange={() => {
                if (showClosed) {
                  fetchClosedTickets(closedPage, defaultLimit);
                } else {
                  fetchTickets(activePage, defaultLimit);
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}