import express from 'express';

import loginEndpoint from '../endpoints/auth/login.js';
import logoutEndpoint from '../endpoints/auth/logout.js';

import { authMiddleware } from '../middlewares/auth.js';
import rateLimiterConfig from '../config/rateLimiterConfig.js'; // Import domyślny

const { authLimiter } = rateLimiterConfig;

const router = express.Router();

// Logowanie
router.post('/login', authLimiter, loginEndpoint);

// Wylogowanie
router.post('/logout', authMiddleware, logoutEndpoint);
// router.post('/logout', logoutEndpoint);

// Rejestracja
// router.post('/register', require('../endpoints/registrationEndpoint.js'));

// Odświeżanie tokena
// router.post('/refresh-token', require('../endpoints/auth/refreshToken.js'));

// Obsługuje inne niezdefiniowane trasy (404)
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export default router; // Zmiana na ESM
