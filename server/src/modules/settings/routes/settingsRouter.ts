import express from 'express';

// import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';
import { authMiddleware } from '../../../common/middlewares/auth.middleware';
import { validateRequest } from '#ro/common/middlewares/validate.middleware';
import { pinSchema, PinPayload } from '../validators/pin.validation';

import { getTwoFactorStatus } from '#ro/modules/settings/controller/pin/getTwoFactorStatus';
import { setPinController } from '#ro/modules/settings/controller/pin/setPinController';


const router = express.Router();

// Elektroniczny dowód

router.get('/two-factor', authMiddleware, getTwoFactorStatus);
router.post('/set-pin', validateRequest<PinPayload>(pinSchema), authMiddleware, setPinController);

export default router;
