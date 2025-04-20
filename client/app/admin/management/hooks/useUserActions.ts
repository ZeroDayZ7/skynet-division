// app/user-management/hooks/useUserActions.ts
'use client';

import { usePermissions } from '@/context/PermissionsContext';
import { User } from '../types/user';

export interface UserAction {
  label: string;
  permissionKey: string;
  onClick: () => void;
  destructive?: boolean;
  visible: boolean;
  disabled: boolean;
}

export const useUserActions = (
  user: User,
  setEditUserId: (id: string | null) => void,
  setPermissionsUser: (user: { id: string; email: string; first_name?: string; last_name?: string } | null) => void,
  setBlockUser: (user: { id: string; email: string; first_name?: string; last_name?: string; userBlock: boolean } | null) => void,
  setDeleteUser: (user: { id: string; email: string; first_name?: string; last_name?: string } | null) => void
) => {
  const { permissions } = usePermissions();

  const actions: UserAction[] = [
    {
      label: 'Edytuj',
      permissionKey: 'userEdit',
      onClick: () => {
        console.log(`Otwieram dialog edycji dla userId: ${user.id}`);
        setEditUserId(user.id.toString());
      },
      visible: !!(permissions?.userEdit?.enabled && !permissions.userEdit.hidden),
      disabled: !permissions?.userEdit?.enabled,
    },
    {
      label: 'Edytuj uprawnienia',
      permissionKey: 'userEditPermissions',
      onClick: () => {
        console.log(`Otwieram dialog uprawnień dla userId: ${user.id}`);
        setPermissionsUser({
          id: user.id.toString(),
          email: user.email,
          first_name: user.userData?.first_name,
          last_name: user.userData?.last_name,
        });
      },
      visible: !!(permissions?.userEditPermissions?.enabled && !permissions.userEditPermissions.hidden),
      disabled: !permissions?.userEditPermissions?.enabled,
    },
    {
      label: user.userBlock ? 'Odblokuj' : 'Zablokuj',
      permissionKey: 'userBlock',
      onClick: () => {
        console.log(`Otwieram dialog ${user.userBlock ? 'odblokowania' : 'blokady'} dla userId: ${user.id}`);
        setBlockUser({
          id: user.id.toString(),
          email: user.email,
          first_name: user.userData?.first_name,
          last_name: user.userData?.last_name,
          userBlock: user.userBlock,
        });
      },
      visible: !!(permissions?.userBlock?.enabled && !permissions.userBlock.hidden),
      disabled: !permissions?.userBlock?.enabled,
    },
    {
      label: 'Usuń',
      permissionKey: 'userDelete',
      onClick: () => {
        console.log(`Otwieram dialog usuwania dla userId: ${user.id}`);
        setDeleteUser({
          id: user.id.toString(),
          email: user.email,
          first_name: user.userData?.first_name,
          last_name: user.userData?.last_name,
        });
      },
      destructive: true,
      visible: !!(permissions?.userDelete?.enabled && !permissions.userDelete.hidden),
      disabled: !permissions?.userDelete?.enabled,
    },
  ];

  return actions.filter((action) => action.visible);
};