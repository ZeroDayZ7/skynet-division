import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError, { ErrorType } from '#ro/common/errors/AppError';
import { decodeJwtToken } from '#ro/common/utils/jwtToken.utils';

const getJwtToken = (req: Request): string => {
  // const authHeader = (req.headers.authorization || req.headers.Authorization) as string | undefined;
  // if (authHeader?.startsWith('Bearer ')) {
  //   return authHeader.split(' ')[1];
  // }
  if (req.cookies?.[process.env.JWT_COOKIE_NAME || 'accessToken']) {
    return req.cookies[process.env.JWT_COOKIE_NAME || 'accessToken'];
  }
  throw new AppError('AUTH_TOKEN_MISSING', 401, true, undefined, ErrorType.UNAUTHORIZED);
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // 1. Sprawdzenie sesji
  if (!req.session || !req.session.userId) {
    SystemLog.warn('[authMiddleware] Próba autoryzacji bez aktywnej sesji');
    throw new AppError('AUTHENTICATION_FAILED', 401, true, 'Błąd autoryzacji');
  }

  const sessionUserId = req.session.userId;

  // 3. Pobranie i dekodowanie JWT
  let jwtToken: string;
  let decoded: { sub: { id: number } };
  try {
    jwtToken = getJwtToken(req);
    decoded = decodeJwtToken(jwtToken);
  } catch (error) {
    throw error instanceof AppError ? error : new AppError('AUTH_TOKEN_INVALID', 401, true);
  }

  // 4. Porównanie userId
  if (decoded.sub.id !== sessionUserId) {
    SystemLog.warn('[authMiddleware] Niezgodność userId między JWT a sesją');
    throw new AppError('AUTH_TOKEN_INVALID', 401, true);
  }

  req.user = { id: Number(decoded.sub.id) };
  SystemLog.info('[authMiddleware] Użytkownik pomyślnie zweryfikowany');
  next();
};