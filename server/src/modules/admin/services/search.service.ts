// src/modules/user/services/userService.ts
import { Op } from 'sequelize';
import Users from '#ro/modules/auth/models/Users';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';
import { UserAttributes } from '#ro/modules/auth/types/UserAttributes';
import UserData from '#ro/modules/auth/models/UserData';

interface SearchCriteria {
  email: string;
  id: string;
  role: string;
}

export const searchUsers = async (criteria: SearchCriteria): Promise<Partial<UserAttributes>[]> => {
  try {
    const { email, id, role } = criteria;

    SystemLog.info(`[userService] Searching users with criteria: ${JSON.stringify(criteria)}`);

    const whereConditions: Record<string, any> = {};

    if (email) {
      whereConditions.email = { [Op.like]: `%${email}%` };
    }

    if (id) {
      whereConditions.id = { [Op.like]: `%${id}%` };
    }

    if (role && role !== 'all') {
      whereConditions.role = role;
    }

    const users = await Users.findAll({
      where: whereConditions,
      order: [['email', 'ASC']],
      attributes: [
        'id',
        'email',
        'role',
        'userBlock',
        'permissions', // ← tutaj też to dodaj
      ],
      include: [
        {
          model: UserData,
          as: 'userData',
          attributes: ['first_name', 'last_name'],
        },
      ]
    });

    return users.map((user) => user.toJSON() as Partial<UserAttributes>);
  } catch (error: any) {
    SystemLog.error(`Error searching users: ${error.message}`);
    throw new AppError('DB_SEARCH_FAILED', 500);
  }
};
