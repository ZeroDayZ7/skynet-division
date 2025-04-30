import { Request, Response, NextFunction } from 'express';
import AppError, { ErrorType } from '#ro/common/errors/AppError';
import { fetchUserNotifications } from '../../services/notification.service';
import SystemLog from '#ro/common/utils/SystemLog';

export const readNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    SystemLog.info(`[readNotificationController] START`);
    const userId = req.session.userId;
    if (!userId) {
      throw new AppError('UNAUTHORIZED', 401, true, 'Brak autoryzacji', ErrorType.UNAUTHORIZED);
    }

    const limit = parseInt(req.query.limit as string, 10) || 10;
    const afterId = req.query.afterId ? parseInt(req.query.afterId as string, 10) : undefined;

    SystemLog.info(`limit: ${limit}, afterId: ${afterId}`);
    const { notifications, total } = await fetchUserNotifications(userId, limit, afterId, true);

    res.json({ success: true, data: { notifications, total } });
  } catch (err: any) {
    next(err);
  }
};