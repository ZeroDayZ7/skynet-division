'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { User } from '../types/user';
import { usePermissions } from '@/context/PermissionsContext';
import { UserTableHeader } from './UserTableHeader';

export const UserSearchResults: React.FC<{ users: User[] }> = ({ users }) => {
  const { hasPermissionEnabled } = usePermissions();
  const canEditPermissions = hasPermissionEnabled('userManagement');
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  return (
    <>
      <Table>
        <UserTableHeader />
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Brak wyników
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className='text-center'>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userData.first_name}</TableCell>
                <TableCell>{user.userData.last_name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell
                  className={user.userBlock ? 'text-red-500' : 'text-green-500'}
                >
                  {user.userBlock ? 'Zablokowany' : 'Aktywny'}
                </TableCell>
                <TableCell>
                  {canEditPermissions && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditUser(user)}
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
    </>
  );
};
