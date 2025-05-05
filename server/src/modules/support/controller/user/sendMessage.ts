import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';

// POST /api/support/:id/reply
export const sendMessage: RequestHandler = async (req, res) => {
  try {
    
    const { subject, message } = req.body;
    const userId = req.session.userId!;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Nieautoryzowane' });
    }
    if (!message) {
      res.status(400).json({ success: false, message: 'Brak treści wiadomości' });
    }


    const newMessage = await SupportService.saveMessage(userId, subject, message);
    res.status(201).json({ success: true, data: newMessage });
  } catch (err) {
    console.error('[supportController.sendMessage]', err);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
};