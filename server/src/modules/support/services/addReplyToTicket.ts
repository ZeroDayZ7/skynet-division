import SystemLog from '#ro/common/utils/SystemLog';
import SupportMessage from '#ro/models/support/SupportTicketMessage';
import Users from '#ro/models/Users'; // lub skąd masz model użytkownika

import SupportTicket from '#ro/models/support/SupportTicket'; // Zakładam, że masz model SupportTicket

export async function addReplyToTicket(ticketId: number, userId: number, message: string) {
  // Sprawdź, czy ticket istnieje i nie jest zamknięty
  const ticket = await SupportTicket.findByPk(ticketId);
  if (!ticket) {
    throw new Error(`Ticket with id ${ticketId} not found`);
  }
  if (ticket.status === 'closed') {
    throw new Error(`Cannot add message to closed ticket ${ticketId}`);
  }

  const newMessage = await SupportMessage.create({
    ticket_id: ticketId,
    sender_id: userId,
    message,
    sender_type: 'user',
  });

  const user = await Users.findByPk(userId, {
    attributes: ['username', 'role'],
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  return {
    id: newMessage.id,
    message: newMessage.message,
    sender_id: newMessage.sender_id,
    createdAt: newMessage.createdAt,
    sender: {
      username: user.username,
      role: user.role,
    },
  };
}