'use client';

import { Button } from '@/components/ui/button';
import { NotificationsList } from './NotificationsList';
import { Notification } from './types/notification.types';

export type NotificationContentProps = {
  notifications: Notification[];
  total: number;
  limit: number;
  loading: boolean;
  error: string | null;
  onLoadMore: () => void;
  onRetry: () => void;
  showRead: boolean;
  onToggleShowRead: () => void;
};

const NotificationContent = ({
  notifications,
  total,
  limit,
  loading,
  error,
  onLoadMore,
  onRetry,
  showRead,
  onToggleShowRead,
}: NotificationContentProps) => {
  const validNotifications = Array.isArray(notifications) ? notifications : [];
  const hasMore = validNotifications.length >= limit; // Jeśli zwrócono mniej niż limit, zakładamy, że nie ma więcej powiadomień

  return (
    <div className="flex flex-col h-full p-6">
      {loading && validNotifications.length === 0 ? (
        <p className="text-center text-gray-500">Ładowanie...</p>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-500">Błąd: {error}</p>
          <Button variant="outline" onClick={onRetry} className="mt-2">
            Spróbuj ponownie
          </Button>
        </div>
      ) : validNotifications.length === 0 ? (
        <div className="mt-4 text-center">
          <p className="text-muted-foreground text-sm">
            {showRead ? 'Brak przeczytanych powiadomień.' : 'Brak nowych powiadomień. Jesteś na bieżąco!'}
          </p>
          <Button
            variant="link"
            onClick={onToggleShowRead}
            className="mt-2 text-sm"
            aria-label={showRead ? 'Pokaż nieprzeczytane powiadomienia' : 'Pokaż przeczytane powiadomienia'}
          >
            {showRead ? 'Pokaż nieprzeczytane powiadomienia' : 'Pokaż przeczytane powiadomienia'}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <NotificationsList
            notifications={validNotifications}
            hasMore={hasMore}
            loading={loading}
            onLoadMore={onLoadMore}
          />
          <Button
            variant="link"
            onClick={onToggleShowRead}
            className="text-sm self-center"
            aria-label={showRead ? 'Pokaż nieprzeczytane powiadomienia' : 'Pokaż przeczytane powiadomienia'}
          >
            {showRead ? 'Pokaż nieprzeczytane powiadomienia' : 'Pokaż przeczytane powiadomienia'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationContent;