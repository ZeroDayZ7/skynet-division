// app/user-management/components/UserTable.tsx
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import { User } from '../types/user';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface UserTableProps {
  users: User[];
  noResults: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({ users, noResults }) => {
  const router = useRouter();
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [permissionsUserId, setPermissionsUserId] = useState<string | null>(null);
  const [blockUserId, setBlockUserId] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const getActions = (user: User) => [
    { label: 'Edytuj', onClick: () => {
      console.log(`Otwieram dialog edycji dla userId: ${user.id}`);
      setEditUserId(user.id.toString());
    }, destructive: false },
    { label: 'Edytuj uprawnienia', onClick: () => {
      console.log(`Otwieram dialog uprawnień dla userId: ${user.id}`);
      setPermissionsUserId(user.id.toString());
    }, destructive: false },
    { label: user.userBlock ? 'Odblokuj' : 'Zablokuj', onClick: () => {
      console.log(`Otwieram dialog blokady dla userId: ${user.id}`);
      setBlockUserId(user.id.toString());
    }, destructive: false },
    { label: 'Usuń', onClick: () => {
      console.log(`Otwieram dialog usuwania dla userId: ${user.id}`);
      setDeleteUserId(user.id.toString());
    }, destructive: true },
  ];

  return (
    <Card>
      <CardContent>
        {noResults ? (
          <div className="text-center py-4 text-muted-foreground">Brak wyników wyszukiwania.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Imię</TableHead>
                <TableHead>Nazwisko</TableHead>
                <TableHead>Rola</TableHead>
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
      {/* Renderowanie dialogów */}
      <EditUserDialog userId={editUserId} onClose={() => {
        console.log('Zamykam dialog edycji');
        setEditUserId(null);
      }} />
      <EditPermissionsDialog userId={permissionsUserId} onClose={() => {
        console.log('Zamykam dialog uprawnień');
        setPermissionsUserId(null);
      }} />
      <BlockUserDialog userId={blockUserId} onClose={() => {
        console.log('Zamykam dialog blokady');
        setBlockUserId(null);
      }} />
      <DeleteUserDialog userId={deleteUserId} onClose={() => {
        console.log('Zamykam dialog usuwania');
        setDeleteUserId(null);
      }} />
    </Card>
  );
};

import { EditUserDialog } from './dialogs/EditUserDialog';
import { EditPermissionsDialog } from './dialogs/EditPermissionsDialog';
import { BlockUserDialog } from './dialogs/BlockUserDialog';
import { DeleteUserDialog } from './dialogs/DeleteUserDialog';