import { Request, Response } from 'express';
import { promisify } from 'util';
import SystemLog from '#ro/common/utils/SystemLog';
import { clearAuthCookie, clearCSRFCookie } from '#ro/common/utils/cookie.utils';
import AppError from '#errors/AppError';

/**
 * Kontroler wylogowania użytkownika.
 * Weryfikuje sesję, niszczy ją i czyści ciasteczka po weryfikacji tokenów przez middleware.
 */
export const logoutController = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session?.userId || 'unknown';
  SystemLog.debug(`Próba wylogowania użytkownika ID: ${userId}`);

  if (!req.session || !req.session.userId) {
    SystemLog.warn('Próba wylogowania bez aktywnej sesji', { ip: req.ip });
    throw new AppError('AUTHENTICATION_FAILED', 400);
  }

  const destroySession = promisify(req.session.destroy.bind(req.session));
  await destroySession();
  SystemLog.info(`Sesja użytkownika ID: ${userId} została zniszczona`);

  clearAuthCookie(res);
  clearCSRFCookie(res);

  res.status(200).json({
    isAuthenticated: false
  });
};