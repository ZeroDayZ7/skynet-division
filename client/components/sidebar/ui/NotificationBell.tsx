'use client';

import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FC } from 'react';

type NotificationBellProps = {
  count?: number;
  label?: string;
  className?: string;
};

export const NotificationBell: FC<NotificationBellProps> = ({ 
  count = 0, 
  label, 
  className 
}) => {
  const hasNotifications = count > 0;
  const displayCount = count > 9 ? '9+' : count;

  

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      <div className="relative mr-2">
        <Bell
          className={cn(
            'h-5 w-5',
            hasNotifications 
              ? 'text-yellow-500' 
              : 'text-muted-foreground hover:text-foreground'
          )}
        />
        
        {hasNotifications && (
          <span className={cn(
            "absolute -top-2 -right-3 flex items-center justify-center",
            "h-4 w-4 rounded-full text-xs text-yellow-500",
            count > 9 ? "-right-4" : ""

            
          )}>
            {displayCount}
          </span>
        )}
      </div>
      
      {label}

    </div>
  );
};