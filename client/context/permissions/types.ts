export interface Permission {
  is_enabled: boolean;
  is_visible: boolean;
}

export interface Permissions {
  [key: string]: Permission;
}

export interface UserPermissions {
  permissions: Permissions;
}