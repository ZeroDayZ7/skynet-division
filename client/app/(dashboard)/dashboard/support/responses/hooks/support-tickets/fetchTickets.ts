'use client';

import { useQuery } from '@tanstack/react-query';
import * as SupportApi from '../../api';
import { FetchTicketsData } from './types';

export function useFetchTickets(activePage: number, defaultLimit: number) {
  return useQuery<FetchTicketsData, Error>({
    queryKey: ['tickets', 'active', activePage, defaultLimit],
    queryFn: async () => {
      const data = await SupportApi.getTicketsWithPagination(['new', 'open', 'in_progress'], defaultLimit, activePage);
      console.log('[useFetchTickets] Fetched active tickets:', data);
      return {
        tickets: data.tickets ?? [],
        total: data.total ?? 0,
        page: data.page ?? activePage,
        limit: data.limit ?? defaultLimit,
      };
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    placeholderData: (previous) => previous,
  });
}