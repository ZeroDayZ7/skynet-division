'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserList } from './UserList';
import { EditUserDialog } from './EditUserDialog';
import { User } from './types';
import { mockUsers } from './data';

export default function UserManagementPage() {
  // Statyczne dane użytkownika zamiast useUser
  const currentUser: User = {
    id: '1',
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    role: 'admin',
  };
  const currentPermissions = { canEditUser: true };

  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customPermissions, setCustomPermissions] = useState<Record<string, boolean>>({});

  // // Funkcja do pobierania użytkowników z API
  // useEffect(() => {
  //   async function loadUsers() {
  //     const fetchedUsers = await fetchUsers();
  //     setUsers(fetchedUsers);
  //   }
  //   loadUsers();
  // }, []);

  // Sprawdzenie uprawnień
  if (!currentPermissions.canEditUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Brak uprawnień</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Nie masz uprawnień do zarządzania użytkownikami.</p>
        </CardContent>
      </Card>
    );
  }

  // Funkcje zarządzania użytkownikami (zakomentowane dla imitacji)
  // const handleAssignRole = async (role: string) => {
  //   if (!selectedUser) return;
  //   const updatedUser = { ...selectedUser, role, customPermissions: {} };
  //   await updateUser(updatedUser);
  //   setUsers((prev) =>
  //     prev.map((u) => (u.id === selectedUser.id ? updatedUser : u))
  //   );
  //   setSelectedUser(updatedUser);
  //   setCustomPermissions({});
  // };

  // Funkcja do lokalnej zmiany roli (dla podglądu)
  const handleAssignRole = (role: string) => {
    if (!selectedUser) return;
    const updatedUser = { ...selectedUser, role, customPermissions: {} };
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? updatedUser : u))
    );
    setSelectedUser(updatedUser);
    setCustomPermissions({});
  };

  const handlePermissionChange = (key: string, value: boolean) => {
    setCustomPermissions((prev) => ({ ...prev, [key]: value }));
  };

  // const handleSave = async () => {
  //   if (!selectedUser) return;
  //   const updatedUser = { ...selectedUser, customPermissions };
  //   await updateUser(updatedUser);
  //   setUsers((prev) =>
  //     prev.map((u) => (u.id === selectedUser.id ? updatedUser : u))
  //   );
  //   setSelectedUser(updatedUser);
  //   setIsDialogOpen(false);
  // };

  // Funkcja do lokalnego zapisu (dla podglądu)
  const handleSave = () => {
    if (!selectedUser) return;
    const updatedUser = { ...selectedUser, customPermissions };
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? updatedUser : u))
    );
    setSelectedUser(updatedUser);
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Zarządzanie użytkownikami</CardTitle>
        </CardHeader>
        <CardContent>
          <UserList
            users={users}
            onEdit={(user) => {
              setSelectedUser(user);
              setCustomPermissions(user.customPermissions || {});
              setIsDialogOpen(true);
            }}
          />
        </CardContent>
      </Card>
      <EditUserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedUser={selectedUser}
        customPermissions={customPermissions}
        onRoleChange={handleAssignRole}
        onPermissionChange={handlePermissionChange}
        onSave={handleSave}
      />
    </div>
  );
}