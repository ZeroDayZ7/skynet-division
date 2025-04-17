import { Request, Response, NextFunction } from 'express';
import { generateCsrfToken } from '#ro/common/csrf/csrf.utils';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#ro/common/errors/AppError';
import { promisify } from 'util';

export const getCsrfToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    SystemLog.warn(`[CSRF CONTROLLER] TOKEN: ${req.session.csrfToken}`);
    if (!req.session) {
      throw new AppError('SESSION_NOT_INITIALIZED', 500);
    }
    SystemLog.warn(`[CSRF CONTROLLER] SESSION ID: ${req.session.id}`);
    const token = generateCsrfToken();
    req.session.csrfToken = token;
    // const saveSession = promisify(req.session.save.bind(req.session));
    // await saveSession();

    SystemLog.info('[CSRF CONTROLLER] Wygenerowano i zapisano token CSRF:');
    SystemLog.warn(`[CSRF CONTROLLER] TOKEN: ${token}`);
    SystemLog.warn(`[CSRF CONTROLLER] SESSION TOKEN: ${req.session.csrfToken}`);
    SystemLog.warn(`[CSRF CONTROLLER] SESSION ID: ${req.session.id}`);
    res.json({ csrfToken: token });
  } catch (error: any) {
    SystemLog.error('[CSRF CONTROLLER] Błąd podczas wysyłania tokena CSRF', {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};