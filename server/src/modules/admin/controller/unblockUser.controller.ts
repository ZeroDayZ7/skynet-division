// src/modules/user/controllers/unblockUserController.ts
import { Request, Response } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';
import { unblockUser } from '../services/block.service';

export const unblockUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    SystemLog.warn(`[unblockUserController.ts] User ID: ${req.session.userId}`);
    const isAdmin = req.session.role;
    const userId = req.session.userId || req.user?.id;
    if (!userId || !isAdmin || isAdmin !== 'admin') {
      SystemLog.error(`[unblockUserController.ts] Unauthorized access attempt by userId: ${userId}`);
      throw new AppError('UNAUTHORIZED', 401);
    }

    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      throw new AppError('INVALID_USER_ID', 400);
    }

    await unblockUser(parseInt(id));
    SystemLog.info(`[unblockUserController.ts] User unblocked: id=${id}`);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: false, message: 'Użytkownik został odblokowany' });
  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500);
      appError.sendErrorResponse(res);
    }
  }
};