'use client';

import { AppBrand } from "@/components/auth/AppBrand";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">
        Witaj
      </h1>
      w <AppBrand />
      <p className="max-w-xl text-muted-foreground">
        Zarządzaj Polską z jednego miejsca. Monitoruj punkty, kontroluj dostęp, zarządzaj użytkownikami i wykonuj akcje administracyjne z poziomu tego panelu.
      </p>
    </div>
  );
}
