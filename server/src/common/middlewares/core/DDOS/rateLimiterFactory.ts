// middleware/core/rateLimiterFactory.ts
import rateLimit from 'express-rate-limit';

/**
 * Tworzy instancję limitera żądań (rate limiter) dla Express.js.
 *
 * @function createRateLimiter
 * @param {number} max - Maksymalna liczba dozwolonych żądań w danym oknie czasowym.
 * @param {number} windowMinutes - Długość okna czasowego w minutach.
 * @param {string} errorMsg - Wiadomość błędu zwracana po przekroczeniu limitu.
 * @returns {import('express-rate-limit').RateLimitRequestHandler} Middleware ograniczający liczbę żądań.
 *
 * @example
 * import { createRateLimiter } from './middleware/core/rateLimiterFactory';
 *
 * const limiter = createRateLimiter(100, 15, 'Za dużo żądań. Spróbuj ponownie później.');
 * app.use('/api/', limiter);
 */
export const createRateLimiter = (max: number, windowMinutes: number, errorMsg: string) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    message: { error: errorMsg },
    keyGenerator: req => req.ip || req.socket.remoteAddress || 'unknown',
  });
