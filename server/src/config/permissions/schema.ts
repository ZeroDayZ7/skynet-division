export type PermissionKey = 'userManagement' | 'viewLogs' | 'editSettings' | 'deleteRecords';

export interface PermissionDefinition {
    label: string;
    description?: string;
}

export const PERMISSION_SCHEMA: Record<PermissionKey, PermissionDefinition> = {
    userManagement: { label: 'Zarządzanie użytkownikami', description: 'Manage user accounts and permissions' },
    viewLogs: { label: 'Przeglądanie logów', description: 'View system and application logs' },
    editSettings: { label: 'Edycja ustawień', description: 'Modify system settings' },
    deleteRecords: { label: 'Usuwanie rekordów', description: 'Delete data records from the system' },
};