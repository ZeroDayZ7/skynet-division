// validators/register.validators.ts
import { z } from 'zod';
import { emailSchema, passwordSchema } from '#ro/validators/config.validator';

export const RegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterPayload = z.infer<typeof RegisterSchema>;
