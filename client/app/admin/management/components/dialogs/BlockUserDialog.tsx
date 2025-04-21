// app/user-management/components/dialogs/BlockUserDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePermissions } from '@/context/PermissionsContext';
import { blockUser } from '../../actions/blockUser';
import { unblockUser } from '../../actions/unblockUser';
import { GenericDialog } from './GenericDialog';
import { UserInfo } from '../UserInfo';

interface BlockUserDialogProps {
  user: { id: string; email: string; first_name?: string; last_name?: string; userBlock: boolean } | null;
  onClose: () => void;
}

export const BlockUserDialog: React.FC<BlockUserDialogProps> = ({ user, onClose }) => {
  const { permissions } = usePermissions();
  const [open, setOpen] = useState(false);
  console.log(`EE`);

  useEffect(() => {
    if (user) {
      const hasPermission = !!(permissions?.userBlock?.enabled && !permissions.userBlock. visible);
      setOpen(!!user && hasPermission);
    }
  }, [user, permissions]);

  if (!user || !permissions?.userBlock?.enabled || permissions.userBlock.visible) {
    return null;
  }

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