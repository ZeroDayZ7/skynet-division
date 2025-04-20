'use client';

import { usePermissions } from '@/context/PermissionsContext';
import { User } from '../types/user';

// [OPTIMIZATION] Typ dla wybranych użytkowników przeniesiony do UserTable.tsx
// Typ dla akcji użytkownika
export interface UserAction {
  label: string;
  permissionKey: string;
  onClick: () => void;
  destructive?: boolean;
  visible: boolean;
  disabled: boolean;
}

// [OPTIMIZATION] Typ dla setSelectedUser zgodny z UserTable.tsx
type SetSelectedUser = (user: {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  userBlock?: boolean;
  action: 'edit' | 'permissions' | 'block' | 'delete';
} | null) => void;

// [OPTIMIZATION] Zmniejszono liczbę argumentów z pięciu (user, setEditUserId, setPermissionsUser, setBlockUser, setDeleteUser) do dwóch (user, setSelectedUser)
export const useUserActions = (user: User, setSelectedUser: SetSelectedUser) => {
  const { permissions } = usePermissions();

  // [OPTIMIZATION] Utworzono konfigurację akcji dla łatwiejszego zarządzania i rozszerzalności
  const actionConfig: {
    label: string | ((user: User) => string);
    permissionKey: string;
    action: string;
    destructive?: boolean;
  }[] = [
    {
      label: 'Edytuj',
      permissionKey: 'userEdit',
      action: 'edit',
    },
    {
      label: 'Edytuj uprawnienia',
      permissionKey: 'userEditPermissions',
      action: 'permissions',
    },
    {
      label: (user: User) => (user.userBlock ? 'Odblokuj' : 'Zablokuj'),
      permissionKey: 'userBlock',
      action: 'block',
    },
    {
      label: 'Usuń',
      permissionKey: 'userDelete',
      action: 'delete',
      destructive: true,
    },
  ];

  const actions: UserAction[] = actionConfig.map((config) => {
    const label = typeof config.label === 'function' ? config.label(user) : config.label;
    const hasPermission = !!(permissions?.[config.permissionKey]?.enabled && !permissions[config.permissionKey].hidden);

    return {
      label,
      permissionKey: config.permissionKey,
      onClick: () => {
        // [OPTIMIZATION] Ujednolicono logikę i usunięto nadmiarowe console.log w produkcji
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Otwieram dialog akcji: ${config.action} dla userId: ${user.id}`);
        }
        setSelectedUser({
          id: user.id.toString(),
          email: user.email,
          first_name: user.userData?.first_name,
          last_name: user.userData?.last_name,
          ...(config.action === 'block' && { userBlock: user.userBlock }),
          action: config.action as 'edit' | 'permissions' | 'block' | 'delete',
        });
      },
      destructive: config.destructive,
      visible: hasPermission,
      disabled: !hasPermission,
    };
  });

  // [OPTIMIZATION] Filtrowanie widocznych akcji w jednym miejscu
  return actions.filter((action) => action.visible);
};

export default useUserActions;