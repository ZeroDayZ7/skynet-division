import express from 'express';

import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';
import { authMiddleware } from '../../../common/middlewares/auth.middleware';
import { validateRequest } from '#ro/middlewares/validate.middleware';
import { pinSchema, PinPayload } from '../validators/pin.validation';

import { checkPinController } from '#ro/modules/user/controller/checkPinController';
import { setPinController } from '#ro/modules/user/controller/setPinController';

import { getUserEIDData } from '../controller/usersData/userEIDController';
import { getUserPassportData } from '../controller/usersData/userPassportController';

import { unreadNotificationController } from '../controller/notification/unread.controller';
import { readNotificationController } from '../controller/notification/read.controller';
import { markNotificationsAsRead } from '../controller/notification/notificationsAsRead.controller';

import { getUserPermissionstToLoginController } from '#ro/modules/user/controller/getUserPermissions.controller';
import { notificationQuerySchema } from '../validators/notificationQuery.schema';
import { countNotificationsController } from '../controller/notification/count.controller';
import { meUserController } from '../controller/me/me.controller';


const router = express.Router();

// Elektroniczny dowód
router.post('/user-eid', csrfMiddleware, authMiddleware, getUserEIDData);
router.post('/user-passport', csrfMiddleware, authMiddleware, getUserPassportData);

router.get('/pin-status', authMiddleware, checkPinController);
router.post('/set-pin', validateRequest<PinPayload>(pinSchema), authMiddleware, setPinController);

// pobieranie powidomień usera
router.get('/notifications/unread', 
    authMiddleware, 
    validateRequest(notificationQuerySchema, 'query'),
    unreadNotificationController
);

router.get('/notifications/read', 
    authMiddleware, 
    validateRequest(notificationQuerySchema, 'query'),
    readNotificationController
);

router.get('/notifications/count', 
    // authMiddleware, 
    meUserController
);

router.patch('/notifications/read', 
    authMiddleware, 
    markNotificationsAsRead
);

router.get('/permissions', 
    // csrfMiddleware, 
    authMiddleware, 
    getUserPermissionstToLoginController);


// // Obsługuje inne niezdefiniowane trasy (404)
// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
