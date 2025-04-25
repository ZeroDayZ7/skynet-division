// components/user-management/UserSearchResults.tsx
'use client';

import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { UserTableHeader } from './UserTableHeader';
import { UserRow } from './UserRow';
import { UserActionsManager } from './UserActionsManager';
import { useUserActions } from '@/context/UserActionsContext';

export const UserSearchResults: React.FC = () => {
  const { users, selectedUser, setSelectedUser } = useUserActions();

  const handleClose = () => {
    setSelectedUser(null);
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
            users.map((user) => <UserRow key={user.id} user={user} />)
          )}
        </TableBody>
      </Table>
      {selectedUser && (
  <UserActionsManager
    selectedUser={selectedUser}
    onClose={handleClose}
  />
)}

    </>
  );
};