// controllers/supportController.ts

import { RequestHandler } from 'express';
import * as SupportService from '../services/support.service';
import SystemLog from '#ro/common/utils/SystemLog';

// POST /api/user/support - Tworzenie wiadomości wsparcia
export const createSupportMessage: RequestHandler = async (req, res) => {
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

// GET /api/user/support - Pobieranie wiadomości wsparcia użytkownika
export const getMySupportMessages: RequestHandler = async (req, res) => {
  try {
    // const userId = req.user?.id; // Jeśli masz usera w sesji
    const userId = req.session.userId!;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Nieautoryzowane' });
    }

    const messages = await SupportService.getMessagesByUser(userId);

    SystemLog.info(`[getMySupportMessages]: ${messages}`);
    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    console.error('[supportController.getMySupportMessages]', err);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
};

// GET /api/admin/support - Pobieranie wszystkich zgłoszeń wsparcia dla admina
export const getAllSupportMessagesForAdmin: RequestHandler = async (req, res) => {
  try {
    // Pobierz parametry z query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string | undefined;
    const query = req.query.query as string | undefined;

    // Walidacja parametrów
    if (page < 1 || limit < 1) {
      res.status(400).json({ success: false, message: 'Nieprawidłowe parametry paginacji' });
    }

    // Pobierz tickety z paginacją
    const { tickets, totalItems } = await SupportService.getAllMessages({
      page,
      limit,
      status,
      query,
    });

    // Oblicz totalPages
    const totalPages = Math.ceil(totalItems / limit);

    // SystemLog.warn(`Tickets: ${tickets.length}, Total Items: ${totalItems}, Total Pages: ${totalPages}`);

    res.status(200).json({
      success: true,
      tickets,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error('[supportController.getAllSupportMessagesForAdmin]', err);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
};

// PATCH /api/admin/support/:id - Aktualizacja statusu zgłoszenia
export const updateSupportMessageStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;
    const adminId = req.session.userId!;

    if (!adminId) {
      res.status(401).json({ success: false, message: 'Nieautoryzowane' });
    }

    if (!status) {
      res.status(400).json({ success: false, message: 'Brak statusu' });
    }

    const updatedMessage = await SupportService.updateMessageStatus(id, status, response, adminId);

    res.status(200).json({ success: true, data: updatedMessage });
  } catch (err) {
    console.error('[supportController.updateSupportMessageStatus]', err);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
};