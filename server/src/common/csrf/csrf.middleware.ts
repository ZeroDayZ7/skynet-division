import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';

export const csrfMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientToken = req.headers['x-csrf-token'] as string;
    const sessionToken = req.session.csrfToken;

    console.log('[CSRF Middleware] X-CSRF-Token:', clientToken);
    console.log('[CSRF Middleware] Session CSRF:', sessionToken);

    if (!sessionToken || !clientToken) {
      throw new AppError('CSRF_MISSING_TOKEN', 403);
    }

    if (sessionToken !== clientToken) {
      throw new AppError('CSRF_TOKEN_INVALID', 403);
    }

    // (opcjonalnie) verifyCsrfToken(clientToken, sessionToken); // jeśli masz dodatkowe zasady

    SystemLog.info('[CSRF Middleware] Token CSRF zweryfikowany');
    next();
  } catch (error: any) {
    SystemLog.error('[CSRF Middleware] Błąd CSRF', {
      message: error.message,
      stack: error.stack,
      csrfHeader: req.headers['x-csrf-token'],
    });

    next(error); // przekazuje do globalnego error handlera
  }
};
