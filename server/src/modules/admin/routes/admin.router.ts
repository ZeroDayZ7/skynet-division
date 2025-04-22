// routes/adminRoutes.ts

import express from 'express';
import { searchUsersController } from '#ro/modules/admin/controller/searchUser.controller';
import { blockUserController } from '#ro/modules/admin/controller/blockUser.controller';
import { deleteUserController } from '#ro/modules/admin/controller/deleteUser.controller';
import { getUserByIdController } from '#ro/modules/admin/controller/getUserById.controller';
import { unblockUserController } from '../controller/unblockUser.controller';
import { getUserPermissionsAdminController } from '#ro/modules/admin/controller/getUserPermissions.controller';
import { editUserPermissionsController } from '#ro/modules/admin/controller/editUserPermissions.controller';

const router = express.Router();

router.post('/search', searchUsersController);
router.get('/users/:id', getUserByIdController);
router.patch('/users/:id/block', blockUserController);
router.patch('/users/:id/unblock', unblockUserController);
router.delete('/users/:id', deleteUserController);

router.post('/users/:id/permissions', getUserPermissionsAdminController);
router.put('/users/:id/permissions', editUserPermissionsController);

router.post('/permissions', getUserPermissionsAdminController);

export default router;
