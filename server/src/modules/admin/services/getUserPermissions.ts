import Permission from "#ro/models/Permission";
import SystemLog from "#ro/common/utils/SystemLog";

export const getUserPermissions = async (userId: number) => {
  const permissions = await Permission.findAll({
    where: {
      user_id: userId,
    },
    attributes: ['permission_name', 'is_enabled', 'is_visible'], // Pobieramy tylko potrzebne atrybuty
  });

  const result: Record<string, { 
    enabled: boolean, 
    visible: boolean,
  }> = {};
SystemLog.warn(`jestem tu`);
  for (const perm of permissions) {
    result[perm.permission_name] = {
      enabled: perm.is_enabled, // Używamy rzeczywistej wartości z bazy
      visible: perm.is_visible,  // Dodajemy informację o widoczności
    };
  }

  return result;
};