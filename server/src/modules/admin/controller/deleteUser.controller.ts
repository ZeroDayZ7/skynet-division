// src/modules/user/controllers/deleteUserController.ts
import { Request, Response } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';
import { deleteUser } from '../services/delete.service';

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    SystemLog.warn(`[deleteUserController.ts] User ID: ${req.session.userId}`);
    const isAdmin = req.session.role;
    const userId = req.session.userId || req.user?.id;
    if (!userId || !isAdmin || isAdmin !== 'admin') {
      SystemLog.error(`[deleteUserController.ts] Unauthorized access attempt by userId: ${userId}`);
      throw new AppError('UNAUTHORIZED', 401);
    }

    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      throw new AppError('INVALID_USER_ID', 400);
    }

    await deleteUser(parseInt(id));
    SystemLog.info(`[deleteUserController.ts] User deleted: id=${id}`);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, message: 'Użytkownik został usunięty' });
  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500);
      appError.sendErrorResponse(res);
    }
  }
};