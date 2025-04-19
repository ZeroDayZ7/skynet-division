import express from 'express';

import { csrfMiddleware } from '#ro/common/csrf/csrf.middleware';
import { authMiddleware } from '#ro/common/middlewares/auth.middleware';
import { searchUsersController } from '#ro/modules/admin/controller/searchUser.controller';
import { blockUserController } from '#ro/modules/admin/controller/blockUser.controller';
import { deleteUserController } from '#ro/modules/admin/controller/deleteUser.controller';
import { getUserByIdController } from '#ro/modules/admin/controller/getUserById.controller';
import { unblockUserController } from '../controller/unblockUser.controller';



const router = express.Router();

router.get('/search', searchUsersController);
router.get('/users/:id', getUserByIdController); // Nowa trasa
router.patch('/users/:id/block', 
    csrfMiddleware, 
    authMiddleware, 
    blockUserController
);
router.patch('/users/:id/unblock', unblockUserController);
router.delete('/users/:id', deleteUserController);

// // Obsługuje inne niezdefiniowane trasy (404)
// router.use((req, res) => {
//   res.status(404).json({ error: 'Not Found' });
// });

export default router; // Zmiana na ESM
