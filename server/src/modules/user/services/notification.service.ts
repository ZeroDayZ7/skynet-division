import NotificationModel from '#ro/modules/user/models/notification.model'; // dostosuj ścieżkę jeśli trzeba
import NotificationTemplateModel from '#ro/modules/user/models/notification.template.model';

export const fetchUserNotifications = async (
  userId: number,
  page: number = 1,
  limit: number = 10
) => {
  const offset = (page - 1) * limit;

  const notifications = await NotificationModel.findAll({
    where: { 
        user_id: userId,
        is_read: 0,
    },
    order: [['created_at', 'DESC']],
    offset,
    limit,
    include : [
        {
            model: NotificationTemplateModel,
            as: 'template',
            attributes: ['id', 'title', 'message', 'type', 'created_at']
        }
    ]
  });

  return notifications;
};
