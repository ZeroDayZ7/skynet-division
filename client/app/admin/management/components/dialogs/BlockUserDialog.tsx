'use client';

import { useCallback } from 'react';
import { GenericDialog } from './GenericDialog';
import { User } from '../../types/user';
import { blockUser} from '../../actions/blockUser'; // Załóżmy, że mamy takie akcje
import { unblockUser } from '../../actions/unblockUser'; // Załóżmy, że mamy takie akcje

interface BlockUserDialogProps {
  users: User[];
  onClose: () => void;
  isBlockAction: 'block' | 'unblock';
}

export const BlockUserDialog: React.FC<BlockUserDialogProps> = ({ users, onClose, isBlockAction }) => {
  const handleBlock = useCallback(async () => {
    const action = isBlockAction === 'block' ? blockUser : unblockUser;
    const results = await Promise.all(
      users.map((user) => action(user.id))
    );
    const success = results.every((result) => result.success);
    return {
      success,
      message: success
        ? isBlockAction === 'block'
          ? 'Użytkownicy zostali zablokowani.'
          : 'Użytkownicy zostali odblokowani.'
        : 'Nie udało się wykonać akcji dla niektórych użytkowników.',
    };
  }, [users, isBlockAction]);

  return (
    <GenericDialog
      open={!!users.length}
      onClose={onClose}
      title={isBlockAction === 'block' ? 'Zablokuj użytkowników' : 'Odblokuj użytkowników'}
      description={
        <>
          <span>
            Czy na pewno chcesz {isBlockAction === 'block' ? 'zablokować' : 'odblokować'} zaznaczonych użytkowników?
          </span>
          <ul className="mt-4 space-y-2">
            {users.map((user) => (
              <li key={user.id}>
                {user.email} ({user.userData?.first_name || '-'} {user.userData?.last_name || '-'})
              </li>
            ))}
          </ul>
        </>
      }
      actionLabel={isBlockAction === 'block' ? 'Zablokuj' : 'Odblokuj'}
      action={handleBlock}
      actionArgs={[]}
      destructive={isBlockAction === 'block'}
    />
  );
};

export default BlockUserDialog;