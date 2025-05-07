import express from 'express';

import { loginController } from '#ro/modules/auth/controllers/login.controller';
import { logoutController } from '#ro/modules/auth/controllers/logout.controller';
import { registerController } from '../controllers/register.controller';
import { activateController } from '#ro/modules/auth/controllers/activate.controller';
import { resendActivationController } from '../controllers/resend-activation.controller';

import { validateRequest } from '#ro/common/middlewares/validate.middleware';

import { authMiddleware } from '#ro/common/middlewares/auth.middleware';
import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';

import { loginSchema, LoginPayload } from '#ro/modules/auth/validators/login.validator';
import { RegisterSchema, RegisterPayload } from '../validators/register.validator';
import { ActivationTokenPayload, ActivationTokenSchema } from '../validators/activate.validator';
import { ResendPayload, ResendActivateToken,  } from '../validators/resendActivateToken';

const router = express.Router();


// router.post('/login', csrfMiddleware, (req, res) => {
//     console.log('Login endpoint hit');
//     res.send('Login route accessed');
// });
// Logowanie
router.post('/login', 
    csrfMiddleware, 
    validateRequest<LoginPayload>(loginSchema), 
    loginController
);

// // Wylogowanie
router.post('/logout', 
    logoutController
);

// Rejestracja
router.post('/register', 
    csrfMiddleware, 
    validateRequest<RegisterPayload>(RegisterSchema), 
    registerController
);

// // Activate
router.post('/activate', 
    csrfMiddleware,
    validateRequest<ActivationTokenPayload>(ActivationTokenSchema), 
    activateController
);

// // Endpoint do ponownego wysyłania kodu aktywacyjnego
router.post('/resend-activation', 
    csrfMiddleware,
    validateRequest<ResendPayload>(ResendActivateToken), 
    resendActivationController
);

export default router;
