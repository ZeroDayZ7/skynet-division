import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';

// Zamknięcie zgłoszenia przez użytkownika
// PATCH /api/support/:id/close
export const closeTicketByUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const userId = req.session.userId!;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Nieautoryzowane' });
    }

    const closedTicket = await SupportService.closeTicket(Number(id), userId, reason);
    res.status(200).json({ success: true, data: closedTicket });
  } catch (err) {
    console.error('[supportController.closeTicketByUser]', err);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
};