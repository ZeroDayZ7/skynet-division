import { Request, Response } from 'express';
import { promisify } from 'util';
import authService from '#ro/modules/auth/services/login.service';
import { generateJwtToken } from '#ro/common/utils/jwtToken.utils';
import SystemLog from '#ro/common/utils/SystemLog';
import { generateCsrfToken } from '#ro/common/csrf/csrf.utils';
import { LoginInput } from '#ro/modules/auth/validators/login.validators';
import { setJwtCookie, setCSRFCookie } from '#ro/common/utils/cookie.utils';
import { getUnreadNotificationsCount } from '#ro/modules/auth/controllers/users/getUnreadNotificationsCount';
import AppError from '#ro/common/errors/AppError';
/**
 * Kontroler logowania użytkownika.
 * Waliduje dane, generuje tokeny i ustawia sesję oraz ciasteczka.
 */
export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.validatedData as LoginInput; // Popraw typowanie poniżej
  const userIp = Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : req.ip || 'unknown';

  try {
    // Weryfikacja użytkownika
    const validationResult = await authService.validateUser(email, password, userIp);
    if (validationResult.error) {
      throw new AppError('INVALID_REQUEST', 400);
    }

    const user = validationResult.user;
    const token = generateJwtToken({ id: user.id });
    const tokenCSRF = generateCsrfToken();

    const unread = await getUnreadNotificationsCount(user.id);
    req.session.userId = user.id;
    req.session.csrfToken = tokenCSRF;
    req.session.points = user.points ?? 0;
    req.session.role = user.role ?? 'user';
    req.session.notifications = unread;

    const saveSession = promisify(req.session.save.bind(req.session));
    await saveSession();

    SystemLog.info('Session saved');

    setJwtCookie(res, token);
    setCSRFCookie(res, tokenCSRF);

    res.status(200).json({
      isAuthenticated: true,
      user: {
        role: user.role,
        points: user.points,
        notifications: unread,
      },
      tokenCSRF,
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