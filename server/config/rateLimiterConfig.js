import rateLimit from 'express-rate-limit';
import SystemLog from '../utils/SystemLog.js'; // Import całej instancji loggera

const isLocal = process.env.NODE_ENV === 'development';

// Limiter dla logowania
const authLimiter = isLocal
  ? (req, res, next) => {
      if (req.path.includes('/login')) {
        console.log('[DEV] Rate limiting disabled for login');
      }
      next();
    }
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minut
      max: 5, // Maksymalnie 5 prób logowania
      keyGenerator: (req) => req.ip || req.socket.remoteAddress,
      handler: (req, res) => {
        // Użycie SystemLog.warn zamiast samego warn
        SystemLog.warn(`Brute force attempt from IP: ${req.ip}`);
        res.status(429).json({
          error: 'Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.',
          retryAfter: 15 * 60,
        });
      },
    });

// Ogólny limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minut
  max: 100, // Maksymalnie 100 żądań
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip || req.socket.remoteAddress,
  handler: (req, res) => {
    // Użycie SystemLog.warn zamiast samego warn
    SystemLog.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: 'Zbyt wiele żądań. Spróbuj ponownie za 15 minut.',
      retryAfter: 15 * 60,
    });
  },
});

export default { authLimiter, generalLimiter };