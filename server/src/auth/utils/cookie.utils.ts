import { Response } from 'express';
import { jwtConfig } from '#ro/auth/config/jwt.config';

export const setJwtCookie = (res: Response, token: string): void => {
  res.cookie(jwtConfig.cookieName, token, {
    ...jwtConfig.cookieOptions,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: parseInt(process.env.JWT_EXPIRES_IN || "900000", 10), // Zsynchronizuj z JWT
    sameSite: "strict",
  });
};

export const setCSRFCookie = (res: Response, token: string): void => {
  res.cookie(process.env.CSRF_COOKIE_NAME as string, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: parseInt(process.env.JWT_EXPIRES_IN || "900000", 10),
    sameSite: "strict",
  });
};

export const clearAuthCookie = (res: Response): void => {
  res.clearCookie(jwtConfig.cookieName, {
    ...jwtConfig.cookieOptions,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
};

export const clearCSRFCookie = (res: Response): void => {
  res.clearCookie(process.env.CSRF_COOKIE_NAME as string, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    
  });
};