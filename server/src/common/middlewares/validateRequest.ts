import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import AppError from '#ro/common/errors/AppError';

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
      req.validatedData = validatedData;
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const firstError = error.errors?.[0]?.message || 'Nieprawidłowe dane wejściowe';
        throw new AppError('VALIDATION_ERROR', 400, false, firstError); // 1: dla programisty, 4: dla użytkownika
      }
      throw new AppError('VALIDATION_FAILED', 500, false); // Inny błąd
    }
  };