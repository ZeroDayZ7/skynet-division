// services/support.service.ts

import SupportTicket from '#ro/models/support/SupportTicket';
import SupportMessage from '#ro/models/support/SupportTicketMessage';
import { SupportMessageCreationAttributes } from '#ro/models/support/SupportMessageAttributes';
import { SupportCreationTicketAttributes } from '#ro/models/support/SupportTicketAttributes';
import Users from '#ro/models/Users';
import { Op } from 'sequelize';

// Tworzenie nowej wiadomości wsparcia
// Funkcja do zapisania nowego zgłoszenia i wiadomości
export async function saveMessage(userId: number, subject: string, message: string) {
  // Tworzymy nowe zgłoszenie (ticket)
  const newticket: SupportCreationTicketAttributes = {
    user_id: userId,
    subject,
    status: 'new', // Status początkowy zgłoszenia
  };

  const ticket = await SupportTicket.create(newticket);

  // Tworzymy nową wiadomość (message)
  const newMessage: SupportMessageCreationAttributes = {
    ticket_id: ticket.id,  // Powiązanie wiadomości z zgłoszeniem
    sender_type: 'user', // Nadawca wiadomości to użytkownik
    sender_id: userId, // ID użytkownika
    message, // Treść wiadomości
  };

  await SupportMessage.create(newMessage);

  return { success: true };
}








interface GetAllMessagesOptions {
  page: number;
  limit: number;
  status?: string;
  query?: string;
}

// Pobieranie wszystkich wiadomości dla admina
export async function getAllMessages(options: GetAllMessagesOptions) {
  const { page, limit, status, query } = options;

  // Oblicz offset
  const offset = (page - 1) * limit;

  // Warunki filtrowania
  const where: any = {};

  // Filtr statusu
  if (status && status !== 'all') {
    where.status = status;
  }

  // Wyszukiwanie po subject lub user_id
  if (query) {
    where[Op.or] = [
      { subject: { [Op.iLike]: `%${query}%` } },
      { user_id: { [Op.eq]: parseInt(query) || 0 } },
    ];
  }

  // Pobierz tickety z paginacją
  const { rows: tickets, count: totalItems } = await SupportTicket.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return { tickets, totalItems };
}





















// services/support.service.ts
export async function getMessagesByUser(userId: number) {
  return await SupportTicket.findAll({
    where: {
      user_id: userId,
    },
    order: [['createdAt', 'DESC']], // Sortowanie zgłoszeń
    attributes: ['id', 'subject', 'status', 'createdAt'],
    include: [
      {
        model: SupportMessage,
        as: 'SupportMessages',
        order: [['id', 'ASC']], // Sortowanie wiadomości po ID rosnąco
        attributes: ['id', 'sender_id', 'message', 'createdAt'],
        separate: true, // Wymagane dla sortowania w included models
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
}



// services/support.service.ts

export async function closeTicket(
  ticketId: string | number,
  userId: number,
  isAdmin: boolean = false
) {
  const ticket = await SupportTicket.findByPk(ticketId);
  
  if (!ticket) {
    throw new Error('Zgłoszenie nie zostało znalezione');
  }

  // Walidacja uprawnień
  if (!isAdmin && ticket.user_id !== userId) {
    throw new Error('Nie masz uprawnień do zamknięcia tego zgłoszenia');
  }

  // Aktualizacja statusu
  ticket.status = 'closed';
  await ticket.save();

  // Dodanie systemowej wiadomości o zamknięciu
  await SupportMessage.create({
    ticket_id: ticket.id,
    sender_type: isAdmin ? 'support' : 'user',
    sender_id: userId,
    message: isAdmin 
      ? 'Zgłoszenie zostało zamknięte przez administratora'
      : 'Zgłoszenie zostało zamknięte przez użytkownika'
  });

  return ticket;
}
























// Aktualizacja statusu wiadomości wsparcia
// Aktualizacja statusu wiadomości wsparcia

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


