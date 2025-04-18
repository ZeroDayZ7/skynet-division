import express from 'express';
import authRouter from '#ro/modules/auth/routes/authRouter';
import usersRouter from '#ro/modules/user/routes/usersRouter';
import { getCsrfToken } from '#ro/common/csrf/csrf.controller';
import { checkSessionStatus } from '#ro/modules/auth/controllers/session.controller.js';

const router = express.Router();

// Globalne endpointy
router.get('/csrf-token', getCsrfToken);
router.get('/session', checkSessionStatus);
// Podłączanie podrouterów
router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export default router;
