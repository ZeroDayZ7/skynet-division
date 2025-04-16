'use client';

import { memo, useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { useAuth } from '@/context/auth-context';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useGetNotifications } from '@/app/api/notifications/useGetNotifications';
import { NotificationsList } from '@/components/notification/NotificationsList';

const Notifications = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { notifications, loading, error, fetchNotifications } = useGetNotifications();

  const count = user?.notifications ?? 0;
  const displayCount = count > 9 ? '9+' : count;

  // Ładuj powiadomienia po otwarciu
  useEffect(() => {
    if (open) fetchNotifications();
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative inline-block">
          <Button variant="ghost" size="icon">
            <FaBell />
          </Button>
          {count > 0 && (
            <span className="absolute top-0 right-2 translate-x-1/2 -translate-y-1/2 
              bg-orange-300 text-xs font-bold rounded-full w-5 h-5 
              flex items-center justify-center select-none dark:bg-card dark:border dark:text-green-300">
              {displayCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96">
        <SheetHeader>
          <SheetTitle>Powiadomienia</SheetTitle>
          <SheetDescription>Oto Twoje najnowsze powiadomienia.</SheetDescription>
        </SheetHeader>
        <div className=" overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Ładowanie...</p>
          ) : error ? (
            <p className="text-center text-red-500">Błąd: {error}</p>
          ) : notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center mt-4">
              Brak nowych powiadomień.
            </p>
          ) : (
            <NotificationsList notifications={notifications} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default memo(Notifications);
