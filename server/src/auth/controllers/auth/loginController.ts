import { Request, Response, NextFunction } from 'express';
import authService from '#auth/services/auth.service';
import { TokenPayload, generateAuthToken } from '#auth/utils/token.utils';
import SystemLog from '#utils/SystemLog';
import { UserAttributes } from '#auth/types/UserAttributes';

// Typ dla wyniku walidacji użytkownika
interface ValidationResult {
  error: boolean;
  message?: string;
  user?: UserAttributes;
}

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  const userIp = Array.isArray(req.headers['x-forwarded-for'])
    ? req.headers['x-forwarded-for'][0]
    : req.ip || '';

  try {
    // 1. Walidacja danych wejściowych
    if (!email || !password) {
      SystemLog.warn('Login attempt with incomplete data', { email });
      res.status(400).json({
        isAuthenticated: false,
        message: 'Uzupełnij poprawnie dane',
      });
      return; // Kończymy funkcję bez zwracania Response
    }

    // 2. Weryfikacja użytkownika
    const validationResult = (await authService.validateUser(
      email,
      password,
      userIp
    )) as ValidationResult;

    if (validationResult.error || !validationResult.user) {
      SystemLog.warn('Invalid login attempt', {
        email,
        reason: validationResult.message || 'Nieprawidłowe dane logowania',
      });
      res.status(401).json({
        isAuthenticated: false,
        message: validationResult.message || 'Nieprawidłowy email lub hasło',
      });
      return;
    }

    const user = validationResult.user;

    // 3. Generowanie tokena JWT
    const tokenPayload: TokenPayload = { id: user.id };
    const token = generateAuthToken(tokenPayload);

    // 4. Zapisywanie sesji (opcjonalne)
    req.session.userId = user.id ?? undefined;
    req.session.role = user.role ?? undefined;
    req.session.points = user.points ?? undefined;


      req.session.save((err) => {
        if (err) {
          SystemLog.error('Session save error', {
            userId: user.id,
            error: err.message,
          });
      }});
 

    // 5. Ustawienie bezpiecznego ciasteczka
    res.cookie(process.env.ACCESS_COOKIE_NAME as string, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: parseInt(process.env.JWT_EXPIRES_IN_MS || '900000', 10),
      sameSite: 'strict',
    });

    SystemLog.info('LOGIN CONTROLLER TS: ', {
      userId: user.id,
      role: user.role,
      ip: userIp,
    });

    // 6. Zwrócenie odpowiedzi
    res.status(200).json({
      isAuthenticated: true,
      user: {
        id: user.id,
        role: user.role,
        points: user.points,
      },
      token,
    });
  } catch (error: any) {
    SystemLog.error('Login process failed', {
      email,
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      isAuthenticated: false,
      message: 'Wystąpił błąd serwera',
    });
  }
};