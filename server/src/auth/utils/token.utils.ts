import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '#auth/config/jwt.config';

// Interfejs dla payloadu tokena (tylko id)
export interface TokenPayload {
  id: number;
}

// Funkcja do pobierania tokena z żądania
export const getTokenFromRequest = (req: Request): string | null => {
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

// Funkcja do generowania tokena JWT
export const generateAuthToken = (payload: TokenPayload): string => {
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: jwtConfig.expiresIn as jwt.SignOptions['expiresIn'], // Domyślnie 15 minut
    issuer: jwtConfig.issuer, // Domyślny issuer
  };

  return jwt.sign(payload, jwtConfig.secret, options);
};

// Funkcja do dekodowania tokena
export const decodeAuthToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, jwtConfig.secret) as TokenPayload;
  return decoded;
};