'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/auth-context';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useGetNotifications } from '@/app/api/notifications/useGetNotifications';
import NotificationButton from './NotificationButton';
import NotificationContent from './NotificationContent';
import debounce from 'lodash.debounce';

const Notifications = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { notifications, total, loading, error, fetchNotifications } = useGetNotifications();
  const [page, setPage] = useState(1);
  const limit = 5;

  const count = user?.notifications ?? 0;

  useEffect(() => {
    if (open) fetchNotifications({ page, limit });
  }, [open, limit, fetchNotifications]);

  const debouncedLoadMore = useCallback(
    debounce(() => {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNotifications({ page: nextPage, limit });
    }, 300),
    [page, limit, fetchNotifications],
  );

  const hasMore = notifications.length < total;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative inline-block">
          <NotificationButton count={count} />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="max-h-screen w-full overflow-y-auto sm:w-96">
        <SheetHeader>
          <SheetTitle>Powiadomienia</SheetTitle>
          <SheetDescription>Oto Twoje najnowsze powiadomienia.</SheetDescription>
        </SheetHeader>
        <NotificationContent notifications={notifications} loading={loading} error={error} onLoadMore={debouncedLoadMore} hasMore={hasMore} />
      </SheetContent>
    </Sheet>
  );
};

export default memo(Notifications);
