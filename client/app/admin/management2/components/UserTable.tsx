'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User } from '../types/user';
import { UserActionsMenu } from './UserActionsMenu';

interface UserTableProps {
  users: User[] | null | undefined; // Dodajemy możliwość, że może to być null lub undefined
  onEditPermissions: (userId: string) => void; // Przekazujemy funkcję do edycji uprawnień
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEditPermissions }) => {
  // Zabezpieczamy się przed błędami, sprawdzając, czy 'users' jest tablicą
  if (!Array.isArray(users)) {
    return <div>Brak danych użytkowników</div>; // Zwracamy komunikat, jeśli dane są nieprawidłowe
  }

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rola</TableHead>
            <TableHead>Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <UserActionsMenu
                    user={user}
                    onEditPermissions={onEditPermissions} // Przekazujemy funkcję do edycji uprawnień
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Brak użytkowników do wyświetlenia
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
