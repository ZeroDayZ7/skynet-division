// services/support/getTicketsByUser.ts
import SupportTicket from '#ro/models/support/SupportTicket';
import { Op } from 'sequelize';

export async function getTicketsByUser(
  userId: number,
  status: string[] = ['new', 'open', 'in_progress'],
  limit = 5,
  page = 1
): Promise<{ tickets: SupportTicket[]; total: number }> {
  const offset = (page - 1) * limit;

  const { rows: tickets, count: total } = await SupportTicket.findAndCountAll({
    where: {
      user_id: userId,
      status: { [Op.in]: status },
    },
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    attributes: ['id', 'subject', 'status', 'createdAt'], // bez wiadomości
  });

  return { tickets, total };
}