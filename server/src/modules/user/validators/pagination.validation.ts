// controllers/users/validators/pagination.validation.ts
import { z } from 'zod';
import { paginationSchema } from '#ro/validators/config.validator';

export const PaginationSchema = paginationSchema;

export type PaginationPayload = z.infer<typeof PaginationSchema>;
