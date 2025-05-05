// services/support/getTicketDetails.ts
import SupportTicket from '#ro/models/support/SupportTicket';
import SupportMessage from '#ro/models/support/SupportTicketMessage';
import Users from '#ro/models/Users';

export async function getTicketDetails(ticketId: number, userId: number) {
  const ticket = await SupportTicket.findOne({
    where: {
      id: ticketId,
      user_id: userId,
    },
    attributes: ['id', 'subject', 'status', 'createdAt'],
    include: [
      {
        model: SupportMessage,
        as: 'SupportMessages',
        separate: true,
        order: [['id', 'ASC']],
        attributes: ['id', 'sender_id', 'message', 'createdAt'],
        include: [
          {
            model: Users,
            as: 'sender',
            attributes: ['username', 'role'],
          },
        ],
      },
    ],
  });

  if (!ticket) throw new Error('Zgłoszenie nie istnieje lub brak dostępu.');

  return ticket;
}
