import express from 'express';

import { loginController } from '#ro/modules/auth/controllers/login.controller';
import { logoutController } from '#ro/modules/auth/controllers/logout.controller';
import { registerController } from '../controllers/register.controller';
import { activateController } from '#ro/modules/auth/controllers/activate.controller';
import { resendActivationController } from '../controllers/resend-activation.controller';

import { validateRequest } from '#ro/common/middlewares/validateRequest';

import { authMiddleware } from '#ro/common/middlewares/auth.middleware';
import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';

import { loginSchema, LoginPayload } from '#ro/modules/auth/validators/login.validator';
import { RegisterSchema, RegisterPayload } from '../validators/register.validator';
import { ActivationTokenPayload, ActivationTokenSchema } from '../validators/activate.validator';
import { ResendPayload, ResendActivateToken,  } from '../validators/resendActivateToken';

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
    validateRequest<ActivationTokenPayload>(ActivationTokenSchema), 
    activateController);

// Endpoint do ponownego wysyłania kodu aktywacyjnego
router.post('/resend-activation', 
    csrfMiddleware,
    validateRequest<ResendPayload>(ResendActivateToken), 
    resendActivationController
);

// Odświeżanie tokena
// router.post('/refresh-token', require('../endpoints/auth/refreshToken.js'));

// Obsługuje inne niezdefiniowane trasy (404)
// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
