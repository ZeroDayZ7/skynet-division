import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';

// GET /api/support/:id
export const getTicketDetailsById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.userId!;
    SystemLog.warn(`id: ${id}, userId: ${userId}`);

    if (!userId) {
      res.status(401).json({ success: false, message: 'Nieautoryzowane' });
      return;
    }

    const ticket = await SupportService.getTicketDetails(Number(id), userId);
    // SystemLog.warn(`[getTicketDetailsById][ticket]: ${JSON.stringify(ticket, null, 2)}`);
    if (!ticket || ticket.user_id !== userId) {
      // SystemLog.info(`[!ticket || ticket.user_id !== userId][true]`);
      res.status(403).json({ success: false, message: 'Brak uprawnień' });
      return;
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (err) {
    console.error('[supportController.getTicketDetails]', err);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
};
