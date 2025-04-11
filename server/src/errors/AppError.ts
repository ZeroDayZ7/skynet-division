import SystemLog from '#ro/utils/SystemLog';
import { Response } from 'express';
import { ERROR_CODES } from '#ro/errors/errorCodes';
import { ERROR_MESSAGES } from '#ro/errors/errorMessages';

interface ErrorConfig {
  message: string;
  statusCode: number;
}

/**
 * Klasa reprezentująca błąd aplikacji z automatycznym mapowaniem kodów błędów.
 */
class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code: string;

  // Mapowanie kodów błędów na konfigurację
  private static errorMap: Record<string, ErrorConfig> = {
    [ERROR_CODES.INVALID_CREDENTIALS]: { message: ERROR_MESSAGES.INVALID_CREDENTIALS, statusCode: 401 },
    [ERROR_CODES.USER_BLOCKED]: { message: ERROR_MESSAGES.USER_BLOCKED, statusCode: 403 },
    [ERROR_CODES.ACCOUNT_NOT_ACTIVE]: { message: ERROR_MESSAGES.ACCOUNT_NOT_ACTIVE, statusCode: 403 },
    [ERROR_CODES.INVALID_REQUEST]: { message: ERROR_MESSAGES.INVALID_REQUEST, statusCode: 400 },
    [ERROR_CODES.SERVER_ERROR]: { message: ERROR_MESSAGES.SERVER_ERROR, statusCode: 500 },
    // Dodaj inne kody z ERROR_CODES, jeśli są używane
  };

  /**
   * Tworzy instancję AppError na podstawie kodu błędu.
   * @param code - Kod błędu (np. 'INVALID_CREDENTIALS').
   * @param isOperational - Czy błąd jest operacyjny (domyślnie true).
   */
  constructor(code: string, isOperational: boolean = true) {
    const config = AppError.errorMap[code] || {
      message: ERROR_MESSAGES.SERVER_ERROR,
      statusCode: 500,
    };

    super(config.message);

    this.name = this.constructor.name;
    this.statusCode = config.statusCode;
    this.isOperational = isOperational;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);

    SystemLog.error(`[AppError] ${this.message}`, {
      statusCode: this.statusCode,
      code: this.code,
      isOperational: this.isOperational,
    });
  }

  /**
   * Wysyła odpowiedź HTTP z błędem.
   * @param res - Obiekt odpowiedzi HTTP (Express Response).
   */
  sendErrorResponse(res: Response): void {
    res.status(this.statusCode).json({
      error: true,
      message: this.message,
      code: this.code,
    });
  }

  /**
   * Sprawdza, czy błąd jest operacyjny.
   * @returns {boolean} - True, jeśli błąd jest operacyjny.
   */
  isOperationalError(): boolean {
    return this.isOperational;
  }
}

export default AppError;