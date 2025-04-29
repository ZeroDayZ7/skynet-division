// src/modules/user/validators/notificationQuery.schema.ts
import { z } from 'zod';

export const notificationQuerySchema = z.object({
  limit: z.coerce
    .number({ required_error: 'Parametr "limit" jest wymagany' })
    .int()
    .min(1, '"limit" musi być ≥ 1')
    .max(100, '"limit" może być maks. 100'),
  afterId: z.coerce
    .number()
    .int()
    .positive('"afterId" musi być dodatnie')
    .optional(),
});

export type NotificationQuery = z.infer<typeof notificationQuerySchema>;
