'use client';

import { FaBell } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useNotificationCount } from '@/hooks/useNotificationQueries';
import { useMemo } from 'react';
import { toast } from 'sonner';

interface NotificationButtonProps {
  onClick?: () => void;
}

const NotificationButton = ({ onClick }: NotificationButtonProps) => {
  const { data: countData, isLoading, error } = useNotificationCount();
  const unreadCount = countData?.unread ?? 0;

  if (error) {
    toast.error('Błąd pobierania liczby powiadomień: ' + error.message);
  }

  const displayCount = useMemo(
    () => (unreadCount > 9 ? '9+' : unreadCount),
    [unreadCount],
  );

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={`Powiadomienia${unreadCount > 0 ? `, ${unreadCount} nowe` : ''}`}
      onClick={onClick} // Dodajemy obsługę kliknięcia
    >
      <FaBell />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 flex h-5 w-5 translate-x-1/2 -translate-y-1/2 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white select-none dark:bg-red-600">
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            displayCount
          )}
        </span>
      )}
    </Button>
  );
};

export default NotificationButton;