'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MoreHorizontal } from 'lucide-react';

export default function ManageLogins() {
  const mockSessions = [
    {
      id: 1,
      device: 'Chrome (Windows)',
      location: 'Warszawa, Polska',
      ip: '192.168.1.5',
      current: true,
      lastActive: 'Dzisiaj, 13:22',
    },
    {
      id: 2,
      device: 'Safari (iPhone)',
      location: 'Kraków, Polska',
      ip: '192.168.1.11',
      current: false,
      lastActive: 'Wczoraj, 22:14',
    },
    {
      id: 3,
      device: 'Firefox (Linux)',
      location: 'Poznań, Polska',
      ip: '192.168.1.33',
      current: false,
      lastActive: '3 dni temu',
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Zarządzaj logowaniami</CardTitle>
        <p className="text-sm text-muted-foreground">
          Poniżej znajdziesz listę aktywnych sesji. Możesz wylogować wybrane urządzenia.
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[300px] pr-2">
          {mockSessions.map((session, index) => (
            <div key={session.id}>
              <div className="flex justify-between items-center py-3">
                <div className="space-y-0.5">
                  <p className="font-medium">{session.device}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.location} • {session.ip}
                  </p>
                  <p className="text-xs text-muted-foreground">{session.lastActive}</p>
                </div>

                <div className="flex items-center gap-2">
                  {session.current ? (
                    <Badge variant="outline">To urządzenie</Badge>
                  ) : (
                    <Button size="sm" variant="outline">
                      Wyloguj
                    </Button>
                  )}
                  <Button size="icon" variant="ghost">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {index < mockSessions.length - 1 && <Separator />}
            </div>
          ))}
        </ScrollArea>

        <div className="mt-6 text-right">
          <Button variant="destructive" size="sm">
            Wyloguj wszystkie inne urządzenia
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
