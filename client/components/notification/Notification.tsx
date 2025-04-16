'use client';

import { memo, useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useGetNotifications } from '@/app/api/notifications/useGetNotifications';
import NotificationButton from './NotificationButton';
import NotificationContent from './NotificationContent';

const Notifications = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { notifications, total, loading, error, fetchNotifications } = useGetNotifications();
  const [page, setPage] = useState(1);
  const limit = 5; // Możesz to dostosować

  const count = user?.notifications ?? 0;

  // Ładuj powiadomienia po otwarciu
  useEffect(() => {
    if (open) fetchNotifications({ page, limit }); // Przekazujesz teraz obiekt z page i limit
  }, [open, page, limit, fetchNotifications]); // Dodajemy fetchNotifications do zależności, aby uniknąć ostrzeżeń o stale zmieniającej się funkcji

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative inline-block">
          <NotificationButton count={count} />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96">
        <SheetHeader>
          <SheetTitle>Powiadomienia</SheetTitle>
          <SheetDescription>Oto Twoje najnowsze powiadomienia.</SheetDescription>
        </SheetHeader>
        <NotificationContent
          notifications={notifications}
          total={total}
          page={page}
          limit={limit}
          onPageChange={onPageChange}
          loading={loading}
          error={error}
        />
      </SheetContent>
    </Sheet>
  );
};

export default memo(Notifications);
