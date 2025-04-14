// validators/register.validators.ts
import { z } from 'zod';
import { validators } from '#ro/validators/config.validator';

export const RegisterSchema = z.object({
  firstName: validators.username,
  lastName: validators.surname,
  email: validators.email,
  password: validators.email,
  idNumber: validators.document,
});

export type RegisterValidator = z.infer<typeof RegisterSchema>;
