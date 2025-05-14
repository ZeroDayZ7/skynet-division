import express from 'express';

import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';
import { authMiddleware } from '../../../common/middlewares/auth.middleware';
import { validateRequest } from '#ro/common/middlewares/validate.middleware';

import { getUserEIDData } from '../controller/usersData/userEIDController';
import { getUserPassportData } from '../controller/usersData/userPassportController';

import { unreadNotificationController } from '../controller/notification/unread.controller';
import { readNotificationController } from '../controller/notification/read.controller';
import { markNotificationsAsRead } from '../controller/notification/notificationsAsRead.controller';

import { getUserPermissionstToLoginController } from '#ro/modules/user/controller/getUserPermissions.controller';
import { notificationQuerySchema } from '../validators/notificationQuery.schema';
// import { countNotificationsController } from '../controller/notification/count.controller';
import { meUserController } from '../controller/me/me.controller';


const router = express.Router();

// Elektroniczny dowód
router.post('/user-eid', csrfMiddleware, authMiddleware, getUserEIDData);
router.post('/user-passport', csrfMiddleware, authMiddleware, getUserPassportData);

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

export default router;
