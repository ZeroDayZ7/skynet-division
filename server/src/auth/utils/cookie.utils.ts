import { Response } from 'express';
import { jwtConfig } from '#/auth/config/jwt.config';

// Function to set auth token in cookie
export const setAuthCookie = (res: Response, token: string): void => {
  res.cookie(jwtConfig.cookieName, token, {
    ...jwtConfig.cookieOptions,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
};

// Function to clear auth cookie
export const clearAuthCookie = (res: Response): void => {
  res.clearCookie(jwtConfig.cookieName, {
    ...jwtConfig.cookieOptions,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
};