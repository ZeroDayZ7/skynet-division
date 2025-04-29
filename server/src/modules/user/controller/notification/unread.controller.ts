// src/modules/user/controllers/unreadNotification.controller.ts
import { Request, Response, NextFunction } from 'express';
import AppError, { ErrorType } from '#ro/common/errors/AppError';
import { fetchUserNotifications } from '../../services/notification.service';
import SystemLog from '#ro/common/utils/SystemLog';

export const unreadNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    SystemLog.warn(`[unreadNotificationController] START`);
    const userId = req.session.userId;
    if (!userId) throw new AppError('UNAUTHORIZED', 401, true, 'Brak autoryzacji', ErrorType.UNAUTHORIZED);

    const { limit, afterId } = (req as any)._validatedData as { limit: number; afterId?: number };
    const { notifications, total } = await fetchUserNotifications(userId, limit, afterId, false);

    res.json({ success: true, notifications, total });
  } catch (err: any) {
    next(err);
  }
};