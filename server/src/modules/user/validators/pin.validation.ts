// controllers/users/settings/security/pin/validators/pin.validation.ts
import { z } from 'zod';
import { pinSchemas, passwordSchema } from '#ro/validators/config.validator';

export const pinSchema = z.object({
    pin: pinSchemas,
    confirmPin: pinSchemas,
    password: passwordSchema,
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: 'Podane kody PIN nie są zgodne',
    path: ['confirmPin'],
  });


export type PinPayload = z.infer<typeof pinSchema>;