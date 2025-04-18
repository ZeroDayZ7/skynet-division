// src/modules/user/services/deleteService.ts
import Users from '#ro/modules/auth/models/Users';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    SystemLog.info(`[deleteService] Deleting user with ID: ${userId}`);

    const user = await Users.findByPk(userId);
    if (!user) {
      SystemLog.error(`[deleteService] User not found: id=${userId}`);
      throw new AppError('USER_NOT_FOUND', 404);
    }

    // Usunięcie użytkownika
    await user.destroy();

    SystemLog.info(`[deleteService] User deleted successfully: id=${userId}`);
  } catch (error: any) {
    SystemLog.error(`[deleteService] Error deleting user: ${error.message}`);
    throw error instanceof AppError ? error : new AppError('DB_DELETE_FAILED', 500);
  }
};