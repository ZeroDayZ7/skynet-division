'use client';

import { lazy, Suspense } from 'react';
import { User } from '../types/user';

const EditPermissionsDialog = lazy(() => import('./dialogs/EditPermissionsDialog'));
const BlockUserDialog = lazy(() => import('./dialogs/BlockUserDialog'));
const DeleteUserDialog = lazy(() => import('./dialogs/DeleteUserDialog'));
const EditUserDialog = lazy(() => import('./dialogs/EditUserDialog'));

interface UserActionsManagerProps {
  selectedUser: {
    user: User;
    action: string;
  } | null;
  onClose: () => void;
}

export const UserActionsManager: React.FC<UserActionsManagerProps> = ({ selectedUser, onClose }) => {
  if (!selectedUser) return null;

  const { user, action } = selectedUser;

  const dialogComponents: Record<string, React.ComponentType<any>> = {
    permissions: EditPermissionsDialog,
    block: BlockUserDialog,
    delete: DeleteUserDialog,
    edit: EditUserDialog,
  };

  const DialogComponent = dialogComponents[action];

  if (!DialogComponent) return null;

  return (
    <Suspense fallback={<div>Ładowanie dialogu...</div>}>
      <DialogComponent
        user={user}
        onClose={onClose}
        isBlockAction={action === 'block' && user.userBlock ? 'unblock' : action}
      />
    </Suspense>
  );
};
