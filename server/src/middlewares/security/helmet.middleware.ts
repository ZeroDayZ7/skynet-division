import helmet from 'helmet';
import { HelmetOptions } from 'helmet';

const helmetOptions: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'", process.env.API_URL ?? 'http://localhost:3000'],
    },
  },
};

export const helmetMiddleware = helmet(helmetOptions);
