'use client';

import { useState, useEffect } from 'react';

interface SupportMessage {
  id: number;
  uder_id: number;
  date: string;
  message: string;
  subject: string;
  status: string;
  response: string;
  responder_id: number;
  createdAt: Date;
}

export function useSupportMessages() {
  const [responses, setResponses] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupportMessages = async () => {
      try {
        const response = await fetch('/api/support');
        if (!response.ok) throw new Error('Nie udało się pobrać wiadomości');

        const data = await response.json();
        console.log(`data: ${JSON.stringify(data.data)}`);
        if (data.success) setResponses(data.data);
        else setError('Nie udało się pobrać wiadomości');
      } catch (err) {
        setError('Wystąpił błąd przy pobieraniu wiadomości');
      } finally {
        setLoading(false);
      }
    };

    fetchSupportMessages();
  }, []);

  return { responses, loading, error };
}
