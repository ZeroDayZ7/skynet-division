import Permission from "#ro/models/Permission";
import SystemLog from "#ro/common/utils/SystemLog";

export const getUserPermissions = async (userId: number) => {
  // Pobieramy uprawnienia w jednym zapytaniu
  const permissions = await Permission.findAll({
    where: { user_id: userId },
    attributes: ['permission_name', 'is_enabled', 'is_visible'],
  });

  // Budujemy obiekt uprawnień w sposób zoptymalizowany
  const result = permissions.reduce(
    (acc: Record<string, { enabled: boolean; visible: boolean }>, perm) => {
      acc[perm.permission_name] = {
        enabled: perm.is_enabled,
        visible: perm.is_visible,
      };
      return acc;
    },
    {}
  );

  // Logowanie tylko w razie potrzeby (optymalizacja)
  SystemLog.debug(`Uprawnienia użytkownika ${userId}: ${JSON.stringify(result)}`);

  return result;

};