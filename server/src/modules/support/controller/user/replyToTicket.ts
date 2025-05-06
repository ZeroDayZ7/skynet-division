import { RequestHandler } from 'express';
import * as SupportService from '../../services';
import SystemLog from '#ro/common/utils/SystemLog';
import { z } from 'zod';

// Schemat walidacji i oczyszczania wiadomości
const messageSchema = z
  .string()
  .min(1, 'Wiadomość nie może być pusta')
  .transform((val) =>
    val
      .replace(/[^\p{L}\p{N} ]+/gu, '') // usuwa wszystko poza literami, cyframi i spacjami
      .replace(/\s+/g, ' ')            // zamienia wiele spacji/newline/tab na pojedynczą spację
      .trim()
  );

// POST /api/support/:id/reply
export const replyToTicket: RequestHandler = async (req, res) => {
  try {
    const userId = req.session.userId!;
    const ticketId = parseInt(req.params.id, 10);

    if (!userId) {
      res.status(401).json({ success: false, message: 'Nieautoryzowane' });
      return;
    }

    const parseResult = messageSchema.safeParse(req.body.message);

    if (!parseResult.success) {
      res.status(400).json({ success: false, message: parseResult.error.errors[0].message });
      return;
    }

    const cleanMessage = parseResult.data;

    SystemLog.warn(`message: ${cleanMessage}, userId: ${userId}, ticketId: ${ticketId}`);

    const newMessage = await SupportService.addReplyToTicket(ticketId, userId, cleanMessage);

    SystemLog.debug(`[newMessage]: ${JSON.stringify(newMessage, null, 2)}`);
    res.status(200).json(newMessage);

  } catch (err) {
    console.error('[supportController.replyToTicket]', err);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
};
