// components/user-management/UserRow.tsx
'use client';

import { TableRow, TableCell } from '@/components/ui/table';
import { User } from '../types/user';
import { UserActionsMenu } from './UserActionsMenu';

interface UserRowProps {
  user: User;
}

export const UserRow: React.FC<UserRowProps> = ({ user }) => {
  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.userData?.first_name || '-'}</TableCell>
      <TableCell>{user.userData?.last_name || '-'}</TableCell>
      <TableCell>{user.role || '-'}</TableCell>
      <TableCell>
        <span className={user.userBlock ? 'font-semibold text-red-500' : 'font-semibold text-green-500'}>
          {user.userBlock ? 'Zablokowany' : 'Aktywny'}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <UserActionsMenu user={user} />
      </TableCell>
    </TableRow>
  );
};