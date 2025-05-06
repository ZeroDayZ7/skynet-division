'use client';

import { useQueryClient } from '@tanstack/react-query';
import * as SupportApi from '../../api';

export function useFetchHandlers() {
  const queryClient = useQueryClient();

  const fetchTicketsHandler = (page: number, limit: number, activePage: number, defaultLimit: number) => {
    queryClient.setQueryData(['tickets', 'active', activePage, defaultLimit], undefined);
    queryClient.fetchQuery({
      queryKey: ['tickets', 'active', page, limit],
      queryFn: async () => {
        const data = await SupportApi.getTicketsWithPagination(['new', 'open', 'in_progress'], limit, page);
        console.log('[useFetchHandlers] Fetched active tickets:', data);
        return {
          tickets: data.tickets ?? [],
          total: data.total ?? 0,
          page: data.page ?? page,
          limit: data.limit ?? limit,
        };
      },
    });
  };

  const fetchClosedTicketsHandler = (page: number, limit: number, closedPage: number, defaultLimit: number) => {
    queryClient.setQueryData(['tickets', 'closed', closedPage, defaultLimit], undefined);
    queryClient.fetchQuery({
      queryKey: ['tickets', 'closed', page, limit],
      queryFn: async () => {
        const data = await SupportApi.getTicketsWithPagination(['closed'], limit, page);
        console.log('[useFetchHandlers] Fetched closed tickets:', data);
        return {
          tickets: data.tickets ?? [],
          total: data.total ?? 0,
          page: data.page ?? page,
          limit: data.limit ?? limit,
        };
      },
    });
  };

  return { fetchTicketsHandler, fetchClosedTicketsHandler };
}