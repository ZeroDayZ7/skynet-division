'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '../types/user';

interface UserTableProps {
  users: User[];
  onEditPermissions: (userId: number) => void;
  canEditPermissions: boolean;
}

export const UserTable = ({ users, onEditPermissions, canEditPermissions }: UserTableProps) => {
  return (
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
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              Brak wyników
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {canEditPermissions && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditPermissions(user.id)}
                  >
                    Edytuj uprawnienia
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};