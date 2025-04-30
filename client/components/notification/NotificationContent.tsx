'use client';

import { Button } from '@/components/ui/button';
import { NotificationsList } from './NotificationsList';
import { useNotificationList, useMarkNotificationMutation } from '@/hooks/useNotificationQueries';
import { useCallback } from 'react';

export type NotificationContentProps = {
  showRead: boolean;
  onToggleShowRead: () => void;
};

const NotificationContent = ({ showRead, onToggleShowRead }: NotificationContentProps) => {
  // Ładujemy tylko jedną listę w zależności od showRead
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useNotificationList(showRead ? 'read' : 'unread', 10);

  // Mapujemy dane na listę powiadomień
  const notifications = data?.pages.flatMap((page) => page.notifications) || [];

  const { mutate: markAsRead, isPending, variables } = useMarkNotificationMutation();

  const handleMarkAsRead = useCallback(
    (id: number) => {
      markAsRead(id);
    },
    [markAsRead]
  );

  return (
    <div className="p-4 flex-1 flex flex-col gap-4">
      <Button variant="outline" onClick={onToggleShowRead}>
        {showRead ? 'Pokaż nieprzeczytane' : 'Pokaż przeczytane'}
      </Button>
      <NotificationsList
        notifications={notifications}
        hasMore={hasNextPage}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
        onMarkAsRead={handleMarkAsRead}
        markingId={isPending ? variables : null}
      />
    </div>
  );
};

export default NotificationContent;