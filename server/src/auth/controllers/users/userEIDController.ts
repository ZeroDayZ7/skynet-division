import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/utils/SystemLog.js';
import { fetchUserEIDData } from '#ro/auth/services/user.data.service';
import { HTTP_STATUS } from '#ro/auth/config/httpStatus';

export const getUserEIDData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.session.userId;

  if (!userId) {
    SystemLog.warn(`Brak autoryzacji w kontrolerze getUserEIDData: ${userId}`,);
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Brak autoryzacji',
    });
    return;
  }

  try {
    const userEIDData = await fetchUserEIDData(userId);

    if (!userEIDData) {
      SystemLog.info(`Dane e-dowodu nie znalezione dla użytkownika: ${userId}`);
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Dane nie znalezione',
      });
      return;
    }

    SystemLog.info('Pobrano dane e-dowodu');
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: userEIDData,
    });
  } catch (error: any) {
    SystemLog.error('Błąd pobierania danych e-dowodu w kontrolerze', {
      userId,
      error: error.message,
      stack: error.stack,
    });
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Wystąpił błąd serwera',
    });
  }
};
