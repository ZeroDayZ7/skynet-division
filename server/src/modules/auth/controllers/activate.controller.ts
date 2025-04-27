import { Request, Response } from 'express';
import { activateUser } from '#ro/modules/auth/services/activation.service';
import AppError from '#ro/common/errors/AppError';

export const activateController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { activationToken } = req.body; // token aktywacyjny jest przekazywany w body
    await activateUser(activationToken); // wywołanie logiki aktywacji
    
    res.status(200).json({
      success: true,
      message: 'Użytkownik został pomyślnie aktywowany.',
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
