// validators/login.validators.ts
import { z } from 'zod';
import { emailSchema, passwordSchema } from './auth.validators';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;