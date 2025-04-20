'use client';

import { NotificationsList } from './NotificationsList';
import { Notification } from './types/notification.types';

export type NotificationContentProps = {
  notifications: Notification[];
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
};

const NotificationContent = ({ notifications, onLoadMore, hasMore, loading, error }: NotificationContentProps) => {
  const validNotifications = Array.isArray(notifications) ? notifications : [];

  return (
    <div className="flex h-full flex-col p-6">
      {loading ? (
        <p className="text-center text-gray-500">Ładowanie...</p>
      ) : error ? (
        <p className="text-center text-red-500">Błąd: {error}</p>
      ) : validNotifications.length === 0 ? (
        <div className="mt-4 text-center">
          <p className="text-muted-foreground mt-2 text-sm">Brak nowych powiadomień. Jesteś na bieżąco!</p>
        </div>
      ) : (
        <NotificationsList notifications={validNotifications} onLoadMore={onLoadMore} hasMore={hasMore} loading={loading} />
      )}
    </div>
  );
};

export default NotificationContent;
