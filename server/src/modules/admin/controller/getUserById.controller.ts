// src/modules/user/controllers/getUserByIdController.ts
import { Request, Response } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';
import { getUserById } from '../services/user.service';

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    SystemLog.warn(`[getUserByIdController.ts] User ID: ${req.session.userId}`);
    const isAdmin = req.session.role;
    const userId = req.session.userId || req.user?.id;
    if (!userId || !isAdmin || isAdmin !== 'admin') {
      SystemLog.error(`[getUserByIdController.ts] Unauthorized access attempt by userId: ${userId}`);
      throw new AppError('UNAUTHORIZED', 401);
    }

    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      throw new AppError('INVALID_USER_ID', 400);
    }

    const user = await getUserById(parseInt(id));
    SystemLog.info(`[getUserByIdController.ts] Retrieved user: id=${id}`);
    res.status(200).json(user);
  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500);
      appError.sendErrorResponse(res);
    }
  }
};