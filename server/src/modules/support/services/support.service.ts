// services/support.service.ts

import Support from '#models/SupportMessages';

// Tworzenie nowej wiadomości wsparcia
export async function saveMessage(userId: number, subject: string, message: string) {
  return await Support.create({
    user_id: userId,
    subject,
    message,
  });
}

// Pobieranie wiadomości wsparcia dla danego użytkownika
export async function getMessagesByUser(userId: number) {
  return await Support.findAll({
    where: { user_id: userId },
    order: [['createdAt', 'DESC']],
  });
}

// Pobieranie wszystkich wiadomości dla admina
export async function getAllMessages() {
  return await Support.findAll({
    order: [['createdAt', 'DESC']],
  });
}

// Aktualizacja statusu wiadomości wsparcia
export async function updateMessageStatus(id: string, status: 'new' | 'open' | 'in_progress' | 'closed', response: string | null, responderId: number) {
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
