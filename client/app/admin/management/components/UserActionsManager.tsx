// app/user-management/components/UserActionsManager.tsx
'use client';

import { lazy, Suspense, useState } from 'react';
import { SelectedUser } from '../types/actions';

// Lazy loading dla dialogów
const EditUserDialog = lazy(() => import('./dialogs/EditUserDialog'));
const EditPermissionsDialog = lazy(() => import('./dialogs/EditPermissionsDialog'));
const BlockUserDialog = lazy(() => import('./dialogs/BlockUserDialog'));
const DeleteUserDialog = lazy(() => import('./dialogs/DeleteUserDialog'));

interface UserActionsManagerProps {
  selectedUser: SelectedUser | null;
  setSelectedUser: (user: SelectedUser | null) => void;
}

export const UserActionsManager: React.FC<UserActionsManagerProps> = ({ selectedUser, setSelectedUser }) => {
  const dialogComponents: Record<SelectedUser['action'], React.ComponentType<any>> = {
    edit: EditUserDialog,
    permissions: EditPermissionsDialog,
    block: BlockUserDialog,
    delete: DeleteUserDialog,
  };

  if (!selectedUser) return null;

  const DialogComponent = dialogComponents[selectedUser.action];
  return (
    <Suspense fallback={<div>Ładowanie dialogu...</div>}>
      <DialogComponent
        {...(selectedUser.action === 'edit'
          ? { userId: selectedUser.id }
          : { user: selectedUser })}
        onClose={() => setSelectedUser(null)}
      />
    </Suspense>
  );
};