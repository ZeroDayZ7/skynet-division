// middleware/core/globalLimiter.middleware.ts
import { createRateLimiter } from './rateLimiterFactory';

export const globalLimiter = createRateLimiter(100, 60, 'Zbyt wiele prób. Spróbuj później.');
