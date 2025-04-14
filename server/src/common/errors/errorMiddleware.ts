import { Request, Response, NextFunction } from 'express';
import AppError from './AppError';
import SystemLog from '#ro/common/utils/SystemLog';
import { handleLogout } from '#ro/common/utils/logoutHandler';

/**
 * Globalny middleware do obsługi błędów w aplikacji.
 * 
 * @param error - Błąd, który został rzucony w aplikacji
 * @param req - Obiekt żądania Express
 * @param res - Obiekt odpowiedzi Express
 * @param next - Funkcja next (nie używana w error middleware)
 */
export const globalErrorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Obsługa błędów AppError
  if (error instanceof AppError) {
    SystemLog.error(`[AppError] ${error.message}`, {
      type: error.type,
      statusCode: error.statusCode
    });

    // Specjalna obsługa błędów UNAUTHORIZED
    if (error.type === 'UNAUTHORIZED') {
      return handleLogout(req, res, error);
    }

    // Standardowa obsługa AppError
    return error.sendErrorResponse(res);
  }

  // 2. Obsługa nieoczekiwanych błędów
  SystemLog.error(`[Unexpected Error]`, {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method
  });

  // Response dla środowisk deweloperskich
  const devErrorResponse = {
    message: 'Wewnętrzny błąd serwera',
    error: error.message,
    stack: error.stack,
    path: req.path
  };

  // Response dla produkcji
  const prodErrorResponse = {
    message: 'Wewnętrzny błąd serwera'
  };

  res.status(500).json(
    process.env.NODE_ENV !== 'production' 
      ? devErrorResponse 
      : prodErrorResponse
  );
};