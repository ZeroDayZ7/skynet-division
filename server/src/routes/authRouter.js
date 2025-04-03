import express from 'express';

// import loginEndpoint from '#endpoints/v1/auth/login.js';
import { loginController } from '#controllers/auth/loginController.js';
import { logoutController } from '#controllers/auth/logoutController.js';
import { checkSessionStatus } from '#controllers/auth/statusController.js';

import { authMiddleware } from '#middlewares/auth.js';
import rateLimiterConfig from '#config/rateLimiterConfig.js'; // Import domyślny

const { authLimiter } = rateLimiterConfig;

const router = express.Router();

// Logowanie
router.post('/login', authLimiter, loginController);

// Wylogowanie
router.post('/logout', authMiddleware, logoutController);

// Status
router.get('/status', checkSessionStatus);

// Rejestracja
// router.post('/register', require('../endpoints/registrationEndpoint.js'));

// Odświeżanie tokena
// router.post('/refresh-token', require('../endpoints/auth/refreshToken.js'));

// Obsługuje inne niezdefiniowane trasy (404)
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export default router; // Zmiana na ESM
