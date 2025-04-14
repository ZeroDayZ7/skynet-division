// validators/login.validators.ts
import { z } from 'zod';
import { emailSchema, passwordSchema } from '../../../validators/config.validator';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginPayload = z.infer<typeof loginSchema>;