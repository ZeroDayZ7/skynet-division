// app/user-management/constants.ts
export const USER_ROLES = {
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    USER: 'user',
  } as const;
  
  export const AVAILABLE_PERMISSIONS = [
    { key: 'canEditContent', label: 'Edycja treści' },
    { key: 'canDeleteUsers', label: 'Usuwanie użytkowników' },
    { key: 'canManageSettings', label: 'Zarządzanie ustawieniami' },
  ] as const;