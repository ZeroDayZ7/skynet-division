// services/permissions.service.ts
import User from '#models/Users';
import AppError, { ErrorType } from '#errors/AppError';

export const getUserPermissionsAndRole = async (userId: number) => {
  const user = await User.findByPk(userId, {
    attributes: ['role', 'permissions'],
  });

  if (!user) {
    throw new AppError('NOT_FOUND', 404, true, ErrorType.NOT_FOUND);
  }

  return {
    role: user.role,
    permissions: user.permissions,
  };
};
