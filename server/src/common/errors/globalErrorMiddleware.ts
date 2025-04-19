import { Request, Response, NextFunction } from 'express';
import AppError, { ErrorType } from './AppError';
import SystemLog from '#ro/common/utils/SystemLog';
import { handleLogout } from '#ro/common/utils/logoutHandler';

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
      statusCode: error.statusCode,
      code: error.code,
    });

    // Specjalna obsługa błędów UNAUTHORIZED
    if (error.type === ErrorType.UNAUTHORIZED) {
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
    method: req.method,
  });

  res.status(500).json({
    success: false,
    message: 'Wewnętrzny błąd serwera.',
    type: ErrorType.INTERNAL,
  });
};