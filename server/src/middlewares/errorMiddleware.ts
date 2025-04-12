import { Request, Response, NextFunction } from 'express';
import AppError from '#ro/errors/AppError';
import SystemLog from '#ro/utils/SystemLog';
/**
 * Middleware do obsługi błędów w aplikacji.
 * 
 * This middleware catches any errors that occur during the request-response cycle and sends the appropriate response to the client.
 * 
 * @param error - Błąd, który został rzucony w aplikacji.
 * @param req - Obiekt żądania (Request object).
 * @param res - Obiekt odpowiedzi (Response object).
 * @param next - Funkcja do przekazania do następnego middleware (nie używana w tym przypadku).
 */

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      SystemLog.error(`errorMiddleware IF`);
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500);
      SystemLog.error(`errorMiddleware ELSE`);
      appError.sendErrorResponse(res);
    }
  };