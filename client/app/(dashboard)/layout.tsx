// app/(dashboard)/layout.tsx
'use client'
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SiteHeader } from '@/components/sidebar/site-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import ClientWrapper from '@/components/ClientWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <ClientWrapper>
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1 mx-2">
            <AppSidebar />
            {children}
          </div>
        </SidebarProvider>
      </ClientWrapper>
    </div>
  );
}
