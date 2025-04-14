import SystemLog from '#ro/common/utils/SystemLog';
import { Response } from 'express';
import { ERROR_MESSAGES } from './errorMessages';

export enum ErrorType {
  UNAUTHORIZED = 'UNAUTHORIZED',
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL = 'INTERNAL'
}

class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code: string;
  public type: string;

  /**
   * Tworzy instancję AppError.
   * @param code - Kod błędu (np. 'VALIDATION_ERROR') dla programisty.
   * @param statusCode - Kod statusu HTTP.
   * @param isOperational - Czy błąd jest operacyjny.
   * @param message - Opcjonalna wiadomość dla użytkownika.
   * @param 'throw new AppError('INVALID_REQUEST', 400);
   * @param 'throw new Error('Oops, coś poszło nie tak');
   */
  constructor(
    code: keyof typeof ERROR_MESSAGES,
    statusCode: number,
    isOperational: boolean = true,
    message?: string,
    type?: string // Dodaj nowy parametr
  ) {
    const fallbackMessage = ERROR_MESSAGES[code] || 'Wystąpił błąd serwera [AppError].';
    super(message || fallbackMessage);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    this.type = type || ErrorType.INTERNAL;

    Error.captureStackTrace(this, this.constructor);

    SystemLog.error(`[AppError] ${this.message}`, {
      statusCode: this.statusCode,
      code: this.code,
      type: this.type, // Dodaj type do logów
      isOperational: this.isOperational,
    });
  }

  /**
   * Wysyła odpowiedź HTTP z błędem.
   */
  sendErrorResponse(res: Response): void {
    res.status(this.statusCode).json({
      message: this.message,
    });
  }

  /**
   * Czy to błąd operacyjny?
   */
  isOperationalError(): boolean {
    return this.isOperational;
  }
}

export default AppError;
