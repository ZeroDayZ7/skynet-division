import express from 'express';

// import loginEndpoint from '#ro/endpoints/v1/auth/login.js';
import { loginController } from '#ro/auth/controllers/auth/loginController';
import { logoutController } from '#ro/auth/controllers/auth/logoutController';
import { checkSessionStatus } from '#ro/auth/controllers/auth/statusController.js';
import { checkEmailAvailabilityController } from '#ro/auth/controllers/registration/checkEmailAvailabilityController';

// import { authMiddleware } from '#ro/middlewares/auth.js';
import rateLimiterConfig from '#ro/middlewares/rateLimiter'; // Import domyślny
import { validateRequest } from '#ro/auth/middleware/validateRequest';
import { loginSchema, LoginInput } from '#ro/auth/validators/loginSchema';
import { authMiddleware } from '#ro/auth/middleware/auth.middleware';

const { authLimiter } = rateLimiterConfig;

const router = express.Router();

// Logowanie
router.post('/login', authLimiter, validateRequest<LoginInput>(loginSchema), loginController);

// Wylogowanie
router.post('/logout', authMiddleware, logoutController);

router.post('/check-email', authMiddleware, checkEmailAvailabilityController);

// Status
router.get('/status', checkSessionStatus);

// Rejestracja
// router.post('/register', require('../endpoints/registrationEndpoint.js'));

// Odświeżanie tokena
// router.post('/refresh-token', require('../endpoints/auth/refreshToken.js'));

// Obsługuje inne niezdefiniowane trasy (404)
// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
