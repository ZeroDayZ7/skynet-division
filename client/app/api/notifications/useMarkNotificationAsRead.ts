'use client';

import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { fetchClient } from '@/lib/fetchClient';

export function useMarkNotificationsAsRead() {
  const [notificationsToMark, setNotificationsToMark] = useState<Set<number>>(new Set());
  const [marked, setMarked] = useState<Set<number>>(new Set()); // do animacji

  const sendBatch = useCallback(
    debounce(async (ids: number[]) => {
      try {
        await fetchClient('/api/users/notifications/read', {
          method: 'PATCH',
          body: JSON.stringify({ ids }),
          // csrf: true,
        });
      } catch (err) {
        console.error('Błąd przy wysyłaniu powiadomień:', err);
      }
    }, 2000),
    []
  );

  const handleNotificationClick = (notificationId: number) => {
    setMarked(prev => new Set(prev).add(notificationId));
    setNotificationsToMark(prev => {
      const next = new Set(prev).add(notificationId);
      sendBatch(Array.from(next));
      return next;
    });
  };

  return { handleNotificationClick, notificationsToMark, marked };
}
