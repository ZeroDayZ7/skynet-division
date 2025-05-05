import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';


// GET /api/support/:id
export const getTicketDetailsById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.userId!;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Nieautoryzowane' });
    }

    const ticket = await SupportService.getTicketDetails(Number(id), userId);
    if (ticket.user_id !== userId) {
      res.status(403).json({ success: false, message: 'Brak uprawnień' });
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (err) {
    console.error('[supportController.getTicketDetails]', err);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
};