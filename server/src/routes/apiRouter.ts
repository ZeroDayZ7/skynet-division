import express from 'express';
import authRouter from '#ro/modules/auth/routes/authRouter';
import usersRouter from '#ro/modules/user/routes/usersRouter';
import adminRouter from '#ro/modules/admin/routes/admin.router';
import supportRouter from '#ro/modules/support/routes/support.routes';
import { getCsrfToken } from '#ro/common/csrf/csrf.controller';
import { checkSessionStatus } from '#ro/modules/auth/controllers/session.controller.js';
import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';
import { authMiddleware } from '#ro/common/middlewares/auth.middleware';
import { checkRole } from '#ro/common/middlewares/role.middleware.js';

// /api
const router = express.Router();

// Globalne endpointy
router.get('/csrf-token', getCsrfToken);
router.get('/session', checkSessionStatus);

router.use('/support', supportRouter);

// Podłączanie podrouterów
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/admin', 
      csrfMiddleware, 
      authMiddleware, 
      checkRole(['admin', 'superadmin']),
      adminRouter);

router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export default router;
