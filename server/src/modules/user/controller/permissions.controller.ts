// controllers/permissions.controller.ts
import { Request, Response } from 'express';
import { getUserPermissionsAndRole } from '#ro/modules/user/services/permissions.service';
import AppError from '#errors/AppError';
import SystemLog from '#ro/common/utils/SystemLog';

/**
 * Zwraca rolę i uprawnienia użytkownika (permissions jako JSON).
 */
export const getUserPermissionsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.session.userId || req.user?.id;
    SystemLog.warn(`req.session.userId: ${req.session.userId}`);
    SystemLog.warn(`req.user.id: ${req.user?.id}`);

    if (!userId) {
      throw new AppError('UNAUTHORIZED', 401);
    }

    const result = await getUserPermissionsAndRole(userId);

    SystemLog.info(`RESULT: ${JSON.stringify(result, null, 2)}`);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      SystemLog.error('Błąd podczas pobierania uprawnień użytkownika:', error);
      const appError = new AppError('SERVER_ERROR', 500);
      appError.sendErrorResponse(res);
    }
  }
};
