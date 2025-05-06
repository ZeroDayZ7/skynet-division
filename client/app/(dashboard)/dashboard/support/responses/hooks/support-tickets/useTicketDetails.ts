'use client';

import { useQuery } from '@tanstack/react-query';
import * as SupportApi from '../../api';
import { TicketDetails as TicketDetailsType, SupportTicketStatus } from '../../types/support';


export function useTicketDetails(selectedTicketId: number | null) {
  return useQuery<TicketDetailsType, Error>({
    queryKey: ['ticketDetails', selectedTicketId],
    queryFn: async () => {
      if (!selectedTicketId) throw new Error('No ticket ID selected');
      const data = await SupportApi.getTicketDetails(selectedTicketId);
      // console.log('[useTicketDetails] Fetched ticket details:', data);
      return {
        id: data.id,
        messages: data.messages || [],
        status: data.status as SupportTicketStatus,
        subject: data.subject,
        createdAt: data.createdAt,
        loading: false,
        error: null,
      };
    },
    enabled: !!selectedTicketId,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: (previous) => previous,
    
  });
}