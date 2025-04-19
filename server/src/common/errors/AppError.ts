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
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code: keyof typeof ERROR_MESSAGES;
  public readonly type: ErrorType; // Zmienione na ErrorType dla bezpieczeństwa typów

  constructor(
    code: keyof typeof ERROR_MESSAGES,
    statusCode: number,
    isOperational: boolean = true,
    message?: string,
    type?: ErrorType // Zmienione na ErrorType
  ) {
    const fallbackMessage = ERROR_MESSAGES[code] || 'Wystąpił błąd serwera [AppError].';
    super(message || fallbackMessage);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    this.type = type || this.determineDefaultType(code); // Metoda do określania domyślnego typu

    Error.captureStackTrace(this, this.constructor);
    this.logError();
  }

  private determineDefaultType(code: keyof typeof ERROR_MESSAGES): ErrorType {
    // Przykładowa logika domyślnego przypisywania typu
    if (code.toString().includes('AUTH')) return ErrorType.UNAUTHORIZED;
    if (code.toString().includes('VALID')) return ErrorType.VALIDATION;
    return ErrorType.INTERNAL;
  }

  private logError(): void {
    SystemLog.error(`[AppError] ${this.message}`, {
      statusCode: this.statusCode,
      code: this.code,
      type: this.type,
      isOperational: this.isOperational,
      stack: this.stack // Dodanie stack trace do logów
    });
  }

  public sendErrorResponse(res: Response): void {
    res.status(this.statusCode).json({
      success: false,
      message: this.message,
      ...(process.env.NODE_ENV !== 'production' && {
        type: this.type,
        code: this.code
      })
    });
  }

  public isOperationalError(): boolean {
    return this.isOperational;
  }
}

export default AppError;