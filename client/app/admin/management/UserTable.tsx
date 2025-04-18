'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import { User } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { editUser, blockUser, deleteUser } from './actions';
import { useRouter } from 'next/navigation';

interface UserTableProps {
  users: User[];
  noResults: boolean;
  onEditPermissions: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, noResults, onEditPermissions }) => {
  const router = useRouter();

  const handleEdit = (user: User) => {
    router.push(`?editUser=${user.id}`);
  };

  const handleBlock = async (user: User) => {
    await blockUser(user.id.toString());
    router.refresh();
  };

  const handleDelete = async (user: User) => {
    await deleteUser(user.id.toString());
    router.refresh();
  };

  const getActions = (user: User) => [
    { label: 'Edytuj', onClick: () => handleEdit(user), destructive: false },
    { label: 'Edytuj uprawnienia', onClick: () => onEditPermissions(user), destructive: false },
    { label: 'Zablokuj', onClick: () => handleBlock(user), destructive: false },
    { label: 'Usuń', onClick: () => handleDelete(user), destructive: true },
  ];

  return (
    <Card>
      <CardContent>
        {noResults ? (
          <div className="text-center py-4 text-muted-foreground">
            Brak wyników wyszukiwania.
          </div>
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
                            onClick={action.onClick}
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
    </Card>
  );
};