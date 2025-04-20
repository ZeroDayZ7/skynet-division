// app/user-management/components/dialogs/DeleteUserDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePermissions } from '@/context/PermissionsContext';
import { deleteUser } from '../../actions/deleteUser';
import { GenericDialog } from './GenericDialog';
import { UserInfo } from '../UserInfo';

interface DeleteUserDialogProps {
  user: { id: string; email: string; first_name?: string; last_name?: string } | null;
  onClose: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, onClose }) => {
  const { permissions } = usePermissions();
  const [open, setOpen] = useState(false);
  console.log(`EEaaaaaaaaaa`);
  useEffect(() => {
    if (user) {
      const hasPermission = !!(permissions?.userDelete?.enabled && !permissions.userDelete.hidden);
      setOpen(!!user && hasPermission);
    }
  }, [user, permissions]);

  if (!user || !permissions?.userDelete?.enabled || permissions.userDelete.hidden) {
    return null;
  }

  const description = (
    <>
      <strong className="font-semibold dark:text-red-500">Czy na pewno chcesz usunąć użytkownika?</strong>
      <UserInfo user={user} />
      <samp className="text-muted-foreground text-sm">Tej akcji nie można cofnąć.</samp>
    </>
  );

  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      title="Usuń użytkownika"
      description={description}
      actionLabel="Usuń"
      action={deleteUser}
      actionArgs={[user.id]}
      destructive
    />
  );
};

export default DeleteUserDialog;