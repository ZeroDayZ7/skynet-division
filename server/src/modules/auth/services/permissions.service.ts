// permissions/services/permissions.services.ts

import SystemLog from '#ro/common/utils/SystemLog';
import UserPermission from '#models/userPermission.model';
import PermissionTemplate from '#models/permissionTemplate.model';

export const getUserPermissionKeys = async (userId: number): Promise<string[]> => {
  SystemLog.info(`[PermissionsService]: Fetching permissions for user ${userId}`);

  const userPermissions = await UserPermission.findAll({
    where: {
      user_id: userId,
      is_enabled: true,
    },
    attributes: [], 
    include: [{
      model: PermissionTemplate,
      as: 'template_permission',
      attributes: ['key'],
    }],
  });

 const keys = userPermissions
    .map(up => up.template_permission?.key)
    .filter((key): key is string => Boolean(key));

  SystemLog.info(`[PermissionsService]: User ${userId} permissions: ${keys.join(', ')}`);

  return keys;
};

const permissionsService = {
  getUserPermissionKeys,
};

export default permissionsService;
