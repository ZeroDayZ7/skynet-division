'use client';

import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { useMarkNotificationsAsRead } from '@/app/api/notifications/useMarkNotificationAsRead';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/badge';
import { Notification, NotificationType } from './types/notification.types';

const ICONS: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  success: FaCheckCircle,
  warning: FaExclamationTriangle,
  error: FaExclamationTriangle,
  info: FaInfoCircle,
};

const BG_COLORS: Record<NotificationType | 'default', string> = {
  success: 'text-green-700 border-l-4 border-green-500 dark:bg-card dark:text-green-200 dark:border-green-400',
  warning: 'text-yellow-700 border-l-4 border-yellow-500 dark:bg-card dark:text-yellow-200 dark:border-yellow-400',
  error: 'text-red-700 border-l-4 border-red-500 dark:bg-card dark:text-red-200 dark:border-red-400',
  info: 'text-blue-700 border-l-4 border-blue-500 dark:bg-card dark:text-blue-100 dark:border-sky-400',
  default: 'text-gray-700 border-l-4 border-gray-500 dark:bg-card dark:text-gray-200 dark:border-gray-400',
};

const getBgColor = (type: NotificationType | string) => BG_COLORS[type as NotificationType] || BG_COLORS.default;

// Lista powiadomień
export const NotificationsList = ({
  notifications,
  hasMore,
  loading,
  onLoadMore,
}: {
  notifications: Notification[];
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}) => {
  const { handleNotificationClick, marked } = useMarkNotificationsAsRead();

  if (notifications.length === 0) return null;

  return (
    <>
      <ul className="space-y-2" aria-live="polite">
        <AnimatePresence>
          {notifications.map((notif) => {
            const Icon = ICONS[notif.template.type] || FaInfoCircle;
            const isMarked = marked.has(notif.id);

            if (isMarked) return null;

            return (
              <motion.li
                key={notif.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                layout
                className={`relative flex items-start gap-3 p-4 rounded-md border ${getBgColor(notif.template.type)}`}
              >
                <Icon className="mt-1 flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  {notif.template.title && (
                    <p className="font-semibold leading-snug">{notif.template.title}</p>
                  )}
                  <p className="text-sm leading-relaxed">{notif.template.message}</p>
                  {notif.createdAt && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(notif.createdAt).toLocaleString('pl-PL')}
                    </p>
                  )}
                </div>
                {!notif.is_read && (
                  <Badge
                    variant="outline"
                    className="absolute top-2 right-2 px-2 py-0.5 text-xs cursor-pointer"
                    onClick={() => handleNotificationClick(notif.id)}
                    aria-label={`Oznacz powiadomienie ${notif.id} jako przeczytane`}
                  >
                    Nowe
                  </Badge>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={onLoadMore}
            className="text-sm px-4 py-2 bg-muted rounded hover:bg-muted-foreground disabled:opacity-50"
            disabled={loading}
            aria-label="Załaduj więcej powiadomień"
          >
            {loading ? 'Ładowanie...' : 'Pokaż więcej'}
          </button>
        </div>
      )}
    </>
  );
};