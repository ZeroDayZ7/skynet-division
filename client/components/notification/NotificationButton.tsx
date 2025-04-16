// NotificationButton.tsx
'use client';

import { FaBell } from 'react-icons/fa';
import { Button } from '../ui/button';

type NotificationButtonProps = {
  count: number;
};

const NotificationButton = ({ count }: NotificationButtonProps) => {
  const displayCount = count > 9 ? '9+' : count;

  return (
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
  );
};

export default NotificationButton;
