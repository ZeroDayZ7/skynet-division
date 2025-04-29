'use client';

import { useState, useCallback } from 'react';
import { fetchClient } from '@/lib/fetchClient';
import { useAuth } from '@/context/AuthContext';

// Hook do oznaczania powiadomień
export function useMarkNotificationsAsRead() {
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const { updateNotificationsContext } = useAuth();

  const handleNotificationClick = useCallback(
    async (notificationId: number) => {
      try {
        await fetchClient('/api/users/notifications/read', {
          method: 'PATCH',
          body: JSON.stringify({ ids: [notificationId] }),
          credentials: 'include',
        });
        setMarked((prev) => new Set(prev).add(notificationId));
        updateNotificationsContext((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error('Błąd przy oznaczaniu powiadomienia:', err);
      }
    },
    [updateNotificationsContext]
  );

  return { handleNotificationClick, marked };
}