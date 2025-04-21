// app/user-management/components/UserTable.tsx
'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { UserRow } from './UserRow';
import { UserActionsManager } from './UserActionsManager';
import { User } from '../types/user';
import { SelectedUser } from '../types/actions';

interface UserTableProps {
  users: User[];
  noResults: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({ users, noResults }) => {
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  return (
    <>
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
      </Card>
      <UserActionsManager selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
    </>
  );
};

export default UserTable;