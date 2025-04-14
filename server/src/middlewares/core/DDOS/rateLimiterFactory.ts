// middleware/core/rateLimiterFactory.ts
import rateLimit from 'express-rate-limit';

export const createRateLimiter = (max: number, windowMinutes: number, errorMsg: string) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    message: { error: errorMsg },
    keyGenerator: req => req.ip || req.socket.remoteAddress || 'unknown',
  });
