// app/user-management/components/UserInfo.tsx
'use client';

import { cn } from '@/lib/utils';

interface UserInfoProps {
  user: { id: string; email: string; first_name?: string; last_name?: string };
  className?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user, className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      <strong className="font-semibold dark:text-green-500">
        {user.email}
      </strong>
      <samp className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <samp className="font-semibold dark:text-green-500">ID</samp>
        <samp>{user.id}</samp>
        <samp className="font-semibold dark:text-green-500">Email</samp>
        <samp>{user.email}</samp>
        <samp className="font-semibold dark:text-green-500">Imię</samp>
        <samp>{user.first_name || '-'}</samp>
        <samp className="font-semibold dark:text-green-500">Nazwisko</samp>
        <samp>{user.last_name || '-'}</samp>
      </samp>
    </div>
  );
};