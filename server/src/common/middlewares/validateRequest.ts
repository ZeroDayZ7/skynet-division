// middleware/validation.ts
import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import AppError from '#ro/common/errors/AppError';

/**
 * Middleware walidujący dane wejściowe za pomocą schematu Zod.
 * Przekazuje zweryfikowane dane do `req._validatedData`.
 *
 * @param schema - Schemat Zod do walidacji danych wejściowych
 * @returns Middleware Express
 */
export const validateRequest = <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      req._validatedData = schema.parse(req.body);  // Walidacja i przypisanie danych
      next();
    } catch (error) {
      // Obsługa błędów walidacji
      if (error instanceof ZodError) {
        const firstError = error.errors?.[0]?.message || 'Nieprawidłowe dane wejściowe';
        throw new AppError('VALIDATION_ERROR', 400, false, firstError);
      }
      throw new AppError('VALIDATION_FAILED', 500);
    }
  };
