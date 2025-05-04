// services/support.service.ts

import Support from '#models/SupportMessages';
import Users from '#ro/models/Users';
import { Op } from 'sequelize';

// Tworzenie nowej wiadomości wsparcia
export async function saveMessage(userId: number, subject: string, message: string) {
  return await Support.create({
    user_id: userId,
    subject,
    message,
  });
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
  const { rows: tickets, count: totalItems } = await Support.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return { tickets, totalItems };
}

// Pobieranie wiadomości wsparcia dla danego użytkownika
export async function getMessagesByUser(userId: number) {
  return await Support.findAll({
    where: { user_id: userId },
    order: [['createdAt', 'DESC']],
    attributes: {
      exclude: ['responder_id'],
    },
    include: [
      {
        model: Users,
        as: 'responder', // to odnosi się do relacji, którą zdefiniowałeś w modelu Support
        attributes: ['username', 'role'], // wybieramy tylko te pola, które chcesz pobrać
      },
    ],
  });
}


// Aktualizacja statusu wiadomości wsparcia
export async function updateMessageStatus(id: string, status: 'open' | 'in_progress' | 'closed', response: string, responderId: number) {
  const message = await Support.findByPk(id);

  if (!message) {
    throw new Error('Wiadomość nie została znaleziona');
  }

  message.status = status;
  message.response = response;
  message.responder_id = responderId;

  await message.save();

  return message;
}
