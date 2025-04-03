import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import SystemLog from '#utils/SystemLog.js';
import jwtConfig from '#config/jwt.config.js';

/**
 * Middleware do weryfikacji tokenu JWT z ciasteczka
 * - Weryfikuje token z nagłówka Authorization lub ciasteczka
 * - Deszyfruje ID użytkownika
 * - Dołącza dane użytkownika do requestu
 */
export const authMiddleware = (req, res, next) => {
  try {
    // 1. Pobierz token z ciasteczka lub nagłówka
    const token = getTokenFromRequest(req);
    
    if (!token) {
      SystemLog.warn('Missing authentication token', {
        action: 'authentication',
        ip: req.ip,
        path: req.path
      });
      return sendUnauthorized(res, 'Authentication required');
    }

    // 2. Zweryfikuj token JWT
    const decoded = jwt.verify(token, jwtConfig.secret, {
      algorithms: ['HS256'],
      issuer: jwtConfig.issuer
    });
    
    // 3. Deszyfruj ID użytkownika
    const userId = decryptId(decoded.sub);
    
    if (!userId) {
      SystemLog.warn('Invalid user ID in token', {
        action: 'token_validation',
        tokenPreview: token.slice(-8)
      });
      return sendUnauthorized(res, 'Invalid token payload');
    }

    // 4. Dołącz dane użytkownika do requestu
    req.user = {
      id: userId,
      // Możesz dodać dodatkowe pola jeśli są w tokenie:
      // role: decoded.rol,
      // email: decoded.usr
    };

    SystemLog.info('User authenticated', {
      action: 'authentication',
      userId,
      path: req.path
    });

    next();
  } catch (error) {
    handleAuthError(error, res, req);
  }
};

// Helper functions

const getTokenFromRequest = (req) => {
  // 1. Sprawdź nagłówek Authorization
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  // 2. Sprawdź ciasteczko
  if (req.cookies?.[jwtConfig.cookieName]) {
    return req.cookies[jwtConfig.cookieName];
  }

  return null;
};

const decryptId = (encryptedId) => {
  try {
    const [ivHex, encrypted] = encryptedId.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(jwtConfig.encryptionKey),
      iv
    );
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    SystemLog.error('ID decryption failed', {
      action: 'decryption',
      error: error.message
    });
    return null;
  }
};

const sendUnauthorized = (res, message) => {
  return res.status(401).json({
    success: false,
    message,
    error: 'UNAUTHORIZED'
  });
};

const handleAuthError = (error, res, req) => {
  let status = 401;
  let message = 'Invalid token';

  if (error instanceof jwt.TokenExpiredError) {
    message = 'Token expired';
    SystemLog.warn('Expired token attempt', {
      action: 'authentication',
      ip: req.ip,
      path: req.path
    });
  } else if (error instanceof jwt.JsonWebTokenError) {
    message = 'Invalid token';
    SystemLog.warn('Invalid token attempt', {
      action: 'authentication',
      error: error.message,
      ip: req.ip
    });
  } else {
    status = 500;
    message = 'Authentication error';
    SystemLog.error('Authentication failed', {
      action: 'authentication',
      error: error.message,
      stack: error.stack
    });
  }

  // Wyczyść ciasteczko w przypadku błędu
  res.clearCookie(jwtConfig.cookieName, {
    path: '/',
    domain: process.env.COOKIE_DOMAIN,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });

  return res.status(status).json({
    success: false,
    message,
    code: 'AUTH_ERROR'
  });
};