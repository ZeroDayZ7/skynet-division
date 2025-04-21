// app/user-management/components/UserRow.tsx
// 'use client';

import { useMemo } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import { User } from '../types/user';
import { useUserActions } from '../hooks/useUserActions';
import { SelectedUser } from '../types/actions';

interface UserRowProps {
  user: User;
  setSelectedUser: (user: SelectedUser | null) => void;
}

export const UserRow: React.FC<UserRowProps> = ({ user, setSelectedUser }) => {
  const actions = useUserActions(user, setSelectedUser);

  // Memoizujemy zawartość PopoverContent, aby uniknąć niepotrzebnych re-renderów
  const actionButtons = useMemo(() => {
    return actions.length > 0 ? (
      actions.map((action) => (
        <Button
          key={action.label}
          variant="ghost"
          className={`w-full justify-start ${action.destructive ? 'text-destructive' : ''}`}
          onClick={() => {
            console.log(`Kliknięto akcję: ${action.label} dla userId: ${user.id}`);
            action.onClick();
          }}
          disabled={action.disabled}
        >
          {action.label}
        </Button>
      ))
    ) : (
      <div className="text-center text-muted-foreground">Brak dostępnych akcji</div>
    );
  }, [actions, user.id]);

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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            {actionButtons}
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};