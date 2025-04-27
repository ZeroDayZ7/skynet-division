import express from 'express';

// import loginEndpoint from '#ro/endpoints/v1/auth/login.js';
import { loginController } from '#ro/modules/auth/controllers/login.controller';
import { logoutController } from '#ro/modules/auth/controllers/logout.controller';

// import { checkEmailAvailabilityController } from '#ro/auth/controllers/registration/checkEmailAvailabilityController';

// import { authMiddleware } from '#ro/middlewares/auth.js';
import { validateRequest } from '#ro/common/middlewares/validateRequest';
import { loginSchema, LoginPayload } from '#ro/modules/auth/validators/login.validator';
import { authMiddleware } from '#ro/common/middlewares/auth.middleware';
import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';
import { RegisterSchema, RegisterPayload } from '../validators/register.validator';
import { registerController } from '../controllers/register.controller';
import { ActivationTokenPayload, activationTokenSchema } from '../validators/activate.validator';
import { activateController } from '#ro/modules/auth/controllers/activate.controller'

const router = express.Router();

// Logowanie
router.post('/login', 
    csrfMiddleware, 
    validateRequest<LoginPayload>(loginSchema), 
    loginController
);

// Wylogowanie
router.post('/logout', authMiddleware, logoutController);

// router.post('/check-email', authMiddleware, checkEmailAvailabilityController);

// Status


// Rejestracja
router.post('/register', 
    csrfMiddleware, 
    validateRequest<RegisterPayload>(RegisterSchema), 
    registerController);

router.post('/activate', 
    csrfMiddleware,
    validateRequest<ActivationTokenPayload>(activationTokenSchema), 
    activateController);

// Odświeżanie tokena
// router.post('/refresh-token', require('../endpoints/auth/refreshToken.js'));

// Obsługuje inne niezdefiniowane trasy (404)
// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
