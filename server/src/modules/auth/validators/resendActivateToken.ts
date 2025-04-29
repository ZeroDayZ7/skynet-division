// validators/register.validators.ts
import { z } from 'zod';
import { emailSchema } from '#ro/validators/config.validator';

export const ResendActivateToken = z.object({
  email: emailSchema,
});

export type ResendPayload = z.infer<typeof ResendActivateToken>;
