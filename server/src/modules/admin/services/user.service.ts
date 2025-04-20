// src/modules/user/services/userService.ts
import Users from '#ro/models/Users';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';
import UserData from '#ro/models/UserData';
import { UserAttributes } from '#ro/modules/auth/types/UserAttributes';

// ... istniejący kod searchUsers ...

export const getUserById = async (userId: number): Promise<Partial<UserAttributes>> => {
  try {
    SystemLog.info(`[userService] Fetching user with ID: ${userId}`);
    const user = await Users.findByPk(userId, {
      attributes: [
        'id',
        'email',
        'points',
        'login_count',
        'role',
        'userBlock',
        'lastLoginIp',
        'permissions',
      ],
      include: [
        {
          model: UserData,
          as: 'userData',
          attributes: ['first_name', 'last_name'],
        },
      ],
    });

    if (!user) {
      SystemLog.error(`[userService] User not found: id=${userId}`);
      throw new AppError('USER_NOT_FOUND', 404);
    }

    return user.toJSON() as Partial<UserAttributes>;
  } catch (error: any) {
    SystemLog.error(`[userService] Error fetching user: ${error.message}`);
    throw error instanceof AppError ? error : new AppError('DB_FETCH_FAILED', 500);
  }
};