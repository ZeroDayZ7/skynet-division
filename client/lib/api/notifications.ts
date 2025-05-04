import { fetchClient } from '../fetchClient';
import { NotificationsListResponse } from '@/components/notification/types/notification.types';
import { z } from 'zod';
import { toast } from 'sonner';

// Schematy walidacji danych API
const NotificationSchema = z.object({
  id: z.number(),
  template: z.object({
    type: z.enum(['success', 'warning', 'error', 'info']),
    title: z.string().optional(),
    message: z.string(),
  }),
  is_read: z.union([z.literal(0), z.literal(1), z.literal(true), z.literal(false)]).transform((val) => {
    // Przekształcamy true na 1, false na 0
    return val === true ? 1 : val === false ? 0 : val;
  }),
  createdAt: z.string().optional(),
});

const NotificationsListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    notifications: z.array(NotificationSchema),
    total: z.number(),
  }),
});

const NotificationCountSchema = z.object({
  success: z.literal(true),
  data: z.object({
    unread: z.number(),
    read: z.number(),
  }),
});

/**
 * Pobiera łączną liczbę nieprzeczytanych powiadomień użytkownika.
 */
export const getUnreadNotificationsCount = async (): Promise<number> => {
  try {
    const url = `/api/users/notifications/count`; // zmień nazwę endpointu dla czytelności
    const response = await fetchClient(url, {
      method: 'GET',
      credentials: 'include',
    });

    // return response.data; // jeśli response wygląda jak { success: true, data: 3 }
    return z.number().parse(response.notifications.unreadCount ?? 0); // jeśli response wygląda jak { success: true, data: 3 }
  } catch (error: any) {
    toast.error('Błąd pobierania liczby powiadomień: ' + error.message);
    throw error;
  }
};
/**
 * Pobiera łączną liczbę przeczytanych i nieprzeczytanych powiadomień użytkownika.
 */
export const getNotificationsCount = async (): Promise<{ unread: number; read: number }> => {
  try {
    const url = `/api/users/notifications/count`;
    const response = await fetchClient(url, {
      method: 'GET',
      credentials: 'include',
    });
    const parsed = NotificationCountSchema.parse(response);
    return parsed.data; // Zwracamy tylko { unread, read }
  } catch (error: any) {
    toast.error('Błąd pobierania liczby powiadomień: ' + error.message);
    throw error;
  }
};

/**
 * Pobiera nieprzeczytane powiadomienia z paginacją.
 */
export const getUnreadNotifications = async ({
  afterId,
  limit,
}: {
  afterId?: number;
  limit: number;
}): Promise<NotificationsListResponse> => {
  try {
    const params = new URLSearchParams({ limit: String(limit) });
    if (afterId !== undefined) {
      params.append('afterId', String(afterId));
    }
    const url = `/api/users/notifications/unread?${params.toString()}`;
    const response = await fetchClient(url, {
      method: 'GET',
      credentials: 'include',
    });
    const parsed = NotificationsListResponseSchema.parse(response);
    return parsed.data;
  } catch (error: any) {
    toast.error('Błąd pobierania nieprzeczytanych powiadomień: ' + error.message);
    throw error;
  }
};

/**
 * Pobiera przeczytane powiadomienia z paginacją.
 */
export const getReadNotifications = async ({
  afterId,
  limit,
}: {
  afterId?: number;
  limit: number;
}): Promise<NotificationsListResponse> => {
  try {
    const params = new URLSearchParams({ limit: String(limit) });
    if (afterId !== undefined) {
      params.append('afterId', String(afterId));
    }
    const url = `/api/users/notifications/read?${params.toString()}`;
    const response = await fetchClient(url, {
      method: 'GET',
      credentials: 'include',
    });
    const parsed = NotificationsListResponseSchema.parse(response);
    return parsed.data;
  } catch (error: any) {
    toast.error('Błąd pobierania przeczytanych powiadomień: ' + error.message);
    throw error;
  }
};

/**
 * Oznacza podane powiadomienia jako przeczytane.
 */
export const markNotificationsAsRead = async (ids: number[]): Promise<void> => {
  if (!ids || ids.length === 0) {
    return;
  }
  try {
    const url = '/api/users/notifications/read';
    await fetchClient(url, {
      method: 'PATCH',
      body: JSON.stringify({ ids }),
      credentials: 'include',
    });
  } catch (error: any) {
    toast.error('Błąd oznaczania powiadomień jako przeczytane: ' + error.message);
    throw error;
  }
};