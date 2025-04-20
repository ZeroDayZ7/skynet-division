export type Role = 'superadmin' | 'admin' | 'moderator' | 'user';

export type PermissionKey = 'userManagement' | 'contentModeration' | 'viewReports' | 'editSettings';

export const ROLE_PERMISSIONS: Record<Role, Partial<Record<PermissionKey, boolean>>> = {
    superadmin: {
        userManagement: true,
        contentModeration: true,
        viewReports: true,
        editSettings: true,
    },
    admin: {
        userManagement: true,
        contentModeration: true,
        viewReports: true,
        editSettings: false,
    },
    moderator: {
        userManagement: false,
        contentModeration: true,
        viewReports: true,
        editSettings: false,
    },
    user: {
        userManagement: false,
        contentModeration: false,
        viewReports: true,
        editSettings: false,
    },
};