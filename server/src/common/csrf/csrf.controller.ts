import { Request, Response, NextFunction } from 'express';
import { generateCsrfToken } from '#ro/common/csrf/csrf.utils';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#ro/common/errors/AppError';

export const getCsrfToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session) {
      throw new AppError('SESSION_NOT_INITIALIZED', 500);
    }

    const token = generateCsrfToken();
    req.session.csrfToken = token;

    SystemLog.info('[CSRF Token] Wygenerowano i zapisano token CSRF:', token);

    res.json({ csrfToken: token });
  } catch (error: any) {
    SystemLog.error('[CSRF Token] Błąd podczas wysyłania tokena CSRF', {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};