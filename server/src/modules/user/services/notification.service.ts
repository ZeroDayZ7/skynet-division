// src/modules/user/services/notification.service.ts
import { Op } from 'sequelize';
import NotificationModel from '#ro/modules/user/models/notification.model';
import NotificationTemplateModel from '#ro/modules/user/models/notification.template.model';
import SystemLog from '#ro/common/utils/SystemLog';

export interface FetchNotificationsResult {
  notifications: NotificationModel[];
  total: number;
}

export const fetchUserNotifications = async (
  userId: number,
  limit: number,
  afterId: number | undefined,
  isRead: boolean
): Promise<FetchNotificationsResult> => {
  const where: any = {
    user_id: userId,
    is_read: isRead,
  };
  if (afterId) where.id = { [Op.lt]: afterId };

  SystemLog.info(`Fetching notifications for user ${userId}, isRead: ${isRead}, afterId: ${afterId}, limit: ${limit}`);

  const [notifications, total] = await Promise.all([
    NotificationModel.findAll({
      where,
      order: [['id', 'DESC']],
      limit,
      include: [
        {
          model: NotificationTemplateModel,
          as: 'template',
          attributes: ['title', 'message', 'type', 'createdAt'],
        },
      ],
    }),
    NotificationModel.count({ where }),
  ]);

  SystemLog.info(`Fetched ${notifications.length} notifications, total: ${total}`);

  return { notifications, total };
};

export const markUserNotificationsAsRead = async (userId: number, ids: number[]) => {
  await NotificationModel.update(
    { is_read: true },
    {
      where: {
        user_id: userId,
        id: ids,
      },
    }
  );
};