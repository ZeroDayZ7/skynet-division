import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

type RequestSource = 'body' | 'query' | 'params';

export const validateRequest = <T>(
  schema: ZodSchema<T>,
  source: RequestSource = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = req[source];

    try {
      const result = schema.parse(data);
      // Dodaj sparsowane dane do requesta (np. req.validatedData)
      (req as any).validatedData = result;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return;
      }

      next(err);
    }
  };
};
