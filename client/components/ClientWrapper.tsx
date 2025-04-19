// components/ClientWrapper.tsx
'use client';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { AuthProvider } from '@/context/auth-context';
import { ErrorProvider } from '@/context/ErrorContext';
import { Toaster } from '@/components/ui/sonner';
import { ReactNode } from 'react';

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
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {/* <QueryClientProvider client={queryClient}> */}
        <ErrorProvider>{children}</ErrorProvider>
        <Toaster richColors position="top-center" />
        {/* </QueryClientProvider> */}
      </ThemeProvider>
    </AuthProvider>
  );
}
