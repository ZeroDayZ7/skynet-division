import SupportTicket from '#ro/models/support/SupportTicket';
import SupportMessage from '#ro/models/support/SupportTicketMessage';
import { SupportMessageCreationAttributes } from '#ro/models/support/SupportMessageAttributes';
import { SupportCreationTicketAttributes } from '#ro/models/support/SupportTicketAttributes';

export async function saveMessage(userId: number, subject: string, message: string) {
  const newticket: SupportCreationTicketAttributes = {
    user_id: userId,
    subject,
    status: 'new',
  };

  const ticket = await SupportTicket.create(newticket);

  const newMessage: SupportMessageCreationAttributes = {
    ticket_id: ticket.id,
    sender_type: 'user',
    sender_id: userId,
    message,
  };

  await SupportMessage.create(newMessage);

  return { success: true };
}
