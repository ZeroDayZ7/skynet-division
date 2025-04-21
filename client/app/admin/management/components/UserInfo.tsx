// app/user-management/components/UserInfo.tsx
'use client';

import { cn } from '@/lib/utils';

interface UserInfoProps {
  user: { id: number; email: string; first_name?: string; last_name?: string };
  className?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user, className }) => {
  return (
    <span className={cn('space-y-2', className)}>
      <span className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <span className="font-semibold dark:text-green-500">ID</span>
        <span>{user.id}</span>
        <span className="font-semibold dark:text-green-500">Email</span>
        <span>{user.email}</span>
        <span className="font-semibold dark:text-green-500">Imię</span>
        <span>{user.first_name || '-'}</span>
        <span className="font-semibold dark:text-green-500">Nazwisko</span>
        <span>{user.last_name || '-'}</span>
      </span>
    </span>
  );
};