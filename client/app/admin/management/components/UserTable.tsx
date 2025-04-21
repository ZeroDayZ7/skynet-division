// app/user-management/components/UserTable.tsx
'use client';

import { lazy, Suspense, useState, useMemo } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { UserRow } from './UserRow';
import { SelectedUser } from '../types/actions';
import { User } from '../types/user';

// Lazy loading dla dialogów
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

  const dialogComponents: Record<SelectedUser['action'], React.ComponentType<any>> = {
    edit: EditUserDialog,
    permissions: EditPermissionsDialog,
    block: BlockUserDialog,
    delete: DeleteUserDialog,
  };

  // Memoizujemy dialog, aby uniknąć niepotrzebnych re-renderów
  const dialog = useMemo(() => {
    if (!selectedUser) return null;
    const DialogComponent = dialogComponents[selectedUser.action];
    return (
      <Suspense fallback={<div>Ładowanie dialogu...</div>}>
        <DialogComponent
          {...(selectedUser.action === 'edit'
            ? { userId: selectedUser.id }
            : { user: selectedUser })}
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
                <UserRow key={user.id} user={user} setSelectedUser={setSelectedUser} />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      {dialog}
    </Card>
  );
};

export default UserTable;