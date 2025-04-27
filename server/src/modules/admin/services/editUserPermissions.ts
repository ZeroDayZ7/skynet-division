// modules/admin/services/editUserPermissions.ts
import PermissionUser from '#ro/models/PermissionUser';
import PermissionTemplate from '#ro/models/PermissionTemplate';
import SystemLog from '#ro/common/utils/SystemLog';

interface PermissionEntry {
  is_visible: boolean;
  is_enabled: boolean;
  description: string;
}

interface Permissions {
  [key: string]: PermissionEntry;
}

export const editUserPermissions = async (userId: string, permissions: Permissions) => {
  try {
    // Pobierz wszystkie szablony uprawnień, aby zweryfikować klucze
    const templates = await PermissionTemplate.findAll({
      attributes: ['key'],
    });
    const validKeys = templates.map((t) => t.key);

    // Przygotuj dane do zapisu
    const permissionEntries = Object.entries(permissions)
      .filter(([key]) => validKeys.includes(key)) // Filtruj tylko istniejące klucze
      .map(([key, perm]) => ({
        user_id: Number(userId),
        permission_key: key,
        is_visible: perm.is_visible,
        is_enabled: perm.is_enabled,
      }));

    // Usuń istniejące uprawnienia użytkownika
    await PermissionUser.destroy({
      where: { user_id: Number(userId) },
    });

    // Zapisz nowe uprawnienia
    await PermissionUser.bulkCreate(permissionEntries);

    SystemLog.info(`[editUserPermissions] Zapisano uprawnienia dla userId ${userId}: ${JSON.stringify(permissionEntries)}`);

    // Zwróć uprawnienia w formacie zgodnym z frontendem
    const updatedPermissions: Permissions = permissionEntries.reduce((acc, entry) => {
      const template = templates.find((t) => t.key === entry.permission_key);
      acc[entry.permission_key] = {
        is_visible: entry.is_visible,
        is_enabled: entry.is_enabled,
        description: template?.description || entry.permission_key, // Pobierz description z PermissionTemplate
      };
      return acc;
    }, {} as Permissions);

    return updatedPermissions;
  } catch (error) {
    SystemLog.error(`[editUserPermissions] Błąd podczas zapisywania uprawnień dla userId ${userId}: ${error}`);
    throw new Error('Nie udało się zaktualizować uprawnień');
  }
};