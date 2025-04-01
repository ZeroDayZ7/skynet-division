import rateLimit from 'express-rate-limit';
import { warn } from './tools/SystemLog'; // Używamy Twojego SystemLog

const isLocal = process.env.NODE_ENV === 'development';

// Ustalamy limity dla logowania i ogólne
const authLimiter = isLocal
  ? (req, res, next) => {
      // Opcjonalne logowanie w dev
      if (req.path.includes('/login')) {
        console.log('[DEV] Rate limiting disabled for login');
      }
      next();
    }
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minut
      max: 5,  // Maksymalnie 5 prób logowania
      keyGenerator: (req) => req.ip || req.socket.remoteAddress,
      handler: (req, res) => {
        // Logowanie próby ataku brute-force
        warn(`Brute force attempt from IP: ${req.ip}`);
        res.status(429).json({
          error: 'Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.',
          retryAfter: 15 * 60,
        });
      },
    });

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minut
  max: 100, // Maksymalnie 100 prób
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip || req.socket.remoteAddress,
  handler: (req, res) => {
    // Logowanie z ogólnym limitem
    warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: 'Zbyt wiele prób. Spróbuj ponownie za 15 minut.',
      retryAfter: 15 * 60,
    });
  },
});

export default { authLimiter, generalLimiter };
