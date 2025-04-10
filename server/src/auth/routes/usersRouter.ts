import express from 'express';

import { getUserEIDData } from '#auth/controllers/users/userEIDController'
// import { getUserNotifications } from '#controllers/users/userNotifications.js';
// import { getUnreadNotificationsCount } from '#controllers/users/getUnreadNotificationsCount.js';
// import { getUserPassportData } from '#controllers/users/userPassportController.js';

const router = express.Router();

// Elektroniczny dowód
router.post('/user-eid', getUserEIDData);
// router.post('/user-passport', getUserPassportData);

// router.post('/notifications', getUserNotifications);
// router.get('/notifications/unread-count', getUnreadNotificationsCount);


// // Obsługuje inne niezdefiniowane trasy (404)
// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
