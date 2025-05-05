'use client';

import { useCallback, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import dynamic from 'next/dynamic';

interface NotificationContentProps {
  showRead: boolean;
  onToggleShowRead: () => void;
}

interface NotificationsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DynamicNotificationContent = dynamic<NotificationContentProps>(
  () => import('./NotificationContent').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full flex-col items-center justify-center p-6">
        <span className="mr-2 animate-spin">⏳</span> Ładowanie powiadomień...
      </div>
    ),
  },
);

const Notifications = ({ open, onOpenChange }: NotificationsProps) => {
  const [showRead, setShowRead] = useState(false);

  const handleToggleShowRead = useCallback(() => {
    setShowRead((prev) => !prev);
  }, []);

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        console.log('onOpenChange called with:', value);
        onOpenChange(value);
      }}
    >
      <SheetContent
        side="right"
        className="flex max-h-screen w-full flex-col overflow-y-auto sm:w-96"
      >
        <SheetHeader>
          <SheetTitle>
            {showRead ? 'Przeczytane powiadomienia' : 'Powiadomienia'}
          </SheetTitle>
          <SheetDescription>
            {showRead
              ? 'Twoje przeczytane powiadomienia.'
              : 'Twoje nieprzeczytane powiadomienia.'}
          </SheetDescription>
        </SheetHeader>
        {open && (
          <DynamicNotificationContent
            showRead={showRead}
            onToggleShowRead={handleToggleShowRead}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;
