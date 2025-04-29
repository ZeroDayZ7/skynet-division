'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import NotificationButton from './NotificationButton';
import NotificationContent from './NotificationContent';
import { useGetNotifications } from '@/app/api/notifications/useGetNotifications';

const Notifications = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [showRead, setShowRead] = useState(false);
  const { notifications, total, loading, error, fetchNotifications, resetNotifications } = useGetNotifications();

  const LIMIT = 5;
  const count = total.unread;

  // Funkcja do ponownego załadowania powiadomień w przypadku błędu
  const handleRetry = useCallback(() => {
    resetNotifications();
    fetchNotifications({ limit: LIMIT, type: showRead ? 'read' : 'unread', reset: true });
  }, [fetchNotifications, resetNotifications, showRead]);

  // Po otwarciu panelu: pobierz pierwszą paczkę powiadomień
  useEffect(() => {
    if (!open) return;
    resetNotifications();
    fetchNotifications({ limit: LIMIT, type: showRead ? 'read' : 'unread', reset: true });
  }, [open, showRead, resetNotifications]);

  // Pokaż więcej
  const handleLoadMore = useCallback(() => {
    fetchNotifications({ limit: LIMIT, type: showRead ? 'read' : 'unread' });
  }, [fetchNotifications, showRead]);

  // Przełącz tryb
  const toggleShowRead = useCallback(() => {
    setShowRead((prev) => !prev);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative inline-block">
          <NotificationButton count={count} />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96 max-h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{showRead ? 'Przeczytane powiadomienia' : 'Powiadomienia'}</SheetTitle>
          <SheetDescription>
            {showRead ? 'Twoje przeczytane powiadomienia.' : 'Twoje nieprzeczytane powiadomienia.'}
          </SheetDescription>
        </SheetHeader>
        <NotificationContent
          notifications={notifications}
          loading={loading}
          onRetry={handleRetry}
          error={error}
          onLoadMore={handleLoadMore}
          showRead={showRead}
          onToggleShowRead={toggleShowRead}
          limit={LIMIT}
          total={showRead ? total.read : total.unread}
        />
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;