'use client';

import { useCallback } from 'react';
import { GenericDialog } from './GenericDialog';
import { User } from '../../types/user';
import { deleteUser } from '../../actions/deleteUser';

interface DeleteUserDialogProps {
  users: User[];
  onClose: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ users, onClose }) => {
  const handleDelete = useCallback(async () => {
    const results = await Promise.all(
      users.map((user) => deleteUser(user.id))
    );
    const success = results.every((result) => result.success);
    return {
      success,
      message: success
        ? 'Użytkownicy zostali usunięci.'
        : 'Nie udało się usunąć niektórych użytkowników.',
    };
  }, [users]);

  return (
    <GenericDialog
      open={!!users.length}
      onClose={onClose}
      title="Usuń użytkowników"
      description={
        <>
          <span>Czy na pewno chcesz usunąć zaznaczonych użytkowników?</span>
          <ul className="mt-4 space-y-2">
            {users.map((user) => (
              <li key={user.id}>
                {user.email} ({user.userData?.first_name || '-'} {user.userData?.last_name || '-'})
              </li>
            ))}
          </ul>
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