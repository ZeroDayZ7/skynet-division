// routes/supportRoutes.ts

import { Router } from 'express';
import * as SupportController from '../controller/support.controller';

const router = Router();

// Ścieżki dla użytkownika
router.post('/', SupportController.createSupportMessage);
router.get('/', SupportController.getMySupportMessages);

// Ścieżki dla administratora
router.get('/admin/tickets', SupportController.getAllSupportMessagesForAdmin);
router.patch('/admin/tickets/:id/response', SupportController.updateSupportMessageStatus);

export default router;
