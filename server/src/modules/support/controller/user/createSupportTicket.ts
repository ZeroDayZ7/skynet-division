
import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';

// POST /api/user/support - Tworzenie wiadomości wsparcia
export const createSupportTicket: RequestHandler = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const userId = req.session.userId!;

    SystemLog.warn(`subject: ${subject} | message: ${message} | userId: ${userId}`);

    // Sprawdzanie, czy dane są obecne
    if (!userId || !subject || !message) {
      res.status(400).json({ success: false, message: 'Brak userId, subject lub message' });
    }

    // Zapisanie wiadomości
    const savedMessage = await SupportService.saveMessage(userId, subject, message);

    res.status(201).json({ success: true, data: savedMessage });
  } catch (err) {
    console.error('[supportController.createSupportMessage]', err);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
};