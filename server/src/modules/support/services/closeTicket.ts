import SupportTicket from "#ro/models/support/SupportTicket";
import SupportMessage from "#ro/models/support/SupportTicketMessage";

/**
 * Zamykanie ticketa
 */
export async function closeTicket(ticketId: number, userId: number, reason?: string) {
    const ticket = await SupportTicket.findByPk(ticketId);
    if (!ticket) throw new Error('Zgłoszenie nie zostało znalezione');
    if (ticket.user_id !== userId) throw new Error('Brak uprawnień');
  
    ticket.status = 'closed';
    await ticket.save();
  
    if (reason) {
      await SupportMessage.create({
        ticket_id: ticket.id,
        sender_type: 'user',
        sender_id: userId,
        message: `Zgłoszenie zamknięte przez użytkownika: ${reason}`,
      });
    } else {
      await SupportMessage.create({
        ticket_id: ticket.id,
        sender_type: 'user',
        sender_id: userId,
        message: 'Zgłoszenie zamknięte przez użytkownika',
      });
    }
  
    return ticket;
  }
  