// components/ClientWrapper.tsx
'use client'

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MessageProvider } from '@/context/MessageContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 5,
    },
  },
});

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
        <QueryClientProvider client={queryClient}>
          <MessageProvider>
            {children}
          </MessageProvider>
        </QueryClientProvider>
  );
}
