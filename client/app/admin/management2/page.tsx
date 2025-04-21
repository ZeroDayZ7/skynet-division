'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserTable } from './components/UserTable';
import { User } from './types/user';
import { EditPermissionsDialog } from './components/EditPermissionsModal';
import { searchUsers } from './lib/searchUsers';

const roles = ['user', 'admin', 'superadmin', 'moderator'];

export const UserManagementPage = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const fetchUsers = async () => {
    const criteria = {
      email,
      id: userId,
      role,
    };
    const fetchedUsers = await searchUsers(criteria);
    setUsers(fetchedUsers);
  };

  const handleEditPermissions = (userId: string) => {
    setUserId(userId); // Ustawiamy userId, aby później przekazać je do dialogu
    setEditDialogOpen(true); // Otwieramy dialog do edycji uprawnień
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Zarządzanie użytkownikami</h1>

      <div className="flex flex-wrap gap-4">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <Button onClick={fetchUsers}>Szukaj</Button>
      </div>

      <UserTable users={users} onEditPermissions={handleEditPermissions} />

      {/* Dialog do edycji uprawnień */}
      <EditPermissionsDialog
        isOpen={isEditDialogOpen}
        userId={userId}
        onClose={() => setEditDialogOpen(false)} // Zamykamy dialog po zapisaniu
      />
    </div>
  );
};

export default UserManagementPage;
