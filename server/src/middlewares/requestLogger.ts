import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/utils/SystemLog';
import { v4 as uuidv4 } from 'uuid';

/**
 * Masks sensitive data in objects
 * Maska dane wrażliwe w obiektach
 */
const maskSensitiveData = (data: any): any => {
  if (!data || typeof data !== 'object') return data;

  const sensitiveKeys = [
    'password', 'token', 'authorization', 
    'access_token', 'refresh_token', 'cook4ie'
  ];

  return Object.keys(data).reduce((acc, key) => {
    const value = data[key];
    const isSensitive = sensitiveKeys.some(sk => 
      key.toLowerCase().includes(sk)
    );

    acc[key] = isSensitive ? '[HIDDEN]' : 
      (typeof value === 'object' ? maskSensitiveData(value) : value);
    return acc;
  }, {} as Record<string, any>);
};

/**
 * Advanced HTTP Request/Response Logger Middleware
 * Zaawansowane middleware do logowania żądań i odpowiedzi HTTP
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = process.hrtime();
  const requestId = uuidv4();
  
  // Skip logging for specific routes
  // Pomijanie logowania dla określonych ścieżek
  if (req.originalUrl === '/health') {
    return next();
  }

  // Attach request ID to the request object
  // Przypisanie ID żądania do obiektu request
  req.requestId = requestId;

  // Log basic request info
  // Logowanie podstawowych informacji o żądaniu
  SystemLog.info(`Request [${requestId}]: ${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
  });

  // Detailed debug logging
  // Szczegółowe logowanie debugowe
  if (SystemLog.isDebugEnabled()) {
    SystemLog.debug(`Request details [${requestId}]:`, {
      method: req.method,
      url: req.originalUrl,
      headers: maskSensitiveData(req.headers),
      cookies: maskSensitiveData(req.cookies),
      params: req.params,
      query: req.query,
      body: maskSensitiveData(req.body),
      apiUrl: process.env.API_URL
    });
  }

  // Hook into response finish to log response data
  // Nasłuchiwanie zdarzenia zakończenia odpowiedzi
  // Hook into response finish to log response data
  // Hook into response finish to log response data
  const originalSend = res.send;
  res.send = function (body: any): Response {
    const responseTime = process.hrtime(startTime);
    // const responseTimeMs = (responseTime[0] * 1e3 + responseTime[1] * 1e-6).toFixed(2);
    // SystemLog.info(`Response [${requestId}]: ${req.method} ${req.originalUrl}`, {
    //   statusCode: res.statusCode,
    //   responseTime: `${responseTimeMs}ms`,
    //   contentLength: res.get('Content-Length') || 'unknown'
    // });
    if (SystemLog.isDebugEnabled()) {
      SystemLog.debug(`Response details [${requestId}]:`, {
        statusCode: res.statusCode,
        headers: maskSensitiveData(res.getHeaders()),
        body: maskSensitiveData(
          typeof body === 'string' && body.length < 500 ? body : '[truncated]'
        )
      });
    }
    return originalSend.apply(res, arguments as any);
  };

  next();
};

// Extend Express Request type
// Rozszerzenie typu Request Expressa
declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}