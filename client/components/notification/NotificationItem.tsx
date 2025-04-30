'use client';

import { FaCircleCheck, FaTriangleExclamation, FaCircleInfo, FaRegCircleDot, FaCircleDot } from 'react-icons/fa6';
import { Notification, NotificationType } from './types/notification.types';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { memo } from 'react';

// Mapowanie typów powiadomień na ikony
const ICONS: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  success: FaCircleCheck,
  warning: FaTriangleExclamation,
  error: FaTriangleExclamation,
  info: FaCircleInfo,
};

// Funkcja zwracająca klasy CSS
const getNotificationClasses = (type: NotificationType | string, isRead: boolean) => {
  const baseClasses = 'relative flex items-start gap-3 p-4 rounded-md border transition-colors duration-200';
  const typeClasses: Record<NotificationType | 'default', string> = {
    success: 'border-l-4 border-green-500',
    warning: 'border-l-4 border-yellow-500',
    error: 'border-l-4 border-red-500',
    info: 'border-l-4 border-blue-500',
    default: 'border-l-4 border-gray-500',
  };
  const colorClasses = typeClasses[type as NotificationType] || typeClasses.default;
  const readStatusClasses = isRead
    ? 'bg-muted text-muted-foreground opacity-80'
    : 'bg-card text-card-foreground shadow-sm hover:bg-accent/50 cursor-pointer';
  return `${baseClasses} ${colorClasses} ${readStatusClasses}`;
};

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  isMarkingAsRead?: boolean;
}

export const NotificationItem = memo(
  ({ notification, onMarkAsRead, isMarkingAsRead = false }: NotificationItemProps) => {
    const Icon = ICONS[notification.template.type] || FaCircleInfo;
    const isRead = notification.is_read === 1;

    const handleClick = () => {
      if (!isRead && !isMarkingAsRead) {
        onMarkAsRead(notification.id);
      }
    };

    return (
      <li
        key={notification.id}
        className={getNotificationClasses(notification.template.type, isRead)}
        onClick={handleClick}
      >
        <div className={`flex-shrink-0 pt-1 ${isRead ? 'text-gray-400' : 'text-primary'}`}>
          {isRead ? <FaCircleDot size={10} /> : <FaRegCircleDot size={10} />}
        </div>
        <Icon className="mt-1 flex-shrink-0" />
        <div className="flex-1 space-y-1">
          {notification.template.title && (
            <p className={`font-semibold leading-snug ${isRead ? 'text-muted-foreground' : 'text-card-foreground'}`}>
              {notification.template.title}
            </p>
          )}
          <p className={`text-sm leading-relaxed ${isRead ? 'text-muted-foreground' : 'text-card-foreground'}`}>
            {notification.template.message}
          </p>
          {notification.createdAt && (
            <p className="text-xs text-muted-foreground">
              {new Date(notification.createdAt).toLocaleString('pl-PL')}
            </p>
          )}
        </div>
        {!isRead && (
          <Badge
            variant="secondary"
            className={`absolute top-2 right-2 px-2 py-0.5 text-xs cursor-pointer hover:bg-secondary/80 ${
              isMarkingAsRead ? 'pointer-events-none opacity-50' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            aria-label={`Oznacz powiadomienie ${notification.id} jako przeczytane`}
          >
            {isMarkingAsRead ? '...' : 'Nowe'}
          </Badge>
        )}
      </li>
    );
  }
);

NotificationItem.displayName = 'NotificationItem';

export default NotificationItem;