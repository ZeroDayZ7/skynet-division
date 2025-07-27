import helmet from 'helmet';
import { HelmetOptions } from 'helmet';
import { env } from '#ro/config/env/env';

const helmetOptions: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // ⚠️ 'unsafe-inline' to ryzyko XSS
      styleSrc: ["'self'", "'unsafe-inline'"],  // ⚠️ 'unsafe-inline' to ryzyko
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'", env.FRONTEND_URL ?? 'http://localhost:3000'],
    },
  },
  xssFilter: true,       // Ustawia `X-XSS-Protection: 1; mode=block`
  noSniff: true,         // Ustawia `X-Content-Type-Options: nosniff`
  frameguard: { action: 'deny' }, // Ustawia `X-Frame-Options: DENY`
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }, // Nowy nagłówek
  hsts: { maxAge: 31536000, includeSubDomains: true }, // Wymusza HTTPS
  hidePoweredBy: true,   // Usuwa nagłówek `X-Powered-By`
};

export const helmetMiddleware = helmet(helmetOptions);