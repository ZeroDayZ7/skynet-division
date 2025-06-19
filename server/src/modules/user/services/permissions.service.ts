// services/permissions.service.ts
import SystemLog from '#ro/common/utils/SystemLog';
import PermissionUser from '#ro/models/userPermission.model';
import PermissionTemplate from '#ro/models/permissionTemplate.model';

interface PermissionEntry {
  is_visible: boolean;
  is_enabled: boolean;
}

export const getUserPermissionsToLogin = async (userId: number): Promise<Record<string, PermissionEntry>> => {
  // Pobierz wszystkie uprawnienia użytkownika z szablonami
  const userPermissions = await PermissionUser.findAll({
    where: { user_id: userId },
    include: [
      {
        model: PermissionTemplate,
        as: 'template_permission',
        required: true,
      },
    ],
  });

  // Logujemy surowe dane z bazy
  SystemLog.debug(`Surowe dane z bazy dla userId ${userId}:`, JSON.stringify(userPermissions, null, 2));

  const grouped: Record<string, PermissionEntry> = {};

  // Przetwarzamy wszystkie uprawnienia – bez hierarchii
  userPermissions.forEach((up: any) => {
    const permissionKey = up.template_permission?.key;
    if (!permissionKey) {
      SystemLog.error(`Brak klucza uprawnienia dla up.template_permission:`, up.template_permission);
      return;
    }

    grouped[permissionKey] = {
      is_visible: up.is_visible,
      is_enabled: up.is_enabled,
    };
  });

  return grouped;
};