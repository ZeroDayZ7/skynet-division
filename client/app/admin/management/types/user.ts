// app/user-management/types/user.ts
export interface UserData {
  first_name?: string;
  last_name?: string;
}

export interface Permissions {
  [key: string]: boolean; // np. { canEditContent: true, canDeleteUsers: false }
}

export interface User {
  id: number;
  email: string;
  points: number;
  login_count: number;
  role: string;
  userBlock: boolean;
  lastLoginIp?: string;
  permissions: Permissions;
  userData?: UserData;
}