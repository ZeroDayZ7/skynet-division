import { Request, Response } from 'express';
import { createUser } from '#ro/modules/auth/services/register.service';
import AppError from '#ro/common/errors/AppError';
import { getValidatedData } from '#ro/utils/request';
import { RegisterPayload } from '#ro/modules/auth/validators/register.validator';
import SystemLog from '#ro/common/utils/SystemLog';

/**
 * Kontroler rejestracji użytkownika.
 */
export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = getValidatedData<RegisterPayload>(req);
    SystemLog.warn(`email: ${email}, password: ${password}`);

    await createUser(email, password);

        // ZAPISUJEMY EMAIL DO SESJI
    req.session.email = email;
    await new Promise((resolve, reject) => req.session.save(err => (err ? reject(err) : resolve(null))));
    

    res.status(201).json({
      success: true,
      message: 'Użytkownik został pomyślnie utworzony.',
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
