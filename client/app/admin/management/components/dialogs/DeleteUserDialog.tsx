// components/user-management/dialogs/DeleteUserDialog.tsx
'use client';

import { useCallback } from 'react';
import { GenericDialog } from './GenericDialog';
import { User } from '../../types/user';
import { deleteUser } from '@/app/admin/management/actions/deleteUser'; // Poprawny import

interface DeleteUserDialogProps {
  user: User;
  onClose: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, onClose }) => {
  const handleDelete = useCallback(async () => {
    const result = await deleteUser(user.id);
    return {
      success: result.success,
      message: result.success
        ? 'Użytkownik został usunięty.'
        : result.message || 'Nie udało się usunąć użytkownika.',
    };
  }, [user]);

  return (
    <GenericDialog
      open={!!user}
      onClose={onClose}
      title="Usuń użytkownika"
      description={
        <>
          <span>Czy na pewno chcesz usunąć tego użytkownika?</span>
          <span className="mt-4 block">
            {user.email} ({user.userData?.first_name || '-'} {user.userData?.last_name || '-'})
          </span>
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