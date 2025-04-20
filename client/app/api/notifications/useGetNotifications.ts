'use client';

import { useCallback, useState } from 'react';
import { fetchClient } from '@/lib/fetchClient';
import { useAuth } from '@/context/AuthContext';
import { Notification } from '@/components/notification/types/notification.types';

interface NotificationsResponse {
  notifications: Notification[];
}

export const useGetNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [total, setTotal] = useState(0);
  // const [limit] = useState(5); // Można dodać możliwość zmiany
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { updateNotificationsContext } = useAuth();

  const fetchNotifications = useCallback(async ({ page, limit }: { page: number, limit: number }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClient<NotificationsResponse & { total: number }>(
        '/api/users/notifications',
        {
          method: 'POST',
          body: JSON.stringify({ page, limit }),
          // csrf: true,
        }
      );
      // console.log(`notifications: ${JSON.stringify(data.notifications, null, 2)}`);
      // setNotifications(data.notifications || []);
      setNotifications((prev) => [...prev, ...(data.notifications || [])]);
      setTotal(data.total || 0);
      
      updateNotificationsContext(data.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nieznany błąd');
    } finally {
      setLoading(false);
    }
  }, []);

  const hasMore = notifications.length < total;

  return {
    notifications,
    total,
    // limit,
    loading,
    error,
    fetchNotifications,
    hasMore
  };
};
