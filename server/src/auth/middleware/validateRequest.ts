import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import AppError from '#ro/errors/AppError';

/**
 * Middleware walidujący dane wejściowe za pomocą schematu Zod.
 * Przekazuje zweryfikowane dane do `req.validatedData`.
 *
 * @param schema - Schemat Zod do walidacji danych wejściowych
 * @returns Middleware Express
 */
export const validateRequest = <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.body);
      req.validatedData = validatedData; // Dodane do rozszerzenia interfejsu `Request`
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const firstError = error.errors?.[0]?.message || 'Nieprawidłowe dane wejściowe';
        return next(new AppError(firstError, 400, true, 'VALIDATION_ERROR'));
      }
      return next(new AppError('Błąd walidacji danych', 500, false, 'VALIDATION_FAILED'));
    }
  };
