import jwt from 'jsonwebtoken';
import { jwtConfig } from '#ro/config/jwt.config';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';

export interface TokenPayload {
  sub: { id: number };
  iat?: number;
  exp?: number;
  iss?: string;
}

export const generateJwtToken = (user: { id: number }): string => {
  const tokenPayload: TokenPayload = {
    sub: { id: user.id },
  };

  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: jwtConfig.expiresIn as jwt.SignOptions['expiresIn'],
    issuer: jwtConfig.issuer,
  };

  return jwt.sign(tokenPayload, jwtConfig.secret, options);
};

export const decodeJwtToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as unknown;
    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'sub' in decoded &&
      typeof decoded.sub === 'object' &&
      decoded.sub !== null &&
      'id' in decoded.sub &&
      typeof (decoded.sub as any).id === 'number'
    ) {
      return decoded as TokenPayload;
    }
    SystemLog.warn('Nieprawidłowa struktura tokena JWT', { token: token.slice(0, 10) + '...' });
    throw new AppError('AUTH_TOKEN_INVALID', 401, true);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      SystemLog.warn('Token JWT wygasł', { token: token.slice(0, 10) + '...' });
      throw new AppError('AUTH_TOKEN_EXPIRED', 401, true);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      SystemLog.warn('Nieprawidłowy token JWT', { token: token.slice(0, 10) + '...' });
      throw new AppError('AUTH_TOKEN_INVALID', 401, true);
    }
    SystemLog.error('Błąd dekodowania tokena JWT', { error: (error as Error).message });
    throw new AppError('AUTHENTICATION_FAILED', 500, true);
  }
};