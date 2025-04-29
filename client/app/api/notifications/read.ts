// src/app/api/notifications/read.ts
import { fetchClient } from '@/lib/fetchClient';
import { Notification } from '../../../components/notification/types/notification.types';

interface NotificationsResponse {
  notifications: Notification[];
  total: number;
}

/**
 * Pobiera przeczytane powiadomienia.
 * @param afterId ID ostatniego powiadomienia
 * @param limit Liczba elementów do pobrania
 */
export const getReadNotifications = async ({ afterId, limit }: { afterId?: number; limit: number }) => {
  const url = `/api/users/notifications/read?${afterId ? `afterId=${afterId}&` : ''}limit=${limit}`;
  return fetchClient<NotificationsResponse>(url, {
    method: 'GET',
    credentials: 'include',
  });
};