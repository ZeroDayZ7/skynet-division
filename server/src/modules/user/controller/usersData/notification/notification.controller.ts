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
    SystemLog.warn(`req.body: ${JSON.stringify(req.body, null, 2)}`);
    const { page, limit } = req.body;

    const { notifications, total } = await fetchUserNotifications(userId, Number(page), Number(limit));
    // SystemLog.warn(`notifications: ${JSON.stringify(notifications, null, 2)}`);

    SystemLog.info(`Pobrano powiadomienia użytkownika: ${userId}`);
    res.status(200).json({ success: true, notifications, total });
  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500, true, error.message);
      appError.sendErrorResponse(res);
    }
  }
};
