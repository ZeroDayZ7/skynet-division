// src/middleware/validateRequest.ts
import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';

type RequestSource = 'body' | 'query' | 'params';

export const validateRequest = <T>(
  schema: ZodSchema<T>,
  source: RequestSource = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = req[source];
    SystemLog.info(`[validateRequest] źródło: ${source}, dane: ${JSON.stringify(data)}`);

    try {
      const result = schema.parse(data);
      (req as any)._validatedData = result;
      SystemLog.info(`[validateRequest] wynik: ${JSON.stringify(result)}`);
      next(); // Poprawne wywołanie next() bez zwracania wartości
    } catch (err) {
      if (err instanceof ZodError) {
        const messages = err.errors.map(e => e.message).join('; ');
        SystemLog.warn(`[validateRequest] błędy walidacji: ${messages}`);
        res.status(400).json({ success: false, message: messages }); // Nie zwracamy wartości, tylko wysyłamy odpowiedź
        return; // Przerywamy wykonanie middleware
      }
      next(err); // Przekazujemy inne błędy dalej
    }
  };
};