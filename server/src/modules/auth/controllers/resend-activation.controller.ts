import { Request, Response } from 'express';
import { resendActivationToken } from '#ro/modules/auth/services/resend-activation.service';
import AppError from '#ro/common/errors/AppError';

export const resendActivationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body; // email użytkownika przekazany w ciele żądania
    const emailSession = req.session.email;

    if (!email) {
      throw new AppError('EMAIL_REQUIRED', 400, false, 'Proszę podać adres e-mail.');
    }

    if(email !== emailSession){
      throw new AppError('EMAIL_REQUIRED', 400, false, 'E-mail nie zgadza się z sesją.');
    }

    await resendActivationToken(email); // Wywołanie logiki ponownego generowania tokena

    res.status(200).json({
      success: true,
      message: 'Nowy token aktywacyjny został wygenerowany i zapisany.',
    });
  } catch (error) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500);
      appError.sendErrorResponse(res);
    }
  }
};
