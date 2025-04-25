// components/user-management/dialogs/BlockUserDialog.tsx
'use client';

import { useCallback } from 'react';
import { GenericDialog } from './GenericDialog';
import { User } from '../../types/user';
import { blockUser } from '@/app/admin/management/actions/blockUser'; // Poprawny import
import { unblockUser } from '@/app/admin/management/actions/unblockUser'; // Poprawny import

interface BlockUserDialogProps {
  user: User;
  onClose: () => void;
  isBlockAction: 'block' | 'unblock';
}

export const BlockUserDialog: React.FC<BlockUserDialogProps> = ({ user, onClose, isBlockAction }) => {
  const handleBlock = useCallback(async () => {
    const action = isBlockAction === 'block' ? blockUser : unblockUser;
    const result = await action(isBlockAction === 'block' ? user.id : user.id); // unblockUser wymaga string

    return {
      success: result.success,
      message: result.success
        ? isBlockAction === 'block'
          ? 'Użytkownik został zablokowany.'
          : 'Użytkownik został odblokowany.'
        : result.message || 'Nie udało się wykonać akcji.',
    };
  }, [user, isBlockAction]);

  return (
    <GenericDialog
      open={!!user}
      onClose={onClose}
      title={isBlockAction === 'block' ? 'Zablokuj użytkownika' : 'Odblokuj użytkownika'}
      description={
        <>
          <span>
            Czy na pewno chcesz {isBlockAction === 'block' ? 'zablokować' : 'odblokować'} tego użytkownika?
          </span>
          <span className="mt-4 block">
            {user.email} ({user.userData?.first_name || '-'} {user.userData?.last_name || '-'})
          </span>
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