import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';

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