import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';

// POST /api/support/:id/reply
// POST /api/support/:id/reply
export const replyToTicket: RequestHandler = async (req, res) => {
    try {
      const { message } = req.body;
      const userId = req.session.userId!;
      const ticketId = parseInt(req.params.id, 10);
      SystemLog.warn(`message: ${message}, userId: ${userId}, ticketId: ${ticketId}`);
  
      if (!userId) {
        res.status(401).json({ success: false, message: 'Nieautoryzowane' });
        return;
      }
  
      if (!message) {
        res.status(400).json({ success: false, message: 'Brak treści wiadomości' });
        return;
      }
  
      // ⬇️ Zapisz wiadomość i zachowaj wynik
      const newMessage = await SupportService.addReplyToTicket(ticketId, userId, message);
      SystemLog.debug(`[newMessage]: ${JSON.stringify(newMessage, null, 2)}`);
        
      // ⬇️ Zwróć ją w odpowiedzi
    //   res.status(200).json({ newMessage });
      res.status(200).json(newMessage);
    } catch (err) {
      console.error('[supportController.replyToTicket]', err);
      res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
    }
  };
  