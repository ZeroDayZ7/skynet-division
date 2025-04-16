import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/common/utils/SystemLog.js';
import AppError from '#errors/AppError';
import { ErrorType } from '#errors/AppError';
import { fetchUserEIDData } from '#ro/modules/auth/services/user.data.service';

export const getUserEIDData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      throw new AppError('UNAUTHORIZED', 401, true, 'Brak autoryzacji', ErrorType.UNAUTHORIZED);
    }

    const userEIDData = await fetchUserEIDData(userId);

    if (!userEIDData) {
      throw new AppError('NOT_FOUND', 404, true, 'Dane e-dowodu nie znalezione', ErrorType.NOT_FOUND);
    }

    SystemLog.info('Pobrano dane e-dowodu');
    res.status(200).json({
      success: true,
      data: userEIDData,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500, true, error.message);
      appError.sendErrorResponse(res);
    }
  }
};
