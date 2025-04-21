// app/user-management/components/UserTable.tsx
'use client';

import { lazy, Suspense, useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import { User } from '../types/user';
import { Card, CardContent } from '@/components/ui/card';
import { useUserActions } from '../hooks/useUserActions';
import { SelectedUser } from '../types/actions';

// Lazy load only the needed dialog
const DeleteUserDialog = lazy(() => import('./dialogs/DeleteUserDialog'));

interface UserTableProps {
  users: User[];
  noResults: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({ users, noResults }) => {
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  // Memoize dialog rendering to prevent unnecessary re-renders
  const dialog = useMemo(() => {
    if (!selectedUser || selectedUser.action !== 'delete') return null;
    return (
      <Suspense fallback={<div>Ładowanie dialogu...</div>}>
        <DeleteUserDialog
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      </Suspense>
    );
  }, [selectedUser]);

  return (
    <Card>
      <CardContent>
        {noResults ? (
          <div className="text-muted-foreground py-4 text-center">Brak wyników wyszukiwania.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Imię</TableHead>
                <TableHead>Nazwisko</TableHead>
                <TableHead>Rola</TableHead>
                <TableHead>Status blokady</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onAction={setSelectedUser}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      {dialog}
    </Card>
  );
};

// Move UserRow to UserTable to avoid separate file issues
interface UserRowProps {
  user: User;
  onAction: (user: SelectedUser | null) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onAction }) => {
  const actions = useUserActions(user, onAction);

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
      <TableCell>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            {actions.length > 0 ? (
              actions.map((action) => (
                <Button
                  key={action.permissionKey}
                  variant="ghost"
                  className={`w-full justify-start ${action.destructive ? 'text-destructive' : ''}`}
                  onClick={action.onClick}
                  disabled={action.disabled}
                >
                  {action.label}
                </Button>
              ))
            ) : (
              <div className="text-center text-muted-foreground">Brak dostępnych akcji</div>
            )}
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default UserTable;