import express from 'express';

import { searchUsersController } from '#ro/modules/admin/controller/searchUser.controller';
import { blockUserController } from '#ro/modules/admin/controller/blockUser.controller';
import { deleteUserController } from '#ro/modules/admin/controller/deleteUser.controller';

import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';

const router = express.Router();

// Elektroniczny dowód
router.get('/search', searchUsersController);

// Blokowanie użytkownika
router.patch('/:id/block', blockUserController);

// Usuwanie użytkownika
router.delete('/:id', deleteUserController);

// // Obsługuje inne niezdefiniowane trasy (404)
// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
