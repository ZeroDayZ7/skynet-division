'use client';

import { useQueryClient } from '@tanstack/react-query';

export function useReset() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.removeQueries({ queryKey: ['tickets'] });
    queryClient.removeQueries({ queryKey: ['ticketDetails'] });
    console.log('[useReset] Reset queries');
  };
}