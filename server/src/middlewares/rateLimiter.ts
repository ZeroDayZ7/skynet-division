import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/utils/SystemLog'; // Zakładam, że masz TS w SystemLog

// Stałe czasu
const TIME = {
  MINUTE: 60 * 1000,
};

// Środowisko deweloperskie
const isLocal = process.env.NODE_ENV === 'development';

// Limiter dla autoryzacji (login)
const authLimiter: RateLimitRequestHandler | ((req: Request, res: Response, next: NextFunction) => void) = isLocal
  ? (req: Request, res: Response, next: NextFunction) => {
      // W środowisku deweloperskim pomijamy limitowanie i logujemy
      if (req.path.includes('/login')) {
        SystemLog.debug('[DEV] Rate limiting disabled for login');
      }
      next();
    }
  : rateLimit({
      windowMs: 15 * TIME.MINUTE, // 15 minut
      max: 5, // Maksymalnie 5 prób
      keyGenerator: (req: Request) => req.ip || req.socket.remoteAddress || 'unknown', // Klucz na podstawie IP
      handler: (req: Request, res: Response) => {
        SystemLog.warn('Brute force attempt detected', { ip: req.ip });
        res.status(429).json({
          error: 'Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.',
          retryAfter: 15 * 60, // w sekundach
        });
      },
    });

// Ogólny limiter dla aplikacji
const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * TIME.MINUTE, // 15 minut
  max: 100, // Maksymalnie 100 żądań
  standardHeaders: true, // Używa standardowych nagłówków (RateLimit-*)
  legacyHeaders: false, // Wyłącza stare nagłówki (X-RateLimit-*)
  keyGenerator: (req: Request) => req.ip || req.socket.remoteAddress || 'unknown', // Klucz na podstawie IP
});

// Eksport ESM
export default {
  authLimiter,
  limiter,
};