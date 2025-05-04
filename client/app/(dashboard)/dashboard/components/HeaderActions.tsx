'use client';

import Notifications from '@/components/notification/Notification';
import { ModeToggle } from '@/components/theme/theme-button';

export default function HeaderActions() {
  return (
    <div className="flex relative">
      <ModeToggle />
    </div>
  );
}
