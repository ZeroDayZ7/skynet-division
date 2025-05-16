import { Request, Response } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';
import { setTwoFactorEnabled } from '../../services/twoFactor.service';

/**
 * Kontroler sprawdzający, czy użytkownik ma ustawiony PIN.
 * Zwraca informację, czy PIN jest ustawiony (nie jest null).
 */
export const changeTwoFactorStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // Zakładam, że użytkownik jest uwierzytelniony i mamy jego ID w sesji lub tokenie
    // SystemLog.debug(`${JSON.stringify(req, null, 2)}`);
    const userId = req.session.userId || req.user?.id;
    const { enabled } = req.body;
    
    if (typeof enabled !== 'boolean') {
      throw new AppError('INVALID_INPUT', 400);
    }
    SystemLog.warn(`enabled: ${enabled}`);
    if (!userId) {
      throw new AppError('UNAUTHORIZED', 401);
    }

    // Sprawdzanie statusu PIN-u
    await setTwoFactorEnabled(userId, enabled);
    // const result = await setTwoFactorEnabled(userId, enabled);

    // res.status(200).json(result);

     res.json({ success: true });

  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500);
      appError.sendErrorResponse(res);
    }
  }
};