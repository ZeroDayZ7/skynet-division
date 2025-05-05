import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';

  // Zamknięcie zgłoszenia przez admina
  export const closeTicketByAdmin: RequestHandler = async (req, res) => {
    try {
      const { id, reason } = req.params;
      const adminId = req.session.userId!;
  
      if (!adminId) {
        res.status(401).json({ success: false, message: 'Nieautoryzowane' });
      }
  
      const closedTicket = await SupportService.closeTicket(Number(id), adminId, reason === '' ? 'Brak wiadomość' : '');
      res.status(200).json({ success: true, data: closedTicket });
    } catch (err) {
      console.error('[supportController.closeTicketByAdmin]', err);
      res.status(500).json({ 
        success: false, 
        message: 'Wewnętrzny błąd serwera' 
      });
    }
  };