'use client';

import Notifications from '@/components/notification/Notification';
import LogoutDialog from '@/components/auth/LogoutDialog';
import { ModeToggle } from '@/components/theme/theme-button';

export default function HeaderActions() {
  return (
    <div className="flex">
      <Notifications />
      <ModeToggle />
      <LogoutDialog />
    </div>
  );
}
