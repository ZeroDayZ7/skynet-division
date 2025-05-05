'use client';

import { useState, useEffect, useCallback } from 'react';

interface SupportMessage {
  id: number;
  createdAt: Date;
  subject: string;
  status: string;
  SupportMessages: {
    id: number;
    message: string;
    sender_id: number;
    sender: {
      username: string;
      role: string;
    };
  }[];
}

export function useSupportMessages() {
  const [responses, setResponses] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSupportMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/support');
      if (!response.ok) throw new Error('Nie udało się pobrać wiadomości');

      const data = await response.json();
      console.log(`data: ${JSON.stringify(data.data, null, 2)}`);
      if (data.success) setResponses(data.data);
      else setError('Nie udało się pobrać wiadomości');
    } catch (err) {
      setError('Wystąpił błąd przy pobieraniu wiadomości');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSupportMessages();
  }, [fetchSupportMessages]);

  return { responses, loading, error, refetch: fetchSupportMessages };
}