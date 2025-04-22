'use client';

import { TableRow, TableCell } from '@/components/ui/table';
import { User } from '../types/user';

interface UserRowProps {
  user: User;
  isSelected: boolean;
  toggleSelection: (userId: number) => void;
}

export const UserRow: React.FC<UserRowProps> = ({ user, isSelected, toggleSelection }) => {
  return (
    <TableRow>
      <TableCell>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelection(user.id)}
        />
      </TableCell>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.userData?.first_name || '-'}</TableCell>
      <TableCell>{user.userData?.last_name || '-'}</TableCell>
      <TableCell>{user.role || '-'}</TableCell>
      <TableCell>
        <span
          className={user.userBlock ? 'font-semibold text-red-500' : 'font-semibold text-green-500'}
        >
          {user.userBlock ? 'Zablokowany' : 'Aktywny'}
        </span>
      </TableCell>
    </TableRow>
  );
};
