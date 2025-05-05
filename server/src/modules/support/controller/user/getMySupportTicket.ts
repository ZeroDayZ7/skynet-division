import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';

// GET /api/support?status={status}&limit={limit}
export const getMySupportTicket: RequestHandler = async (req, res) => {
  try {
    const userId = req.session.userId!;
    const status = req.query.status ? (req.query.status as string).split(',') : ['new', 'open', 'in_progress'];
    const limit = parseInt(req.query.limit as string) || 5;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Nieautoryzowane' });
    }

    const messages = await SupportService.getTicketsByUser(userId, status, limit);
    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    console.error('[supportController.getMySupportMessages]', err);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
};