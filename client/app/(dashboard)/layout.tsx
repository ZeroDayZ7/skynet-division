// app/(dashboard)/layout.tsx
'use client'
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SiteHeader } from '@/components/sidebar/site-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import ClientWrapper from '@/components/ClientWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="[--header-height:theme(spacing.14)] h-screen flex flex-col">
      <ClientWrapper>
        <SidebarProvider className="flex flex-col flex-1">
          <SiteHeader />
          <div className="flex flex-1 overflow-hidden">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto p-1 sm:p-2 md:p-4">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </ClientWrapper>
    </div>
  );
}
