// controllers/users/settings/security/pin/setPinController.ts
import { Request, Response } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';
import { setUserPin } from '#ro/modules/settings/services/pin.service';
import { verifyUserPassword, hashValue } from '#ro/common/utils/auth.utils';
import { getValidatedData } from '#ro/utils/request';
import { PinPayload } from '../../validators/pin.validation';

export const setPinController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pin, confirmPin, password } = getValidatedData<PinPayload>(req);
    SystemLog.warn(`pin/confirmPin/password: ${pin} / ${confirmPin} / ${password}`);
    const userId = req.session.userId || req.user?.id;
    if (!userId) {
      throw new AppError('UNAUTHORIZED', 401);
    }
    SystemLog.warn(`req.body: ${JSON.stringify(req.body, null, 2)}`);

    // Sprawdzenie hasła użytkownika
    const passwordCorrect = await verifyUserPassword(userId, password);
    if (!passwordCorrect) {
      throw new AppError('INVALID_PASSWORD', 401, true, 'Nieprawidłowe hasło');
    }

    // Hashowanie PIN-u
    const hashedPin = await hashValue(pin); // Użyj hashPassword zamiast bcrypt.hash

    // Zapisanie PIN-u
    await setUserPin(userId, hashedPin);

    SystemLog.info(`PIN ustawiony dla użytkownika ID: ${userId}`);
    res.status(200).json({ 
        success: true, 
        message: 'PIN został ustawiony poprawnie.'
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500);
      appError.sendErrorResponse(res);
    }
  }
};