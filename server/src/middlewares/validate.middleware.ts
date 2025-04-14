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
    SystemLog.warn(`[Validate] : ${JSON.stringify(req.body)}`);
    try {
      const result = schema.parse(data);
      // Dodaj sparsowane dane do requesta (np. req.validatedData)
      (req as any)._validatedData = result;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return;
      }

      next(err);
    }
  };
};
