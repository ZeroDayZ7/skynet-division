'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { AuthProvider } from '@/context/AuthContext';
import { MessageProvider } from '@/context/MessageContext';
import { Toaster } from '@/components/ui/sonner';
import { ReactNode, memo } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // ❌ zero retry
      refetchOnWindowFocus: false, // ❌ nie odświeżaj przy przełączeniu okna
      refetchOnReconnect: false, // ❌ nie odświeżaj po reconnect
      refetchInterval: false, // ❌ nie powtarzaj cyklicznie
      staleTime: Infinity, // ✅ dane zawsze świeże, nie będzie refetch
      gcTime: 1000 * 60 * 5, // 🧹 trzymamy 5 min
    },
  },
  
});

const ClientWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <MessageProvider>
            {children}
            <Toaster richColors />
          </MessageProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default memo(ClientWrapper);