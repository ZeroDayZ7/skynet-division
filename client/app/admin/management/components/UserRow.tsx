import { TableRow, TableCell } from '@/components/ui/table';
import { User } from '../types/user';
import { SelectedUser } from '../types/actions';
import { UserActionsMenu } from './UserActionsMenu';

interface UserRowProps {
  user: User;
  setSelectedUser: (user: SelectedUser | null) => void;
}

export const UserRow: React.FC<UserRowProps> = ({ user, setSelectedUser }) => {
  return (
    <TableRow>
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
      <TableCell>
        <UserActionsMenu user={user} setSelectedUser={setSelectedUser} />
      </TableCell>
    </TableRow>
  );
};
