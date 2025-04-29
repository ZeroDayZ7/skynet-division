// src/app/api/notifications/unread.ts
import { fetchClient } from '@/lib/fetchClient';
import { Notification } from '../../../components/notification/types/notification.types';

interface NotificationsResponse {
  notifications: Notification[];
  total: number;
}

/**
 * Pobiera nieprzeczytane powiadomienia.
 * @param afterId ID ostatniego powiadomienia
 * @param limit Liczba elementów do pobrania
 */
export const getUnreadNotifications = async ({ afterId, limit }: { afterId?: number; limit: number }) => {
  const url = `/api/users/notifications/unread?${afterId ? `afterId=${afterId}&` : ''}limit=${limit}`;
  return fetchClient<NotificationsResponse>(url, {
    method: 'GET',
    credentials: 'include',
  });
};