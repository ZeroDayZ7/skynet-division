import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { InfiniteData } from '@tanstack/react-query';
import { getNotificationsCount, getUnreadNotifications, getReadNotifications, markNotificationsAsRead } from '@/lib/api/notifications';
import { Notification, NotificationsListResponse } from '@/components/notification/types/notification.types';
import { toast } from 'sonner';

// Klucze zapytań
export const notificationKeys = {
  all: ['notifications'] as const,
  counts: () => [...notificationKeys.all, 'counts'] as const,
  lists: () => [...notificationKeys.all, 'lists'] as const,
  list: (type: 'unread' | 'read') => [...notificationKeys.lists(), type] as const,
};

// Hook do pobierania liczby powiadomień
export function useNotificationCount() {
  return useQuery({
    queryKey: notificationKeys.counts(),
    queryFn: getNotificationsCount,
    staleTime: 1000 * 60 * 2,
    enabled: true, // Może być zmienione na !!user, jeśli wymaga autoryzacji
  });
}

// Hook do pobierania listy powiadomień
export function useNotificationList(type: 'unread' | 'read', limit: number = 10) {
  const queryClient = useQueryClient();

  return useInfiniteQuery<NotificationsListResponse, Error>({
    queryKey: notificationKeys.list(type),
    queryFn: ({ pageParam }) => {
      console.log(`[useNotificationList] Fetching ${type} notifications, afterId: ${pageParam}, limit: ${limit}`);
      return type === 'unread'
        ? getUnreadNotifications({ afterId: pageParam as number | undefined, limit })
        : getReadNotifications({ afterId: pageParam as number | undefined, limit });
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce((sum, page) => sum + page.notifications.length, 0);
      if (loadedCount < lastPage.total) {
        const lastNotification = lastPage.notifications[lastPage.notifications.length - 1];
        return lastNotification ? lastNotification.id : undefined;
      }
      return undefined;
    },
    staleTime: 1000 * 60,
  });
}

// Hook do oznaczania powiadomień jako przeczytane
export function useMarkNotificationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => markNotificationsAsRead([notificationId]),
    onMutate: async (notificationId: number) => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.lists() });
      await queryClient.cancelQueries({ queryKey: notificationKeys.counts() });

      const prevUnreadData = queryClient.getQueryData<InfiniteData<NotificationsListResponse>>(notificationKeys.list('unread'));
      const prevReadData = queryClient.getQueryData<InfiniteData<NotificationsListResponse>>(notificationKeys.list('read'));

      queryClient.setQueryData<InfiniteData<NotificationsListResponse>>(
        notificationKeys.list('unread'),
        (oldData) => {
          if (!oldData) return undefined;

          const newData = {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              notifications: page.notifications.filter(notif => notif.id !== notificationId),
            })),
          };
          return newData;
        }
      );

      return { prevUnreadData, prevReadData };
    },
    onSuccess: (data, notificationId) => {
      console.log(`Powiadomienie ${notificationId} oznaczone jako przeczytane.`);
      toast.success('Powiadomienie oznaczone jako przeczytane.');
      queryClient.invalidateQueries({ queryKey: notificationKeys.counts() });
      queryClient.invalidateQueries({ queryKey: notificationKeys.list('unread') });
      queryClient.invalidateQueries({ queryKey: notificationKeys.list('read') });
    },
    onError: (error, notificationId) => {
      console.error(`Błąd oznaczania powiadomienia ${notificationId}:`, error);
      toast.error('Nie udało się oznaczyć powiadomienia.');
    },
  });
}