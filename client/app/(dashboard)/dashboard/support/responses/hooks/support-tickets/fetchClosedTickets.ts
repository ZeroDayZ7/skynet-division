'use client';

import { useQuery } from '@tanstack/react-query';
import * as SupportApi from '../../api';
import { FetchTicketsData } from './types';

export function useFetchClosedTickets(closedPage: number, defaultLimit: number) {
  return useQuery<FetchTicketsData, Error>({
    queryKey: ['tickets', 'closed', closedPage, defaultLimit],
    queryFn: async () => {
      const data = await SupportApi.getTicketsWithPagination(['closed'], defaultLimit, closedPage);
      console.log('[useFetchClosedTickets] Fetched closed tickets:', data);
      return {
        tickets: data.tickets ?? [],
        total: data.total ?? 0,
        page: data.page ?? closedPage,
        limit: data.limit ?? defaultLimit,
      };
    },
    enabled: false,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    // placeholderData: (previous) => previous,
  });
}