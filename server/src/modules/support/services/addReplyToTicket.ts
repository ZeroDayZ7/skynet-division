import SystemLog from '#ro/common/utils/SystemLog';
import SupportMessage from '#ro/models/support/SupportTicketMessage';
import Users from '#ro/models/Users'; // lub skąd masz model użytkownika

export async function addReplyToTicket(ticketId: number, userId: number, message: string) {
  const newMessage = await SupportMessage.create({
    ticket_id: ticketId,
    sender_id: userId,
    message,
    sender_type: 'user',
  });

  // Pobierz użytkownika
  const user = await Users.findByPk(userId, {
    attributes: ['username', 'role']
  });
//   SystemLog.debug(`user: ${JSON.stringify(user, null, 2)}`);

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
    }
  };
}
