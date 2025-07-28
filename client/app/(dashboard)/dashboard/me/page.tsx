// app/page.tsx lub Home.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, CheckCircle, Clock, FileWarning } from 'lucide-react';

const MOCK_CASES = [
  {
    id: '1',
    title: 'Wniosek o wydanie dowodu osobistego',
    status: 'W toku',
    icon: Clock,
    updatedAt: '2025-07-24',
  },
  {
    id: '2',
    title: 'Zgłoszenie utraty dokumentu',
    status: 'Zakończone',
    icon: CheckCircle,
    updatedAt: '2025-07-12',
  },
  {
    id: '3',
    title: 'Odwołanie od decyzji administracyjnej',
    status: 'Wymaga działania',
    icon: FileWarning,
    updatedAt: '2025-07-25',
  },
];

export default function CitizenDashboard() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 p-6 text-gray-900">
      <header>
        <h1 className="text-3xl font-bold">Panel Obywatela</h1>
        <p className="text-muted-foreground mt-1">
          Witamy w systemie usług publicznych
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Moje sprawy</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {MOCK_CASES.map((item) => (
            <Card key={item.id} className="border border-gray-200 shadow-none">
              <CardHeader className="flex flex-row items-start gap-4 p-4 pb-2">
                <item.icon className="text-primary mt-1 h-6 w-6" />
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="text-xs">
                    Ostatnia aktualizacja: {item.updatedAt}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-end justify-between p-4 pt-2">
                <Badge
                  variant={
                    item.status === 'Zakończone'
                      ? 'success'
                      : item.status === 'W toku'
                        ? 'default'
                        : 'destructive'
                  }
                >
                  {item.status}
                </Badge>
                <Button size="sm" variant="outline">
                  Szczegóły
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
