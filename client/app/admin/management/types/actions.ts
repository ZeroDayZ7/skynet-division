export type UserActionType = 'edit' | 'permissions' | 'block' | 'delete';

export interface UserAction {
  label: string;
  permissionKey: string;
  onClick: () => void;
  destructive?: boolean;
  visible: boolean;
  disabled: boolean;
}

export interface SelectedUser {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  userBlock?: boolean;
  action: UserActionType;
}