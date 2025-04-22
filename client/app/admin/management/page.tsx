'use client';

import { usePermissions } from '@/context/PermissionsContext';
import { useState } from 'react';
import { UserSearch } from './components/UserSearch';
import { UserSearchResults } from './components/UserSearchResults';
import { User } from './types/user';

export const UserManagementPage = () => {
  const { permissions, hasPermissionEnabled } = usePermissions();
  const [users, setUsers] = useState<User[]>([]);

  // Sprawdzenie uprawnień do zarządzania użytkownikami
  if (!permissions || !hasPermissionEnabled('userManagement')) {
    return (
      <div className="text-center text-red-500">
        Brak uprawnień do zarządzania użytkownikami
      </div>
    );
  }

  // Callback do odbierania wyników wyszukiwania z UserSearch
  const handleSearchResults = (results: User[]) => {
    console.log(`users: ${JSON.stringify(users, null, 2)}`);
    setUsers(results); // Zapisz wyniki wyszukiwania do stanu
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <UserSearch onSearchResults={handleSearchResults} />
      <UserSearchResults users={users} /> {/* Przekazanie users do UserSearchResults */}
    </div>
  );
};

export default UserManagementPage;
