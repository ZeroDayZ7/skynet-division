'use client';

import { NotificationItem } from './NotificationItem';
import { Notification } from './types/notification.types';
import { Button } from '../ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useMemo } from 'react';

interface NotificationsListProps {
  notifications: Notification[];
  hasMore: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  onMarkAsRead: (id: number) => void;
  markingId?: number | null;
}

export const NotificationsList = memo(
  ({
    notifications,
    hasMore,
    isLoading,
    isFetchingNextPage,
    onLoadMore,
    onMarkAsRead,
    markingId,
  }: NotificationsListProps) => {
    const notificationItems = useMemo(
      () =>
        notifications.map((notif) => (
          <motion.div
            key={notif.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          >
            <NotificationItem
              notification={notif}
              onMarkAsRead={onMarkAsRead}
              isMarkingAsRead={markingId === notif.id}
            />
          </motion.div>
        )),
      [notifications, onMarkAsRead, markingId]
    );

    if (!notifications.length) {
      return null;
    }

    return (
      <>
        <ul className="space-y-2" aria-live="polite">
          <AnimatePresence>{notificationItems}</AnimatePresence>
        </ul>
        {hasMore && (
          <div className="text-center mt-4">
            <Button
              variant="outline"
              onClick={onLoadMore}
              disabled={!hasMore || isFetchingNextPage}
              aria-label="Załaduj więcej powiadomień"
            >
              {isFetchingNextPage ? 'Ładowanie...' : 'Pokaż więcej'}
            </Button>
          </div>
        )}
      </>
    );
  }
);

NotificationsList.displayName = 'NotificationsList';

export default NotificationsList;