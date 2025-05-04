import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/common/utils/SystemLog.js';
import AppError, { ErrorType } from '#errors/AppError';
import { getNotificationsCount } from '#ro/modules/user/services/notification.service'; // <--- importujesz z serwisu
// import UserModel from '#models/Users'; // jeśli chcesz też dane użytkownika

export const meUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      throw new AppError('UNAUTHORIZED', 401, true, 'Brak autoryzacji', ErrorType.UNAUTHORIZED);
    }

    // const user = await UserModel.findByPk(userId, {
    //   attributes: ['id', 'email', 'role', 'permissions'],
    // });

    const { unread } = await getNotificationsCount(userId, 'unread');
    SystemLog.info(`count: ${unread}`);

    res.json({
        notifications: {
          unreadCount: unread ?? 0,
        },
    });
  } catch (err) {
    next(err);
  }
};
