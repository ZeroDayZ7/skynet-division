'use client';

import { NotificationsList } from '@/components/notification/NotificationsList';

type NotificationContentProps = {
  notifications: any[]; // Typowanie powinno być bardziej precyzyjne, np. Notification[]
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  loading: boolean;
  error: string | null;
};

const NotificationContent = ({
  notifications,
  total,
  page,
  limit,
  onPageChange,
  loading,
  error,
}: NotificationContentProps) => {
  // Sprawdzamy, czy notifications jest tablicą
  const validNotifications = Array.isArray(notifications) ? notifications : [];

  return (
    <div className="">
      {loading ? (
        <p className="text-center text-gray-500">Ładowanie...</p>
      ) : error ? (
        <p className="text-center text-red-500">Błąd pobierania powiadomień: {error}</p>
      ) : validNotifications.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center mt-4">
          Brak nowych powiadomień.
        </p>
      ) : (
        <NotificationsList
          notifications={validNotifications} // Używamy teraz `validNotifications`
          total={total}
          page={page}
          limit={limit}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default NotificationContent;
