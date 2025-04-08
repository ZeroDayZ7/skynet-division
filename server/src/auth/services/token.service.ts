import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '#auth/config/jwt.config';
import { getTokenFromRequest } from '#auth/utils/token.utils';
import { generateAuthToken } from '#auth/utils/token.utils';
import { decryptId } from '#auth/utils/crypto.utils';
import { setAuthCookie } from '#auth/utils/cookie.utils';
import { DecodedToken, UserRole, IAuthErrorResponse } from '#/auth/interfaces/auth.interfaces';
import { handleAuthError, createErrorResponse } from '#auth/middleware/auth.middleware';

// Token refresh service
export const refreshAuthToken = (
  req: Request,
  res: Response
): Response | { token: string } => {
  try {
    const token = getTokenFromRequest(req);
    
    if (!token) {
      return createErrorResponse(res, 401, 'No token to refresh', 'UNAUTHORIZED');
    }
    
    // Verify current token
    const decoded = jwt.verify(
      token,
      jwtConfig.secret,
      { ignoreExpiration: true, issuer: jwtConfig.issuer }
    ) as DecodedToken;
    
    // Decrypt ID
    const userId = decryptId(decoded.sub);
    
    if (!userId) {
      return createErrorResponse(res, 401, 'Invalid token payload', 'AUTH_ERROR');
    }
    
    // Generate new token
    const newToken = generateAuthToken(userId, decoded.rol as UserRole, decoded.usr);
    setAuthCookie(res, newToken);
    
    return { token: newToken };
  } catch (error) {
    return handleAuthError(error, res, req);
  }
};

// Export all auth-related functions for use in controllers
export { generateAuthToken } from '../utils/token.utils';
export { encryptId } from '../utils/crypto.utils';
export { setAuthCookie } from '../utils/cookie.utils';