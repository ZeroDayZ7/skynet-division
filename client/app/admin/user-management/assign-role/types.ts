export interface Permission {
  key: string; // np. "canCreateUser"
  label: string; // np. "Tworzenie użytkowników"
  description?: string; // np. "Pozwala tworzyć nowych użytkowników"
}

export interface Role {
  name: string; // np. "admin"
  permissions: Record<string, boolean>; // np. { canCreateUser: true, canEditUser: true }
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string; // np. "moderator"
  customPermissions?: Record<string, boolean>; // Indywidualne uprawnienia nadpisujące rolę
}