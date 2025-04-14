// middleware/core/loginLimiter.middleware.ts
import { createRateLimiter } from './rateLimiterFactory';

export const loginLimiter = createRateLimiter(5, 15, 'Za dużo prób logowania. Spróbuj za 15 min.');
