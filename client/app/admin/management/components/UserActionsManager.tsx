'use client';

import { lazy, Suspense } from 'react';
import { User } from '../types/user';

const EditPermissionsDialog = lazy(() => import('./dialogs/EditPermissionsDialog'));
const BlockUserDialog = lazy(() => import('./dialogs/BlockUserDialog'));
const DeleteUserDialog = lazy(() => import('./dialogs/DeleteUserDialog'));

interface UserActionsManagerProps {
  selectedUsers: User[];
  action: string;
  onClose: () => void;
}

export const UserActionsManager: React.FC<UserActionsManagerProps> = ({ selectedUsers, action, onClose }) => {
  const dialogComponents: Record<string, React.ComponentType<any>> = {
    permissions: EditPermissionsDialog,
    block: BlockUserDialog,
    delete: DeleteUserDialog,
  };

  const DialogComponent = dialogComponents[action];

  if (!DialogComponent || selectedUsers.length === 0) return null;

  return (
    <Suspense fallback={<div>Ładowanie dialogu...</div>}>
      <DialogComponent
        users={selectedUsers}
        onClose={onClose}
        isBlockAction={action === 'block' && selectedUsers.every((user) => user.userBlock) ? 'unblock' : action}
      />
    </Suspense>
  );
};