// backend/controllers/supportController.ts
import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';

// GET /api/support?status={status}&limit={limit}&page={page}
export const getMySupportTicket: RequestHandler = async (req, res) => {
  try {
    const userId = req.session.userId!;
    const status = req.query.status ? (req.query.status as string).split(',') : ['new', 'open', 'in_progress'];
    const limit = parseInt(req.query.limit as string) || 5;
    const page = parseInt(req.query.page as string) || 1;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Nieautoryzowane' });
      return;
    }

    const { tickets, total } = await SupportService.getTicketsByUser(userId, status, limit, page);
    res.status(200).json({
      data: tickets,
      total,
      page,
      limit,
    });
  } catch (err) {
    console.error('[supportController.getMySupportMessages]', err);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
};