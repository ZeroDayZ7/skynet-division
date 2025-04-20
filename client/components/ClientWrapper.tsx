// components/ClientWrapper.tsx
'use client';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { AuthProvider } from '@/context/AuthContext';
import { MessageProvider } from '@/context/MessageContext';
import { Toaster } from '@/components/ui/sonner';
import { ReactNode } from 'react';
import { PermissionsProvider } from '@/context/PermissionsContext';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 2,
//       staleTime: 1000 * 60,
//       gcTime: 1000 * 60 * 5,
//     },
//   },
// });

export function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PermissionsProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {/* <QueryClientProvider client={queryClient}> */}
        <MessageProvider>
          {children}
        </MessageProvider>
        <Toaster richColors position="top-center" />
        {/* </QueryClientProvider> */}
      </ThemeProvider>
      </PermissionsProvider>
    </AuthProvider>
  );
}
