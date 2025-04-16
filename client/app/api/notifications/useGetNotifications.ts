'use client';

import { useCallback, useState } from 'react';
import { fetchClient } from '@/lib/fetchClient';

export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export interface Notification {
  id: number;
  template: {
    type: NotificationType;
    title?: string;
    message: string;
  };
  is_read?: boolean;
  created_at?: string;
}

interface NotificationsResponse {
  notifications: Notification[];
}

export const useGetNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClient<NotificationsResponse>('/api/users/notifications', {
        method: 'POST',
        body: JSON.stringify({ page: 1, limit: 10 }),
        csrf: true,
      });

      setNotifications(data.notifications || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nieznany błąd');
    } finally {
      setLoading(false);
    }
  }, []);

  return { notifications, loading, error, fetchNotifications };
};
