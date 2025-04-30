import { Request, Response, NextFunction } from 'express';
import AppError, { ErrorType } from '#ro/common/errors/AppError';
import { getNotificationsCount } from '../../services/notification.service';
import SystemLog from '#ro/common/utils/SystemLog';

export const countNotificationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    SystemLog.info(`[countNotificationsController] START`);
    const userId = req.session.userId;
    if (!userId) {
      throw new AppError('UNAUTHORIZED', 401, true, 'Brak autoryzacji', ErrorType.UNAUTHORIZED);
    }

    const counts = await getNotificationsCount(userId);
    res.json({ success: true, data: counts });
  } catch (err: any) {
    next(err);
  }
};