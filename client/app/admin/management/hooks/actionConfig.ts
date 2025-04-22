import { User } from '../types/user';

interface ActionConfig {
  label: string | ((user: User) => string);
  permissionKey: string;
  action: string;
  destructive?: boolean;
}

export const actionConfig: ActionConfig[] = [
  { label: 'Edytuj uprawnienia', permissionKey: 'userEditPermissions', action: 'permissions' },
  {
    label: (user: User) => (user.userBlock ? 'Odblokuj' : 'Zablokuj'),
    permissionKey: 'userBlock',
    action: 'block',
  },
  { label: 'Usuń', permissionKey: 'userDelete', action: 'delete', destructive: true },
];