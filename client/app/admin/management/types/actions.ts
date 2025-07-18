export interface SelectedUser {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  userBlock: boolean;
  action: 'edit' | 'permissions' | 'block' | 'delete';
}

export type UserAction = 'edit' | 'permissions' | 'block' | 'delete'; // <- Tego TS potrzebuje
