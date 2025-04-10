import express from 'express';
import authRouter from '#auth/routes/authRouter';
import usersRouter from '#auth/routes/usersRouter'

import { authMiddleware } from '#auth/middleware/auth.middleware';

const router = express.Router();

// Podłączanie podrouterów
router.use('/auth', authRouter);
router.use('/users', authMiddleware, usersRouter);

router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export default router; // Zmiana na ESM
