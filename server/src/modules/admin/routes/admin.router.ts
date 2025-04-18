import express from 'express';

import { searchUsersController } from '#ro/modules/admin/controller/searchUser.controller';
import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';

const router = express.Router();

// Elektroniczny dowód
router.get('/search', searchUsersController);
// router.get('/:id', getUserById);
// router.put('/:id', updateUser);
// router.post('/:id/block', blockUser);
// router.delete('/:id', deleteUser);


// // Obsługuje inne niezdefiniowane trasy (404)
// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
