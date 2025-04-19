// app/user-management/components/UserTable.tsx
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import { User } from '../types/user';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

interface UserTableProps {
  users: User[];
  noResults: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({ users, noResults }) => {
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [permissionsUserId, setPermissionsUserId] = useState<string | null>(null);
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
  } | null>(null); // Zmieniono z deleteUserId na deleteUser

  const getActions = (user: User) => [
    {
      label: 'Edytuj',
      onClick: () => {
        console.log(`Otwieram dialog edycji dla userId: ${user.id}`);
        setEditUserId(user.id.toString());
      },
      destructive: false,
    },
    {
      label: 'Edytuj uprawnienia',
      onClick: () => {
        console.log(`Otwieram dialog uprawnień dla userId: ${user.id}`);
        setPermissionsUserId(user.id.toString());
      },
      destructive: false,
    },
    {
      label: user.userBlock ? 'Odblokuj' : 'Zablokuj',
      onClick: () => {
        console.log(`Otwieram dialog ${user.userBlock ? 'odblokowania' : 'blokady'} dla userId: ${user.id}`);
        setBlockUser({
          id: user.id.toString(),
          email: user.email,
          first_name: user.userData?.first_name,
          last_name: user.userData?.last_name,
          userBlock: user.userBlock,
        });
      },
      destructive: false,
    },
    {
      label: 'Usuń',
      onClick: () => {
        console.log(`Otwieram dialog usuwania dla userId: ${user.id}`);
        setDeleteUser({
          id: user.id.toString(),
          email: user.email,
          first_name: user.userData?.first_name,
          last_name: user.userData?.last_name,
        });
      },
      destructive: true,
    },
  ];

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
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userData?.first_name || '-'}</TableCell>
                  <TableCell>{user.userData?.last_name || '-'}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span className={user.userBlock ? 'font-semibold text-red-500' : 'font-semibold text-green-500'}>{user.userBlock ? 'Zablokowany' : 'Aktywny'}</span>
                  </TableCell>

                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        {getActions(user).map((action) => (
                          <Button
                            key={action.label}
                            variant="ghost"
                            className={`w-full justify-start ${action.destructive ? 'text-destructive' : ''}`}
                            onClick={() => {
                              console.log(`Kliknięto akcję: ${action.label} dla userId: ${user.id}`);
                              action.onClick();
                            }}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <EditUserDialog
        userId={editUserId}
        onClose={() => {
          console.log('Zamykam dialog edycji');
          setEditUserId(null);
        }}
      />
      <EditPermissionsDialog
        userId={permissionsUserId}
        onClose={() => {
          console.log('Zamykam dialog uprawnień');
          setPermissionsUserId(null);
        }}
      />
      <BlockUserDialog
        user={blockUser}
        onClose={() => {
          console.log('Zamykam dialog blokady/odblokowania');
          setBlockUser(null);
        }}
      />
      <DeleteUserDialog
        user={deleteUser}
        onClose={() => {
          console.log('Zamykam dialog usuwania');
          setDeleteUser(null);
        }}
      />
    </Card>
  );
};

import { EditUserDialog } from './dialogs/EditUserDialog';
import { EditPermissionsDialog } from './dialogs/EditPermissionsDialog';
import { BlockUserDialog } from './dialogs/BlockUserDialog';
import { DeleteUserDialog } from './dialogs/DeleteUserDialog';
