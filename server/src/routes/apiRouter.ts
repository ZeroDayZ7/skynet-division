import express from 'express';
import authRouter from '#ro/auth/routes/authRouter';
import usersRouter from '#ro/auth/routes/usersRouter'

const router = express.Router();

// Podłączanie podrouterów
router.use('/auth', authRouter);
router.use('/users', usersRouter);

// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
