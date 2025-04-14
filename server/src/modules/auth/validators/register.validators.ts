// validators/register.validators.ts
import { z } from 'zod';
import { emailSchema, passwordSchema, idDocumentNumber, userNameSchema, surNameSchema } from './config.validators';
import { validators } from '#ro/auth/validators/config.validators';

export const RegisterSchema = z.object({
  firstName: validators.username,
  lastName: validators.surname,
  email: validators.email,
  password: validators.email,
  idNumber: validators.document,
});

export type RegisterValidator = z.infer<typeof RegisterSchema>;
