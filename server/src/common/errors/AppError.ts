import SystemLog from '#ro/common/utils/SystemLog';
import { Response } from 'express';

export enum ErrorType {
  UNAUTHORIZED = 'UNAUTHORIZED',
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL = 'INTERNAL',
}

const ERROR_MESSAGES: Record<ErrorType, string> = {
  UNAUTHORIZED: 'Brak autoryzacji.',
  VALIDATION: 'Nieprawidłowe dane.',
  NOT_FOUND: 'Zasób nie został znaleziony.',
  INTERNAL: 'Wewnętrzny błąd serwera.',
};

class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code: string;
  public readonly type: ErrorType;

  constructor(
    code: string,
    statusCode: number,
    isOperational: boolean = true,
    message?: string,
    type: ErrorType = ErrorType.INTERNAL
  ) {
    // Ustawianie komunikatu: przekazany message lub domyślny z ERROR_MESSAGES
    const fallbackMessage = message || ERROR_MESSAGES[type];
    super(fallbackMessage);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    this.type = type;

    Error.captureStackTrace(this, this.constructor);
    this.logError();
  }

  private logError(): void {
    SystemLog.error(`[AppError] ${this.message}`, {
      statusCode: this.statusCode,
      code: this.code,
      type: this.type,
      isOperational: this.isOperational,
      stack: this.stack,
    });
  }

  public sendErrorResponse(res: Response): void {
    res.status(this.statusCode).json({
      success: false,
      type: this.type,
      message: this.message,
    });
  }

  public isOperationalError(): boolean {
    return this.isOperational;
  }
}

export default AppError;