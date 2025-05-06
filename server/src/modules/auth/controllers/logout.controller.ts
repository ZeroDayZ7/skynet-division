import { Request, Response } from 'express';
import { promisify } from 'util';
import SystemLog from '#ro/common/utils/SystemLog';
import { clearAuthCookie } from '#ro/common/utils/cookie.utils';

/**
 * Kontroler wylogowania użytkownika.
 * Weryfikuje sesję, niszczy ją i czyści ciasteczka po weryfikacji tokenów przez middleware.
 */
export const logoutController = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session?.userId || 'unknown';
  SystemLog.debug(`Próba wylogowania użytkownika ID: ${userId}`);

  if (!req.session?.userId) {
    SystemLog.warn('Wylogowanie bez aktywnej sesji', { ip: req.ip });
    clearAuthCookie(res);
    res.status(200).json({ success: true });
    return;
  }

  try {
    const destroySession = promisify(req.session.destroy.bind(req.session));
    await destroySession();
    SystemLog.info(`Sesja użytkownika ID: ${userId} została zniszczona`);
    clearAuthCookie(res);
    res.status(200).json({ success: true });
  } catch (error) {
    SystemLog.error('Błąd podczas niszczenia sesji', { error, userId, ip: req.ip });
    res.status(500).json({ error: 'Wylogowanie nie powiodło się' });
  }
};