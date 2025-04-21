'use client';

import { lazy, Suspense, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import { User } from '../types/user';
import { Card, CardContent } from '@/components/ui/card';
import { useUserActions } from '../hooks/useUserActions';
import { SelectedUser } from '../types/actions';

const EditUserDialog = lazy(() => import('./dialogs/EditUserDialog'));
const EditPermissionsDialog = lazy(() => import('./dialogs/EditPermissionsDialog'));
const BlockUserDialog = lazy(() => import('./dialogs/BlockUserDialog'));
const DeleteUserDialog = lazy(() => import('./dialogs/DeleteUserDialog'));

interface UserTableProps {
  users: User[];
  noResults: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({ users, noResults }) => {
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  if (process.env.NODE_ENV !== 'production') {
    console.log('UserTable render, selectedUser:', selectedUser);
  }

  const dialogComponents: Record<SelectedUser['action'], React.ComponentType<any>> = {
    edit: EditUserDialog,
    permissions: EditPermissionsDialog,
    block: BlockUserDialog,
    delete: DeleteUserDialog,
  };

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
              {users.map((user) => {
                const actions = useUserActions(user, setSelectedUser);
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.userData?.first_name || '-'}</TableCell>
                    <TableCell>{user.userData?.last_name || '-'}</TableCell>
                    <TableCell>{user.role || '-'}</TableCell>
                    <TableCell>
                      <span
                        className={
                          user.userBlock ? 'font-semibold text-red-500' : 'font-semibold text-green-500'
                        }
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
                          {actions.length > 0 ? (
                            actions.map((action) => (
                              <Button
                                key={action.label}
                                variant="ghost"
                                className={`w-full justify-start ${
                                  action.destructive ? 'text-destructive' : ''
                                }`}
                                onClick={() => {
                                  if (process.env.NODE_ENV !== 'production') {
                                    console.log(`Kliknięto akcję: ${action.label} dla userId: ${user.id}`);
                                  }
                                  action.onClick();
                                }}
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
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Suspense fallback={<div>Ładowanie dialogów...</div>}>
        {selectedUser && (
          (() => {
            const DialogComponent = dialogComponents[selectedUser.action];
            return (
              <DialogComponent
                {...(selectedUser.action === 'edit'
                  ? { userId: selectedUser.id }
                  : { user: selectedUser })}
                onClose={() => setSelectedUser(null)}
              />
            );
          })()
        )}
      </Suspense>
    </Card>
  );
};

export default UserTable;