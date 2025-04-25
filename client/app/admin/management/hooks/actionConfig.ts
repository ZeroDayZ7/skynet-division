// hooks/actionConfig.ts
import { User } from '../types/user';

interface ActionConfig {
  label: string | ((user: User) => string);
  action: string;
  permissionKey: string;
  destructive?: boolean;
}

export const actionConfig: ActionConfig[] = [
  {
    label: (user: User) => (user.userBlock ? 'Odblokuj' : 'Zablokuj'),
    action: 'block',
    permissionKey: 'userBlock',
  },
  {
    label: 'Edytuj dane',
    action: 'edit',
    permissionKey: 'userEdit',
  },
  {
    label: 'Edytuj uprawnienia',
    action: 'permissions',
    permissionKey: 'userEditPermissions',
    destructive: false,
  },
  {
    label: 'Usuń',
    action: 'delete',
    permissionKey: 'userDelete',
    destructive: true,
  },
];