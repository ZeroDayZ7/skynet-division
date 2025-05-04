import { Op } from 'sequelize';
import NotificationModel from '#ro/modules/user/models/notification.model';
import NotificationTemplateModel from '#ro/modules/user/models/notification.template.model';
import SystemLog from '#ro/common/utils/SystemLog';

export interface FetchNotificationsResult {
  notifications: NotificationModel[];
  total: number;
}

export interface NotificationCounts {
  unread: number;
  read: number;
}

/**
 * Pobiera powiadomienia użytkownika z paginacją.
 * @param userId - ID użytkownika.
 * @param limit - Limit powiadomień na stronę.
 * @param afterId - ID powiadomienia, od którego zacząć (opcjonalne).
 * @param isRead - Czy pobierać przeczytane (true) czy nieprzeczytane (false) powiadomienia.
 * @returns Obiekt z listą powiadomień i ich całkowitą liczbą.
 */
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
  if (afterId) {
    where.id = { [Op.lt]: afterId };
  }

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

/**
 * Oznacza powiadomienia jako przeczytane.
 * @param userId - ID użytkownika.
 * @param ids - Tablica ID powiadomień do oznaczenia.
 */
export const markUserNotificationsAsRead = async (userId: number, ids: number[]): Promise<void> => {
  await NotificationModel.update(
    { is_read: true }, // Zmieniono z 1 na true
    {
      where: {
        user_id: userId,
        id: ids,
      },
    }
  );
  SystemLog.info(`Marked ${ids.length} notifications as read for user ${userId}`);
};

/**
 * Pobiera liczbę przeczytanych i nieprzeczytanych powiadomień użytkownika.
 * @param userId - ID użytkownika.
 * @returns Obiekt z liczbą nieprzeczytanych i przeczytanych powiadomień.
 */
type CountType = 'read' | 'unread' | 'both';

export const getNotificationsCount = async (
  userId: number,
  type: CountType = 'both'
): Promise<Partial<NotificationCounts>> => {
  if (!userId) {
    throw new Error('Brak ID użytkownika');
  }

  SystemLog.info(`Fetching "${type}" notification counts for user ${userId}`);

  if (type === 'read') {
    const read = await NotificationModel.count({ where: { user_id: userId, is_read: 1 } });
    return { read };
  }

  if (type === 'unread') {
    const unread = await NotificationModel.count({ where: { user_id: userId, is_read: 0 } });
    return { unread };
  }

  // Domyślnie oba
  const [unread, read] = await Promise.all([
    NotificationModel.count({ where: { user_id: userId, is_read: 0 } }),
    NotificationModel.count({ where: { user_id: userId, is_read: 1 } }),
  ]);

  return { unread, read };
};
