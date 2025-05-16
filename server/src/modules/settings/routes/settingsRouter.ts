import express from 'express';

// import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';
import { authMiddleware } from '../../../common/middlewares/auth.middleware';
import { validateRequest } from '#ro/common/middlewares/validate.middleware';
import { pinSchema, PinPayload } from '../validators/pin.validation';

import { getTwoFactorStatus } from '#ro/modules/settings/controller/pin/getTwoFactorStatus';
import { setPinController } from '#ro/modules/settings/controller/pin/setPinController';
import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';
import { changeTwoFactorStatus } from '../controller/pin/changeTwoFactorStatus';

const router = express.Router();

// Elektroniczny dowód

router.get('/two-factor', authMiddleware, getTwoFactorStatus);
router.post('/two-factor', authMiddleware, changeTwoFactorStatus);
router.post(
  '/set-pin',
  csrfMiddleware,
  authMiddleware,
  validateRequest<PinPayload>(pinSchema),
  setPinController,
);

export default router;
