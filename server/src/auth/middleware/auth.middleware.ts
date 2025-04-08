import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { jwtConfig, validateJwtConfig } from '../config/jwt.config';
import { decryptId } from '../utils/crypto.utils';
import { getTokenFromRequest } from '../utils/token.utils';
import { clearAuthCookie } from '../utils/cookie.utils';
import { IAuthErrorResponse, DecodedToken } from '../interfaces/auth.interfaces';
import SystemLog from '../../utils/SystemLog';

const { TokenExpiredError, JsonWebTokenError } = jwt;

// Function to create standard error responses
const createErrorResponse = (
  res: Response,
  status: number, 
  message: string,
  code: IAuthErrorResponse['code']
): Response<IAuthErrorResponse> => {
  return res.status(status).json({
    success: false,
    message,
    code,
    isLoggedIn: false
  });
};

// Function to handle authentication errors
const handleAuthError = (
  error: unknown,
  res: Response,
  req: Request
): Response<IAuthErrorResponse> => {
  let status = 401;
  let message = 'Invalid authentication token';
  let code: IAuthErrorResponse['code'] = 'AUTH_ERROR';
  let logMessage = 'Invalid token attempt';
  
  // Log metadata
  const logMetadata: Record<string, any> = { 
    action: 'authentication', 
    ip: req.ip, 
    path: req.path 
  };

  if (error instanceof TokenExpiredError) {
    message = 'Token expired';
    logMessage = 'Expired token attempt';
    logMetadata.expiredAt = error.expiredAt;
  } else if (error instanceof JsonWebTokenError) {
    message = 'Invalid token format or signature';
    logMessage = 'Invalid JWT format/signature attempt';
    logMetadata.error = error.message;
  } else {
    status = 500;
    message = 'Authentication processing error';
    code = 'SERVER_ERROR';
    logMessage = 'Internal authentication error';
    logMetadata.error = error instanceof Error ? error.message : 'Unknown authentication error';
    logMetadata.stack = error instanceof Error ? error.stack : undefined;
    SystemLog.error(logMessage, logMetadata);
  }

  // Log expected 401 errors as 'warn'
  if (status === 401) {
    SystemLog.warn(logMessage, logMetadata);
  }

  // Clear auth cookie
  clearAuthCookie(res);

  // Return standardized error response
  return createErrorResponse(res, status, message, code);
};

// Authentication middleware
// Authentication middleware
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Validate config on first use
    validateJwtConfig(jwtConfig);
    
    const token = getTokenFromRequest(req);
    if (!token) {
      SystemLog.warn('Missing authentication token', {
        action: 'authentication', ip: req.ip, path: req.path
      });
      createErrorResponse(res, 401, 'Authentication required', 'UNAUTHORIZED');
      return; // Zakończ funkcję po wysłaniu odpowiedzi
    }
    
    // Verify token
    const decoded = jwt.verify(
      token,
      jwtConfig.secret,
      { algorithms: ['HS256'], issuer: jwtConfig.issuer }
    ) as DecodedToken;
    
    // Decrypt user ID
    const userId = decryptId(decoded.sub);
    if (!userId) {
      SystemLog.warn('Invalid or undecryptable user ID in token', {
        action: 'token_validation', jwtSubject: decoded.sub
      });
      handleAuthError(new Error('Invalid token payload (userId)'), res, req);
      return; // Zakończ funkcję po obsłużeniu błędu
    }
    
    // Attach user data to request
    req.user = {
      id: userId,
      ...(decoded.rol && { role: decoded.rol }),
      ...(decoded.usr && { email: decoded.usr }),
    };
    
    SystemLog.info('User authenticated successfully', {
      action: 'authentication', userId, path: req.path
    });
    
    next(); // Wywołaj następne middleware
    
  } catch (error: unknown) {
    handleAuthError(error, res, req);
    // Nie zwracaj wartości po handleAuthError
  }
};

// Export error handling utilities for reuse
export { createErrorResponse, handleAuthError };