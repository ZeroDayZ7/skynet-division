import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';

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