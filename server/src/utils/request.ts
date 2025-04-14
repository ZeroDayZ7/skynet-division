// utils/request.ts
import { Request } from 'express';
import AppError from '#ro/common/errors/AppError';

export function getValidatedData<T>(req: Request): T {
  if (!req._validatedData) {
    throw new AppError('VALIDATION_DATA_MISSING', 400);
  }
  return req._validatedData as T;
}
