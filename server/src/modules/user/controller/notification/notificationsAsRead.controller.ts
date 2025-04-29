import { Request, Response } from 'express';
import SystemLog from '#ro/common/utils/SystemLog.js';
import AppError, { ErrorType } from '#errors/AppError';
import { markUserNotificationsAsRead } from '#ro/modules/user/services/notification.service';

export const markNotificationsAsRead = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      throw new AppError('UNAUTHORIZED', 401, true, 'Brak autoryzacji', ErrorType.UNAUTHORIZED);
    }

    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new AppError('INVALID_REQUEST', 400, true, 'Brak identyfikatorów powiadomień', ErrorType.VALIDATION);
    }

    await markUserNotificationsAsRead(userId, ids);

    SystemLog.info(`Oznaczono powiadomienia jako przeczytane dla użytkownika #${userId}`);
    res.status(200).json({ success: true });
  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500, true, error.message);
      appError.sendErrorResponse(res);
    }
  }
};
