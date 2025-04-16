import express from 'express';

import { authMiddleware } from '../../../common/middlewares/auth.middleware';
import { validateRequest } from '#ro/middlewares/validate.middleware';
import { pinSchema, PinPayload } from '../validators/pin.validation';

import { checkPinController } from '#ro/modules/user/controller/checkPinController';
import { setPinController } from '#ro/modules/user/controller/setPinController';

import { getUserEIDData } from '../controller/usersData/userEIDController';
import { getUserPassportData } from '../controller/usersData/userPassportController';

const router = express.Router();

// Elektroniczny dowód
router.post('/user-eid', authMiddleware, getUserEIDData);
router.post('/user-passport', authMiddleware, getUserPassportData);

router.get('/pin-status', authMiddleware, checkPinController);
router.post('/set-pin', validateRequest<PinPayload>(pinSchema), authMiddleware, setPinController);

// router.post('/notifications', getUserNotifications);
// router.get('/notifications/unread-count', getUnreadNotificationsCount);


// // Obsługuje inne niezdefiniowane trasy (404)
// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
