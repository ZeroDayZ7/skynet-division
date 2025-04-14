// validators/register.validators.ts
import { z } from 'zod';
import { validators } from '#ro/modules/auth/validators/config.validator';

export const RegisterSchema = z.object({
  firstName: validators.username,
  lastName: validators.surname,
  email: validators.email,
  password: validators.email,
  idNumber: validators.document,
});

export type RegisterValidator = z.infer<typeof RegisterSchema>;
