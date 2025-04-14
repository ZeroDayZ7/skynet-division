// validators/register.validators.ts
import { z } from 'zod';
import { pinSchema, passwordSchema } from './config.validator';

export const setPinSchema = z
.object({
  pin: pinSchema,
  confirmPin: pinSchema,
  password: passwordSchema,
})
.refine((data) => data.pin === data.confirmPin, {
  message: 'Podane kody PIN nie są zgodne',
  path: ['confirmPin'],
});

export type RegisterValidator = z.infer<typeof setPinSchema>;


