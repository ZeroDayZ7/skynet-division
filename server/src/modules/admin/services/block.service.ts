// src/modules/user/services/blockService.ts
import Users from '#ro/modules/auth/models/Users';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';

export const blockUser = async (userId: number): Promise<void> => {
  try {
    SystemLog.info(`[blockService] Blocking user with ID: ${userId}`);

    const user = await Users.findByPk(userId);
    if (!user) {
      SystemLog.error(`[blockService] User not found: id=${userId}`);
      throw new AppError('USER_NOT_FOUND', 404);
    }

    // Aktualizacja pola userBlock
    await user.update({ userBlock: true });

    SystemLog.info(`[blockService] User blocked successfully: id=${userId}`);
  } catch (error: any) {
    SystemLog.error(`[blockService] Error blocking user: ${error.message}`);
    throw error instanceof AppError ? error : new AppError('DB_UPDATE_FAILED', 500);
  }
};