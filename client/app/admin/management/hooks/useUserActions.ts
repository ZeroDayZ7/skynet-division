// app/user-management/hooks/useUserActions.ts
'use client';

import { usePermissions } from '@/context/PermissionsContext';
import { User } from '../types/user';
import { UserAction, SelectedUser } from '../types/actions';
import { actionConfig } from './actionConfig';
import { useCallback, useMemo } from 'react';

export const useUserActions = (user: User, setSelectedUser: (user: SelectedUser | null) => void) => {
  const { hasPermissionEnabled, hasPermissionVisible } = usePermissions();

  const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const actions: UserAction[] = useMemo(() => {
    return actionConfig.map((config) => {
      const label = typeof config.label === 'function' ? config.label(user) : config.label;
      const isVisible = hasPermissionVisible(config.permissionKey);
      const isEnabled = hasPermissionEnabled(config.permissionKey);

      const handleClick = () => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Otwieram dialog akcji: ${config.action} dla userId: ${user.id}`);
        }
        setSelectedUser({
          id: user.id.toString(),
          email: user.email,
          first_name: user.userData?.first_name,
          last_name: user.userData?.last_name,
          ...(config.action === 'block' && { userBlock: user.userBlock }),
          action: config.action,
        });
      };

      return {
        label,
        permissionKey: config.permissionKey,
        onClick: debounce(handleClick, 300),
        destructive: config.destructive,
        visible: isVisible,
        disabled: !isEnabled,
      };
    });
  }, [user, hasPermissionVisible, hasPermissionEnabled, setSelectedUser]);

  const visibleActions = useMemo(() => actions.filter((action) => action.visible), [actions]);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`Akcje dla użytkownika ${user.id}:`, visibleActions);
  }

  return visibleActions;
};