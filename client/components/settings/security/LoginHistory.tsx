// components/settings/security/LoginHistory.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { fetchClient } from '@/lib/fetchClient';
import { toast } from 'sonner';

interface LoginEntry {
  id: number;
  timestamp: string;
  ip: string;
  device?: string;
}

export function LoginHistory() {
  const [history, setHistory] = useState<LoginEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetchClient<LoginEntry[]>('/api/user/login-history');
      setHistory(response);
      setIsHistoryLoaded(true);
    } catch (error: any) {
      toast.error("Błąd", {
        description: 'Nie udało się pobrać historii logowań',
        richColors: true,
        duration: 5000,
        position: "top-center",
        icon: "❌",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!isHistoryLoaded ? (
        <Button
          onClick={loadHistory}
          disabled={isLoading}
          className="w-50"
        >
          {isLoading ? 'Ładowanie...' : 'Pokaż historię logowań'}
        </Button>
      ) : history.length > 0 ? (
        <ul className="space-y-2">
          {history.map((entry) => (
            <li key={entry.id} className="text-sm">
              {new Date(entry.timestamp).toLocaleString()} - IP: {entry.ip}
              {entry.device && ` - Urządzenie: ${entry.device}`}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-muted-foreground">
          Brak historii logowań
        </div>
      )}
    </div>
  );
}