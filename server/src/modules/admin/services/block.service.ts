// src/modules/user/services/blockService.ts
import Users from '#ro/models/Users';
import Sessions from '#ro/models/Session.model'; // Poprawny import
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';
import { Sequelize } from 'sequelize';

export const blockUser = async (userId: number): Promise<void> => {
  try {
    SystemLog.info(`[blockService] Blocking user with ID: ${userId}`);
    const user = await Users.findByPk(userId);
    if (!user) {
      SystemLog.error(`[blockService] User not found: id=${userId}`);
      throw new AppError('USER_NOT_FOUND', 404);
    }

    await user.update({ userBlock: true });

    // Usuwanie sesji użytkownika
    const deleted = await Sessions.destroy({
      where: Sequelize.literal(`JSON_EXTRACT(data, '$.userId') = ${userId}`),
    });

    SystemLog.info(`[blockService] Deleted ${deleted} sessions for user ${userId}`);

    SystemLog.info(`[blockService] User blocked successfully: id=${userId}`);
  } catch (error: any) {
    SystemLog.error(`[blockService] Error blocking user: ${error.message}`);
    throw error instanceof AppError ? error : new AppError('DB_UPDATE_FAILED', 500);
  }
};

export const unblockUser = async (userId: number): Promise<void> => {
  try {
    SystemLog.info(`[blockService] Unblocking user with ID: ${userId}`);
    const user = await Users.findByPk(userId);
    if (!user) {
      SystemLog.error(`[blockService] User not found: id=${userId}`);
      throw new AppError('USER_NOT_FOUND', 404);
    }
    await user.update({ userBlock: false });
    SystemLog.info(`[blockService] User unblocked successfully: id=${userId}`);
  } catch (error: any) {
    SystemLog.error(`[blockService] Error unblocking user: ${error.message}`);
    throw error instanceof AppError ? error : new AppError('DB_UPDATE_FAILED', 500);
  }
};