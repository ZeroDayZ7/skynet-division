import { Request, Response } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';
import { checkPinStatus } from '#ro/modules/settings/services/pin.service';

/**
 * Kontroler sprawdzający, czy użytkownik ma ustawiony PIN.
 * Zwraca informację, czy PIN jest ustawiony (nie jest null).
 */
export const getTwoFactorStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // Zakładam, że użytkownik jest uwierzytelniony i mamy jego ID w sesji lub tokenie
    // SystemLog.debug(`${JSON.stringify(req, null, 2)}`);
    const userId = req.session.userId || req.user?.id;
    if (!userId) {
      throw new AppError('UNAUTHORIZED', 401);
    }

    // Sprawdzanie statusu PIN-u
    const result = await checkPinStatus(userId);

    res.status(200).json(result);

  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500);
      appError.sendErrorResponse(res);
    }
  }
};