'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import TicketDetails from '../TicketDetails';
import { useSupportTickets } from '../hooks/support-tickets';
import { useAuth } from '@/context/AuthContext';
import { TicketHeader } from './TicketHeader';
import { TicketContent } from './TicketContent';
import { TicketDetailsSkeleton } from './TicketDetailsSkeleton';

export default function SupportTickets() {
  const { user } = useAuth();
  const currentUserId = user?.id || 93;
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showClosed, setShowClosed] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [closedPage, setClosedPage] = useState(1);
  const defaultLimit = 5;
  const scrollPositionRef = useRef<number>(0);

  const {
    tickets,
    closedTickets,
    ticketsPagination,
    closedTicketsPagination,
    loading,
    error,
    fetchTickets,
    fetchClosedTickets,
    selectedTicket, // Nowe pole
    ticketLoading, // Nowe pole
    ticketError, // Nowe pole
  } = useSupportTickets(activePage, closedPage, defaultLimit, selectedTicketId); // Przekazujemy selectedTicketId

  // Zapis i przywracanie pozycji przewijania
  // useEffect(() => {
  //   const handleScroll = () => {
  //     scrollPositionRef.current = window.scrollY;
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     window.scrollTo(0, scrollPositionRef.current);
  //   }
  // }, [loading]);

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
    setClosedPage(1);
    fetchClosedTickets(1, defaultLimit);
  }, [fetchClosedTickets]);

  const handleShowActive = useCallback(() => {
    setShowClosed(false);
    setActivePage(1);
    fetchTickets(1, defaultLimit);
  }, [fetchTickets]);

  const handlePageChange = useCallback(
    (page: number) => {
      console.log('[SupportTickets] Page change:', { page, showClosed });
      scrollPositionRef.current = window.scrollY; // Zapis pozycji przed zmianą strony
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
        <Card className="w-full">
          {ticketLoading && <TicketDetailsSkeleton />}
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
        </Card>
      )}
    </div>
  );
}