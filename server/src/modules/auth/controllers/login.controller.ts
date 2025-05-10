import { Request, Response } from 'express';
import { promisify } from 'util';
import authService from '#ro/modules/auth/services/auth.service';
import { generateJwtToken } from '#ro/common/utils/jwtToken.utils';
import SystemLog from '#ro/common/utils/SystemLog';
import { LoginPayload } from '#ro/modules/auth/validators/login.validator';
import { setJwtCookie } from '#ro/common/utils/cookie.utils';
import AppError from '#ro/common/errors/AppError';
import { isIP } from 'is-ip';
import { getValidatedData } from '#ro/utils/request';
/**
 * Kontroler logowania użytkownika.
 * Waliduje dane, generuje tokeny i ustawia sesję oraz ciasteczka.
 */
export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = getValidatedData<LoginPayload>(req); 
  const ip = Array.isArray(req.headers['x-forwarded-for'])
  ? req.headers['x-forwarded-for'][0]
  : req.ip || 'unknown';  // Ustawienie 'unknown' jako wartość domyślną, jeśli IP jest niewłaściwe

// Jeśli IP jest nieprawidłowe, po prostu przypisz pusty string
const validIp = isIP(ip) ? ip : ''; 
  try {
    // Weryfikacja użytkownika
    const user = await authService.validateUser(email, password, validIp);
    const token = generateJwtToken({ id: user.id });
    // const tokenCSRF = generateCsrfToken();

    req.session.userId = user.id;
    req.session.role = user.role ?? 'user';
    req.session.points = user.points;
    req.session.username = user.username;
    req.session.hasDocumentsEnabled = user.documents !== null
    delete req.session.csrfToken; // Usuń csrfToken z sesji, jeśli istnieje

    const saveSession = promisify(req.session.save.bind(req.session));
    await saveSession();

    SystemLog.info('Session saved');

    setJwtCookie(res, token);
    // setCSRFCookie(res, tokenCSRF);

    const responsePayload = {
      user: {
        id: user.id,
        role: user.role,
        username: user.username,
        points: user.points,
        hasDocumentsEnabled: user.documents !== null,
      },
    };
    
    SystemLog.info(responsePayload); // do logowania
    res.status(200).json(responsePayload); // do odpowiedzi HTTP

  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500);
      appError.sendErrorResponse(res);
    }
  }
};