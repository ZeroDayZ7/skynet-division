import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';

type RequestSource = 'body' | 'query' | 'params';

// Lista dozwolonych źródeł danych
const VALID_SOURCES: RequestSource[] = ['body', 'query', 'params'];

/**
 * Middleware do walidacji danych żądania przy użyciu schematu Zod.
 * @param schema - Schemat Zod do walidacji danych
 * @param source - Źródło danych do walidacji (body, query, params)
 * @returns Middleware Express
 */
export const validateRequest = <T>(
  schema: ZodSchema<T>,
  source: RequestSource = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Walidacja źródła danych
    if (!VALID_SOURCES.includes(source)) {
      SystemLog.error(`[validateRequest] Nieprawidłowe źródło danych: ${source}`);
      res.status(500).json({
        success: false,
        message: 'Nieprawidłowe źródło danych w middleware walidacji',
      });
      return;
    }

    const data = req[source];
    SystemLog.info(
      `[validateRequest] Metoda: ${req.method}, Ścieżka: ${req.path}, Źródło: ${source}, Dane: ${JSON.stringify(
        data,
        null,
        2
      )}`
    );

    try {
      const result = schema.parse(data);
      req._validatedData = result; // Bezpieczne przypisanie z typem T
      SystemLog.info(
        `[validateRequest] Walidacja zakończona sukcesem: ${JSON.stringify(result, null, 2)}`
      );
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        }));
        SystemLog.warn(
          `[validateRequest] Błędy walidacji: ${JSON.stringify(errors, null, 2)}`
        );
        res.status(400).json({
          success: false,
          message: 'Błąd walidacji danych',
          errors,
        });
        return;
      }
      SystemLog.error(`[validateRequest] Nieoczekiwany błąd: ${err}`);
      next(err); // Przekazanie innych błędów do globalnego middleware
    }
  };
};

/**
 * Pobiera zwalidowane dane z żądania.
 * @param req - Obiekt żądania Express
 * @returns Zwalidowane dane
 * @throws Error jeśli brak zwalidowanych danych
 */
export const getValidatedData = <T>(req: Request): T => {
  if (!req._validatedData) {
    SystemLog.error('[getValidatedData] Brak zwalidowanych danych w żądaniu');
    throw new Error('Brak zwalidowanych danych w żądaniu');
  }
  return req._validatedData as T;
};