// components/notifications/NotificationsList.tsx
'use client';

import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { type Notification } from '@/app/api/notifications/useGetNotifications';
import { Badge } from '../ui/badge';

const ICONS = {
  success: FaCheckCircle,
  warning: FaExclamationTriangle,
  error: FaExclamationTriangle,
  info: FaInfoCircle,
};

const getBgColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-green-700 border-l-4 border-green-500 dark:bg-card dark:text-green-200 dark:border-green-400';
    case 'warning':
      return 'text-yellow-700 border-l-4 border-yellow-500 dark:card dark:text-yellow-200 dark:border-yellow-400';
    case 'error':
      return 'text-red-700 border-l-4 border-red-500 dark:card dark:text-red-200 dark:border-red-400';
    case 'info':
      return 'text-blue-700 border-l-4 border-blue-500 dark:card dark:text-blue-100 dark:border-sky-400';
    default:
      return 'text-gray-700 border-l-4 border-gray-500 dark:card dark:text-gray-200 dark:border-gray-400';
  }  
};

export const NotificationsList = ({ notifications }: { notifications: Notification[] }) => {
  return (
    <ul className="space-y-2">
      {notifications.map((notif) => {
        const Icon = ICONS[notif.template.type] || FaInfoCircle;
        return (
          <li
            key={notif.id}
            className={`flex items-start gap-2 p-3 rounded-md border ${getBgColor(notif.template.type)}`}
          >
            <Icon className="mt-1" />
            <div className="flex-1">
              {notif.template.title && <p className="font-semibold">{notif.template.title}</p>}
              <p>{notif.template.message}</p>
              {notif.created_at && (
                <p className="text-xs text-black dark:text-white mt-1">
                  {new Date(notif.created_at).toLocaleString()}
                </p>
              )}
            </div>

            {!notif.is_read && (
              <Badge
                variant="outline"
                className="cursor-pointer whitespace-nowrap"
                // onClick={() => handleMarkAsRead(notif.id)}
              >
                Nowe
              </Badge>
            )}
          </li>
        );
      })}
    </ul>
  );
};