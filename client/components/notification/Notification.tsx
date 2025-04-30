'use client';

import { useState, useCallback } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import NotificationButton from './NotificationButton';

interface NotificationContentProps {
  showRead: boolean;
  onToggleShowRead: () => void;
}

const DynamicNotificationContent = dynamic<NotificationContentProps>(
  () => import('./NotificationContent').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col h-full p-6 justify-center items-center">
        <span className="animate-spin mr-2">⏳</span> Ładowanie powiadomień...
      </div>
    ),
  }
);

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [showRead, setShowRead] = useState(false);

  const handleToggleShowRead = useCallback(() => {
    setShowRead((prev) => !prev);
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    console.log('Sheet open state:', isOpen);
    setOpen(isOpen);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        {/* Przekazujemy onClick i ref do Button wewnątrz NotificationButton */}
        <div>
          <NotificationButton onClick={() => setOpen(true)} />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96 max-h-screen overflow-y-auto flex flex-col">
        <SheetHeader>
          <SheetTitle>{showRead ? 'Przeczytane powiadomienia' : 'Powiadomienia'}</SheetTitle>
          <SheetDescription>
            {showRead ? 'Twoje przeczytane powiadomienia.' : 'Twoje nieprzeczytane powiadomienia.'}
          </SheetDescription>
        </SheetHeader>
        {open && (
          <DynamicNotificationContent showRead={showRead} onToggleShowRead={handleToggleShowRead} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;