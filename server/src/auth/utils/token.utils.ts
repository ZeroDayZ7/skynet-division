import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '#auth/config/jwt.config';

// Interfejs dla payloadu tokena (tylko id)
export interface TokenPayload {
  sub: {
    id: number;
    // Możliwość dodania więcej pól w przyszłości
  };
  iat?: number;
  exp?: number;
  iss?: string;
}

// Funkcja do pobierania tokena z żądania
export const getJwtTokenFromRequest = (req: Request): string | null => {
  const authHeader = (req.headers.authorization ||
    req.headers.Authorization) as string | undefined;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  if (req.cookies?.[jwtConfig.cookieName]) {
    return req.cookies[jwtConfig.cookieName];
  }

  return null;
};

// Funkcja do pobierania tokenu CSRF z nagłówka
export const getCsrfTokenFromRequest = (req: Request): string | null => {
  // Sprawdzamy, czy nagłówek 'X-CSRF-Token' istnieje w żądaniu
  const csrfToken = req.headers['x-csrf-token'] as string | undefined;
  return csrfToken || null; // Jeśli istnieje, zwrócimy jego wartość, w przeciwnym razie null
};

// Funkcja do generowania tokena JWT
export const generateAuthToken = (user: { id: number }): string => {
  const tokenPayload: TokenPayload = {
    sub: { id: user.id }, // sub jako obiekt
  };

  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: jwtConfig.expiresIn as jwt.SignOptions['expiresIn'],
    issuer: jwtConfig.issuer,
  };

  return jwt.sign(tokenPayload, jwtConfig.secret, options);
};

// Funkcja do dekodowania tokena
export const decodeAuthToken = (token: string): TokenPayload => {
  // Weryfikacja tokena i rzutowanie na unknown, a potem na TokenPayload
  const decoded = jwt.verify(token, jwtConfig.secret) as unknown;

  // Sprawdzenie, czy decoded ma odpowiednią strukturę
  if (
    typeof decoded === 'object' &&
    decoded !== null &&
    'sub' in decoded &&
    typeof decoded.sub === 'object' &&
    decoded.sub !== null &&
    'id' in decoded.sub &&
    typeof (decoded.sub as any).id === 'number' // Rzutowanie, aby TypeScript nie narzekał
  ) {
    return decoded as TokenPayload;
  }

  throw new Error('Invalid token structure');
};