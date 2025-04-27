export interface Permission {
  is_enabled: boolean;
  is_visible: boolean;
  description: string;
}

export interface Permissions {
  [key: string]: Permission;
}

export interface UserPermissions {
  permissions: Permissions;
}

// export type Permissions = Record<string, PermissionEntry>;