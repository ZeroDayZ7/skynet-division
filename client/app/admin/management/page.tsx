'use client';

import { usePermissions } from '@/context/PermissionsContext';
import { useState } from 'react';
import { UserSearch } from './components/UserSearch';
import { UserSearchResults } from './components/UserSearchResults';
import { User } from './types/user';
import { UserActionsProvider } from '@/context/UserActionsContext';

export const UserManagementPage = () => {
  const { permissions, hasPermissionEnabled } = usePermissions();
  

  // Sprawdzenie uprawnień do zarządzania użytkownikami
  if (!permissions || !hasPermissionEnabled('userManagement')) {
    return (
      <div className="text-center text-red-500">
        Brak uprawnień do zarządzania użytkownikami
      </div>
    );
  }

  return (
    <UserActionsProvider>
    <div className="container mx-auto py-6 space-y-6">
      <UserSearch />
      <UserSearchResults/>
    </div>
    </UserActionsProvider>
  );
};

export default UserManagementPage;
