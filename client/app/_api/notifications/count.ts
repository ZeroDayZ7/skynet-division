import { fetchClient } from '@/lib/fetchClient';
import { Notification } from '../../../components/notification/types/notification.types';

interface NotificationsResponse {
  notifications: Notification[];
  total: number;
}

export const getNotificationsCount = async () => {
    const url = `/api/users/notifications/count`;
    return fetchClient<{ unread: number; read: number }>(url, {
      method: 'GET',
      credentials: 'include',
    });
  };