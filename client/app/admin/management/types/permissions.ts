export interface Permission {
    enabled: boolean;
    visible: boolean;
  }
  
  export interface Permissions {
    [key: string]: Permission;
  }