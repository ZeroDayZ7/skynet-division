import express from 'express';
import authRouter from '#routes/authRouter.js';
import usersRouter from '#routes/usersRouter.js'

import { authMiddleware } from '#middlewares/auth.js';

const router = express.Router();

// Podłączanie podrouterów
router.use('/auth', authRouter);
router.use('/users', authMiddleware, usersRouter);

router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export default router; // Zmiana na ESM
