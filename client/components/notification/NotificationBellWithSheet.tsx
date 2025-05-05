'use client';

import { useState } from 'react';
import { NotificationBell } from '../sidebar/ui/NotificationBell';
import Notifications from './Notification';

type NotificationBellWithSheetProps = {
  count?: number;
  label?: string;
  className?: string;
};

const NotificationBellWithSheet = ({
  count = 0,
  label,
  className,
}: NotificationBellWithSheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        <NotificationBell count={count} label={label} className={className} />
      </div>
      <Notifications open={open} onOpenChange={setOpen} />
    </>
  );
};

export default NotificationBellWithSheet;
