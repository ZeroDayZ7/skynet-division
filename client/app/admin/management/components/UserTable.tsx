// app/user-management/components/UserTable.tsx
'use client';

import { lazy, Suspense } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import { User } from '../types/user';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { useUserActions } from '../hooks/useUserActions';

// Leniwe ładowanie dialogów
const EditUserDialog = lazy(() => import('./dialogs/EditUserDialog'));
const EditPermissionsDialog = lazy(() => import('./dialogs/EditPermissionsDialog'));
const BlockUserDialog = lazy(() => import('./dialogs/BlockUserDialog'));
const DeleteUserDialog = lazy(() => import('./dialogs/DeleteUserDialog'));

interface UserTableProps {
  users: User[];
  noResults: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({ users, noResults }) => {
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [permissionsUser, setPermissionsUser] = useState<{
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
  } | null>(null);
  const [blockUser, setBlockUser] = useState<{
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    userBlock: boolean;
  } | null>(null);
  const [deleteUser, setDeleteUser] = useState<{
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
  } | null>(null);

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
                const actions = useUserActions(user, setEditUserId, setPermissionsUser, setBlockUser, setDeleteUser);
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.userData?.first_name || '-'}</TableCell>
                    <TableCell>{user.userData?.last_name || '-'}</TableCell>
                    <TableCell>{user.role}</TableCell>
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
                          {actions.map((action) => (
                            <Button
                              key={action.label}
                              variant="ghost"
                              className={`w-full justify-start ${action.destructive ? 'text-destructive' : ''}`}
                              onClick={action.onClick}
                              disabled={action.disabled}
                            >
                              {action.label}
                            </Button>
                          ))}
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
        {editUserId && (
          <EditUserDialog
            userId={editUserId}
            onClose={() => {
              console.log('Zamykam dialog edycji');
              setEditUserId(null);
            }}
          />
        )}
        {permissionsUser && (
          <EditPermissionsDialog
            user={permissionsUser}
            onClose={() => {
              console.log('Zamykam dialog uprawnień');
              setPermissionsUser(null);
            }}
          />
        )}
        {blockUser && (
          <BlockUserDialog
            user={blockUser}
            onClose={() => {
              console.log('Zamykam dialog blokady/odblokowania');
              setBlockUser(null);
            }}
          />
        )}
        {deleteUser && (
          <DeleteUserDialog
            user={deleteUser}
            onClose={() => {
              console.log('Zamykam dialog usuwania');
              setDeleteUser(null);
            }}
          />
        )}
      </Suspense>
    </Card>
  );
};