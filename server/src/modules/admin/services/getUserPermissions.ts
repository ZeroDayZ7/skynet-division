import PermissionUser from '#ro/models/PermissionUser';
import PermissionTemplate from '#ro/models/PermissionTemplate';
import SystemLog from '#ro/common/utils/SystemLog';

interface PermissionEntry {
  name: string;
  is_visible: boolean;
  is_enabled: boolean;
  children: PermissionEntry[];
}

export const getUserPermissions = async (userId: number): Promise<Record<string, PermissionEntry>> => {
  // Pobierz wszystkie uprawnienia użytkownika z szablonami
  const userPermissions = await PermissionUser.findAll({
    where: { user_id: userId },
    include: [{
      model: PermissionTemplate,
      as: 'template_permission',
      include: [{
        model: PermissionTemplate,
        as: 'parent'
      }]
    }]
  });

  const grouped: Record<string, PermissionEntry> = {};

  // Najpierw dodaj główne uprawnienia (bez parent_id)
  userPermissions.forEach(up => {
    if (!up.template?.parent_id && up.template) {
      grouped[up.template.name] = {
        name: up.template.name,
        is_visible: up.is_visible,
        is_enabled: up.is_enabled,
        children: []
      };
    }
  });

  // Następnie dodaj poduprawnienia (z parent_id)
  userPermissions.forEach(up => {
    if (up.template?.parent_id && up.template?.parent) {
      const parentName = up.template.parent.name;
      
      if (grouped[parentName]) {
        grouped[parentName].children.push({
          name: up.template.name,
          is_visible: up.is_visible,
          is_enabled: up.is_enabled,
          children: [] // Można zostawić puste lub usunąć jeśli nie potrzebne
        });
      }
    }
  });

  SystemLog.debug(`Uprawnienia użytkownika ${userId}:`, grouped);
  return grouped;
};