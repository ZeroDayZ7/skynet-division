import NotificationModel from '#ro/modules/user/models/notification.model'; // dostosuj ścieżkę jeśli trzeba
import NotificationTemplateModel from '#ro/modules/user/models/notification.template.model';

export const fetchUserNotifications = async (
  userId: number,
  page: number = 1,
  limit: number = 10
) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await NotificationModel.findAndCountAll({
    where: { 
      user_id: userId,
      is_read: 0,
    },
    order: [['created_at', 'DESC']],
    offset,
    limit,
    attributes: ['id'],
    include: [
      {
        model: NotificationTemplateModel,
        as: 'template',
        attributes: ['title', 'message', 'type', 'created_at'],
      },
    ],
  });
  
  return { notifications: rows, total: count };  
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
