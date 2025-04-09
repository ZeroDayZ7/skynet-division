import express from 'express';

// import loginEndpoint from '#endpoints/v1/auth/login.js';
import { loginController } from '#auth/controllers/auth/loginController';
import { logoutController } from '#auth/controllers/auth/logoutController';
import { checkSessionStatus } from '#auth/controllers/auth/statusController.js';

// import { authMiddleware } from '#middlewares/auth.js';
import rateLimiterConfig from '#middlewares/rateLimiter'; // Import domyślny
import { validateRequest } from "#auth/middleware/validateRequest";
import { loginSchema } from "#auth/validators/loginSchema";
import { authMiddleware } from '#auth/middleware/auth.middleware';

const { authLimiter } = rateLimiterConfig;

const router = express.Router();

// Logowanie
router.post('/login', authLimiter, validateRequest(loginSchema), loginController);

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