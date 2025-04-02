const rateLimit = require('express-rate-limit');
const SystemLog = require('./tools/SystemLog');

const isLocal = process.env.NODE_ENV === 'development';

const authLimiter = isLocal
  ? (req, res, next) => {
      // Opcjonalne logowanie w dev
      if (req.path.includes('/login')) {
        console.log('[DEV] Rate limiting disabled for login');
      }
      next();
    }
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 5,
      keyGenerator: (req) => req.ip || req.socket.remoteAddress,
      handler: (req, res) => {
        SystemLog.warn(`Brute force attempt from IP: ${req.ip}`);
        res.status(429).json({
          error: 'Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.',
          retryAfter: 15 * 60,
        });
      },
    });

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => req.ip || req.socket.remoteAddress
    });

module.exports = { authLimiter };