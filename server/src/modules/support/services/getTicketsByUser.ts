// services/support/getTicketsByUser.ts
import SupportTicket from '#ro/models/support/SupportTicket';
import { Op } from 'sequelize';

export async function getTicketsByUser(
  userId: number,
  status: string[] = ['new', 'open', 'in_progress'],
  limit = 5
) {
  return await SupportTicket.findAll({
    where: {
      user_id: userId,
      status: { [Op.in]: status },
    },
    limit,
    order: [['createdAt', 'DESC']],
    attributes: ['id', 'subject', 'status', 'createdAt'], // bez wiadomości
  });
}
