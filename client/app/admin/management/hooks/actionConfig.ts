import { User } from '../types/user';
import { UserActionType } from '@/app/admin/management/types/actions';

interface ActionConfig {
  label: string | ((user: User) => string);
  permissionKey: string;
  action: UserActionType;
  destructive?: boolean;
}

export const actionConfig: ActionConfig[] = [
  { label: 'Edytuj', permissionKey: 'userEdit', action: 'edit' },
  { label: 'Edytuj uprawnienia', permissionKey: 'userEditPermissions', action: 'permissions' },
  { label: (user: User) => (user.userBlock ? 'Odblokuj' : 'Zablokuj'), permissionKey: 'userBlock', action: 'block' },
  { label: 'Usuń', permissionKey: 'userDelete', action: 'delete', destructive: true },
];