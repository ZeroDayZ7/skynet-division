// app/user-management/types/user.ts
export interface Permission {
  enabled: boolean;
  hidden: boolean;
}

export interface Permissions {
  [key: string]: Permission;
}

export interface User {
  id: string;
  email: string;
  role: string;
  userBlock: boolean;
  permissions: Permissions | null;
  userData?: {
    first_name?: string;
    last_name?: string;
  };
}