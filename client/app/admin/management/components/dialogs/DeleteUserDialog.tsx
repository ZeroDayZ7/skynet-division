// app/user-management/components/dialogs/DeleteUserDialog.tsx
'use client';

import { useCallback } from 'react';
import { GenericDialog } from './GenericDialog';
import { UserInfo } from '../UserInfo';
import { SelectedUser } from '../../types/actions';
import { deleteUser } from '../../actions/deleteUser'; // Assume this exists

interface DeleteUserDialogProps {
  user: SelectedUser;
  onClose: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, onClose }) => {

  const handleDelete = useCallback(async () => {
    return await deleteUser(user.id);
  }, [user.id]);

  return (
    <GenericDialog
      open={!!user}
      onClose={onClose}
      title="Usuń użytkownika"
      description={
        <>
          <samp>Czy na pewno chcesz usunąć tego użytkownika?</samp>
          <UserInfo user={user} className="mt-4" />
        </>
      }
      actionLabel="Usuń"
      action={handleDelete}
      actionArgs={[]}
      destructive={true}
    />
  );
};

export default DeleteUserDialog;