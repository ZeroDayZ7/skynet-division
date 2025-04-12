import express from 'express';

import { getUserEIDData } from '#ro/auth/controllers/users/userEIDController'
// import { getUserNotifications } from '#ro/controllers/users/userNotifications.js';
// import { getUnreadNotificationsCount } from '#ro/controllers/users/getUnreadNotificationsCount.js';
import { getUserPassportData } from '#ro/auth/controllers/users/userPassportController';
import { authMiddleware } from '#ro/auth/middleware/auth.middleware';

const router = express.Router();

// Elektroniczny dowód
router.post('/user-eid', authMiddleware, getUserEIDData);
router.post('/user-passport', authMiddleware, getUserPassportData);

// router.post('/notifications', getUserNotifications);
// router.get('/notifications/unread-count', getUnreadNotificationsCount);


// // Obsługuje inne niezdefiniowane trasy (404)
// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
