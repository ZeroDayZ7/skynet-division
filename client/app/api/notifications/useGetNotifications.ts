'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUnreadNotifications, getReadNotifications } from '@/app/api/notifications';
import { Notification } from '../../../components/notification/types/notification.types';
import debounce from 'lodash.debounce';

interface NotificationsResponse {
  notifications: Notification[];
  total: number;
}

export const useGetNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [afterId, setAfterId] = useState<number | undefined>(undefined);
  const [total, setTotal] = useState<{ unread: number; read: number }>({ unread: 0, read: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateNotificationsContext } = useAuth();

  // Pobieranie powiadomień
  const fetchNotifications = useCallback(
    debounce(
      async ({ limit, type, reset = false }: { limit: number; type: 'unread' | 'read'; reset?: boolean }) => {
        console.log(`Fetching ${type} notifications, afterId: ${afterId}, limit: ${limit}, reset: ${reset}`);
        setLoading(true);
        setError(null);
        try {
          const data = type === 'unread'
            ? await getUnreadNotifications({ afterId, limit })
            : await getReadNotifications({ afterId, limit });

          const newNotifications = data.notifications || [];
          console.log(`Received ${newNotifications.length} notifications, total: ${data.total}`);
          setNotifications((prev) => (reset ? newNotifications : [...prev, ...newNotifications]));
          setAfterId(newNotifications.length > 0 ? newNotifications[newNotifications.length - 1].id : undefined);
          setTotal((prev) => ({
            ...prev,
            [type]: data.total,
          }));
          if (type === 'unread') {
            updateNotificationsContext(data.total);
          }
        } catch (err) {
          console.error(`Error fetching ${type} notifications:`, err);
          setError(err instanceof Error ? err.message : 'Nie udało się pobrać powiadomień');
        } finally {
          setLoading(false);
        }
      },
      300
    ),
    [afterId, updateNotificationsContext]
  );

  const resetNotifications = useCallback(() => {
    setNotifications([]);
    setAfterId(undefined);
    setError(null);
    setLoading(false);
  }, []);

  return {
    notifications,
    total,
    loading,
    error,
    fetchNotifications,
    resetNotifications,
  };
};