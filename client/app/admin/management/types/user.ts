// app/user-management/types/user.ts
export interface UserData {
  first_name?: string;
  last_name?: string;
}

export interface Permissions {
  [key: string]: boolean;
}

export interface User {
  id: number;
  email: string;
  role: string;
  userBlock: boolean;
  permissions: Permissions | null;
  userData: UserData | null;
}