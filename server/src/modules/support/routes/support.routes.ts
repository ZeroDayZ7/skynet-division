// routes/supportRoutes.ts

import { Router } from 'express';
import * as SupportController from '../controller/support.controller';

const router = Router();

// Ścieżki dla użytkownika
router.post('/', SupportController.createSupportMessage); // Pobierz listę zgłoszeń  
router.get('/', SupportController.getMySupportMessages); // Utwórz nowe zgłoszenie  
router.patch('/:id/close', SupportController.closeTicketByUser); // Zaktualizuj zgłoszenie  

// Ścieżki dla administratora
router.get('/admin/tickets', SupportController.getAllSupportMessagesForAdmin);
router.patch('/admin/tickets/:id/response', SupportController.updateSupportMessageStatus);

export default router;
