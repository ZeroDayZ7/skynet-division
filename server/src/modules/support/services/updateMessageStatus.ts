import SupportTicket from "#ro/models/support/SupportTicket";
import SupportMessage from "#ro/models/support/SupportTicketMessage";

export async function updateMessageStatus(
    ticketId: string,
    status: 'new' | 'open' | 'in_progress' | 'closed',
    response: string | null,
    adminId: number
  ) {
    const ticket = await SupportTicket.findByPk(ticketId);
  
    if (!ticket) {
      throw new Error('Zgłoszenie nie zostało znalezione');
    }
  
    // Zmieniamy status zgłoszenia
    ticket.status = status;
    await ticket.save();
  
    // Jeśli admin odpisał – dodajemy wiadomość do tabeli support_ticket_messages
    if (response && response.trim().length > 0) {
      await SupportMessage.create({
        ticket_id: ticket.id,
        sender_type: 'support',
        sender_id: adminId,
        message: response.trim(),
      });
    }
  
    return ticket;
  }
  