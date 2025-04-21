'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserTable } from './components/UserTable';
import { EditPermissionsDialog } from './components/dialogs/EditPermissionsDialog';
import { searchUsers } from './actions/searchUsers';
import { usePermissions } from '@/context/PermissionsContext';
import { User } from './types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const roles = ['user', 'admin', 'superadmin', 'moderator'];

export const UserManagementPage = () => {
  const { permissions, hasPermissionEnabled } = usePermissions();
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sprawdzenie uprawnień do zarządzania użytkownikami
  if (!permissions || !hasPermissionEnabled('userManagement')) {
    return (
      <div className="text-center text-red-500">Brak uprawnień do zarządzania użytkownikami</div>
    );
  }

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const criteria = {
        email: email.trim(),
        id: userId.trim(),
        role: role || undefined,
      };
      const fetchedUsers = await searchUsers(criteria);
      setUsers(fetchedUsers || []);
    } catch (error) {
      console.error('Błąd podczas wyszukiwania użytkowników:', error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPermissions = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Zarządzanie użytkownikami</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-xs"
            />
            <Input
              placeholder="ID użytkownika"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="max-w-xs"
            />
            <Select value={role || ''} onValueChange={(value) => setRole(value || null)}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Wybierz rolę" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Wszystkie role</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wyszukiwanie...
                </>
              ) : (
                'Szukaj'
              )}
            </Button>
          </div>

          <UserTable
            users={users}
            onEditPermissions={handleEditPermissions}
            canEditPermissions={hasPermissionEnabled('userEditPermissions')}
          />

          <EditPermissionsDialog
            isOpen={isEditDialogOpen}
            userId={selectedUser?.id ? Number(selectedUser.id) : null}
            user={selectedUser}
            onClose={() => {
              setEditDialogOpen(false);
              setSelectedUser(null);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementPage;