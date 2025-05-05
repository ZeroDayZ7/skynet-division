// routes/supportRoutes.ts

import { Router } from 'express';
import * as SupportController from '../controller/index';

//api/support
const router = Router();

// Ścieżki dla użytkownika
router.get('/', SupportController.getMySupportTicket); // lista zgłoszeń (nagłówki)
router.get('/:id', SupportController.getTicketDetailsById); // szczegóły zgłoszenia
router.post('/', SupportController.createSupportTicket); // utwórz nowe zgłoszenie
router.post('/:id/reply', SupportController.replyToTicket); // utwórz nowe zgłoszenie
router.patch('/:id/close', SupportController.closeTicketByUser); // zamknij zgłoszenie

// Ścieżki dla administratora
router.get('/admin/tickets', SupportController.getAllSupportMessagesForAdmin);
router.patch('/admin/tickets/:id/response', SupportController.updateSupportMessageStatus);

export default router;
