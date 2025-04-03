import express from 'express';

import { getUserEIDData } from '#controllers/users/userEIDController.js'

const router = express.Router();

// Logowanie
router.post('/user-eid', getUserEIDData);


// Obsługuje inne niezdefiniowane trasy (404)
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export default router; // Zmiana na ESM
