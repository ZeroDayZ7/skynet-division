import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';

export const csrfMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Odczyt nagłówka z większą precyzją
    const clientToken = req.headers['x-csrf-token']?.toString() || '';
    const sessionToken = req.session.csrfToken || '';
    // SystemLog.warn(`[CSRF Middleware] Session ID: ${req.session.id}`);

    // SystemLog.warn('[CSRF Middleware] Request Headers:', req.headers);
    // SystemLog.debug(`[CSRF Middleware] X-CSRF-Token: ${clientToken}`);
    // SystemLog.debug(`[CSRF Middleware] Session CSRF Token: ${sessionToken}`);

    if (!clientToken || !sessionToken) {
      throw new AppError('CSRF_MISSING_TOKEN', 403, true, 'Brak tokenu CSRF w nagłówkach żądania lub sesji. Odśwież stronę, lub spróbuj później.');
    }

    if (clientToken !== sessionToken) {
      throw new AppError('CSRF_TOKEN_INVALID', 403, true, 'CSRF token is invalid.');
    }

    SystemLog.info('[CSRF Middleware] Token CSRF zweryfikowany');
    next();
  } catch (error: any) {
    SystemLog.error('[CSRF Middleware] Błąd CSRF', {
      message: error.message,
      stack: error.stack,
      csrfHeader: req.headers['x-csrf-token'],
      sessionToken: req.session?.csrfToken,
    });

    next(error);
  }
};