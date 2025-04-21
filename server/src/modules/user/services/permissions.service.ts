import SystemLog from '#ro/common/utils/SystemLog';
import PermissionUser from '#ro/models/PermissionUser';
import PermissionTemplate from '#ro/models/PermissionTemplate';

interface PermissionEntry {
  name: string;
  is_visible: boolean;
  is_enabled: boolean;
  children: PermissionEntry[];
}

export const getUserPermissionsToLogin = async (userId: number): Promise<Record<string, PermissionEntry>> => {
  SystemLog.warn(`getUserPermissionsToLogin`);
  SystemLog.warn(`userId: ${userId}`);

  // Pobierz wszystkie uprawnienia użytkownika z szablonami
  const userPermissions = await PermissionUser.findAll({
    where: { user_id: userId },
    include: [
      {
        model: PermissionTemplate,
        as: 'template_permission',  // Użyj aliasu zdefiniowanego w modelu (template_permission)
        required: true, // Zapewnia, że tylko rekordy z powiązanym template będą zwrócone
        include: [
          {
            model: PermissionTemplate,
            as: 'parent',  // Podobnie jak w relacjach, stosuj alias
          },
          {
            model: PermissionTemplate,
            as: 'children',  // Stosuj alias 'children'
          },
        ],
      },
    ],
  });

  // Logujemy surowe dane z bazy, aby zobaczyć, co zostało zwrócone
  SystemLog.debug(`Surowe dane z bazy dla userId ${userId}:`, JSON.stringify(userPermissions, null, 2));

  const grouped: Record<string, PermissionEntry> = {};

  // Najpierw dodaj główne uprawnienia (bez parent_id)
  userPermissions.forEach((up: any) => {
    if (!up.template_permission?.parent_id && up.template_permission) {
      grouped[up.template_permission.name] = {
        name: up.template_permission.name,
        is_visible: up.is_visible,
        is_enabled: up.is_enabled,
        children: [],
      };
    }
  });

  // Następnie dodaj poduprawnienia (z parent_id)
  userPermissions.forEach((up: any) => {
    if (up.template_permission?.parent_id && up.template_permission?.parent) {
      const parentName = up.template_permission.parent.name;

      if (grouped[parentName]) {
        grouped[parentName].children.push({
          name: up.template_permission.name,
          is_visible: up.is_visible,
          is_enabled: up.is_enabled,
          children: [], // Można zostawić puste lub usunąć jeśli nie potrzebne
        });
      }
    }
  });

  SystemLog.debug(`Uprawnienia użytkownika ${userId}:`, grouped);
  return grouped;
};
