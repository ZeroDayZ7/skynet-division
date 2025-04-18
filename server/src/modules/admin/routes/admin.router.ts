import express from 'express';

import { searchUsersController } from '#ro/modules/admin/controller/searchUser.controller';
import { blockUserController } from '#ro/modules/admin/controller/blockUser.controller';
import { deleteUserController } from '#ro/modules/admin/controller/deleteUser.controller';
import { getUserByIdController } from '#ro/modules/admin/controller/getUserById.controller';
import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';

const router = express.Router();

router.get('/search', searchUsersController);
router.get('/users/:id', getUserByIdController); // Nowa trasa
router.patch('/users/:id/block', blockUserController);
router.delete('/users/:id', deleteUserController);

// // Obsługuje inne niezdefiniowane trasy (404)
// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
