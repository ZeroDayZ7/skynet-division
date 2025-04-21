import Permission from "#ro/models/Permission";
import SystemLog from "#ro/common/utils/SystemLog";

export const getUserPermissions = async (userId: number) => {
  const permissions = await Permission.findAll({
    where: { user_id: userId },
    attributes: ['permission_name', 'is_enabled', 'is_visible', 'description'],
  });

  const result = permissions.reduce(
    (acc: Record<string, { enabled: boolean; visible: boolean; description?: string }>, perm) => {
      acc[perm.permission_name] = {
        enabled: perm.is_enabled,
        visible: perm.is_visible,
        description: perm.description ?? '',
      };
      return acc;
    },
    {}
  );

  SystemLog.debug(`Uprawnienia użytkownika ${userId}: ${JSON.stringify(result)}`);

  return result;
};
