import SystemLog from '#ro/common/utils/SystemLog';
import PermissionUser from '#ro/models/userPermission.model';
import PermissionTemplate from '#ro/models/permissionTemplate.model';

interface PermissionEntry {
  is_visible: boolean;
  is_enabled: boolean;
  description: string; // Dodajemy description
}

export const getUserPermissionsAdmin = async (userId: number): Promise<Record<string, PermissionEntry>> => {
  // Pobierz wszystkie uprawnienia użytkownika z szablonami
  const userPermissions = await PermissionUser.findAll({
    where: { user_id: userId },
    include: [
      {
        model: PermissionTemplate,
        as: 'template_permission',
        required: true,
        attributes: ['key', 'description'], // Wyraźnie pobieramy key i description
      },
    ],
  });

  // Logujemy surowe dane z bazy
  SystemLog.info(`[getUserPermissionsAdmin] Surowe dane dla userId ${userId}: ${JSON.stringify(userPermissions, null, 2)}`);

  const grouped: Record<string, PermissionEntry> = {};

  // Przetwarzamy wszystkie uprawnienia
  userPermissions.forEach((up: any) => {
    const permissionKey = up.template_permission?.key;
    const permissionDescription = up.template_permission?.description;

    if (!permissionKey || !permissionDescription) {
      SystemLog.error(
        `Brak klucza lub opisu uprawnienia dla up.template_permission:`,
        up.template_permission
      );
      return;
    }

    grouped[permissionKey] = {
      is_visible: up.is_visible,
      is_enabled: up.is_enabled,
      description: permissionDescription, // Dodajemy description
    };
  });

  SystemLog.warn(`[getUserPermissionsAdmin] Wynik: ${JSON.stringify(grouped, null, 2)}`);

  return grouped;
};