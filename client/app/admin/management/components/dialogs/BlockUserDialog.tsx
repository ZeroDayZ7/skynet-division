'use client';

import { useState, useEffect } from 'react';
import { blockUser } from '../../actions/blockUser';
import { unblockUser } from '../../actions/unblockUser';
import { GenericDialog } from './GenericDialog';
import { UserInfo } from '../UserInfo';

interface BlockUserDialogProps {
  user: { id: string; email: string; first_name?: string; last_name?: string; userBlock: boolean } | null;
  onClose: () => void;
}

export const BlockUserDialog: React.FC<BlockUserDialogProps> = ({ user, onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!user);
  }, [user]);

  if (!user) return null;

  const description = (
    <>
      <strong className="font-semibold dark:text-red-500">
        Czy na pewno chcesz {user.userBlock ? 'odblokować' : 'zablokować'} użytkownika?
      </strong>
      <UserInfo user={user} />
      <samp className="text-muted-foreground text-sm">Ta akcja może zostać cofnięta.</samp>
    </>
  );

  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      title={user.userBlock ? 'Odblokuj użytkownika' : 'Zablokuj użytkownika'}
      description={description}
      actionLabel={user.userBlock ? 'Odblokuj' : 'Zablokuj'}
      action={user.userBlock ? unblockUser : blockUser}
      actionArgs={[user.id]}
      destructive
    />
  );
};

export default BlockUserDialog;