import express from 'express';

import { getUserEIDData } from '#controllers/users/userEIDController.js'
import { getUserNotifications } from '#controllers/users/userNotifications.js';
import { getUnreadNotificationsCount } from '#controllers/users/getUnreadNotificationsCount.js';

const router = express.Router();

// Logowanie
router.post('/user-eid', getUserEIDData);

router.post('/notifications', getUserNotifications);
router.get('/notifications/unread-count', getUnreadNotificationsCount);


// Obsługuje inne niezdefiniowane trasy (404)
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export default router; // Zmiana na ESM
