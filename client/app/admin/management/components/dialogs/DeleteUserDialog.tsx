'use client';

import { useCallback } from 'react';
import { GenericDialog } from './GenericDialog';
import { UserInfo } from '../UserInfo';
import { SelectedUser } from '../../types/actions';
import { deleteUser } from '../../actions/deleteUser';

interface DeleteUserDialogProps {
  user: SelectedUser;
  onClose: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, onClose }) => {
  const handleDelete = useCallback(async () => {
    return await deleteUser(user.id); // Konwersja number na string
  }, [user.id]);

  return (
    <GenericDialog
      open={!!user}
      onClose={onClose}
      title="Usuń użytkownika"
      description={
        <>
          <span>Czy na pewno chcesz usunąć tego użytkownika?</span>
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