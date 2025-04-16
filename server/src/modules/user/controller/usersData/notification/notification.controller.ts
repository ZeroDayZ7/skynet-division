import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/common/utils/SystemLog.js';
import AppError, { ErrorType } from '#errors/AppError';
import { fetchUserNotifications } from '#ro/modules/user/services/notification.service';

export const getUserNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      throw new AppError('UNAUTHORIZED', 401, true, 'Brak autoryzacji', ErrorType.UNAUTHORIZED);
    }

    const { page = 1, limit = 10 } = req.body;

    const notifications = await fetchUserNotifications(userId, Number(page), Number(limit));

    SystemLog.info(`Pobrano powiadomienia użytkownika #${userId}`);
    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500, true, error.message);
      appError.sendErrorResponse(res);
    }
  }
};
