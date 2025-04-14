import express from 'express';

// import loginEndpoint from '#ro/endpoints/v1/auth/login.js';
import { loginController } from '#ro/modules/auth/controllers/loginController';
import { logoutController } from '#ro/modules/auth/controllers/logoutController';
import { checkSessionStatus } from '#ro/modules/auth/controllers/statusController.js';
// import { checkEmailAvailabilityController } from '#ro/auth/controllers/registration/checkEmailAvailabilityController';

// import { authMiddleware } from '#ro/middlewares/auth.js';
import { validateRequest } from '#ro/common/middlewares/validateRequest';
import { loginSchema, LoginPayload } from '#ro/modules/auth/validators/login.validator';
import { authMiddleware } from '#ro/common/middlewares/auth.middleware';

const router = express.Router();

// Logowanie
router.post('/login', validateRequest<LoginPayload>(loginSchema), loginController);

// Wylogowanie
router.post('/logout', authMiddleware, logoutController);

// router.post('/check-email', authMiddleware, checkEmailAvailabilityController);

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
