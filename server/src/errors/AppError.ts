import SystemLog from '#ro/utils/SystemLog';
import { Response } from 'express';
import { ERROR_MESSAGES } from '#ro/errors/errorMessages';

class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code: string;

  /**
   * Tworzy instancję AppError.
   * @param code - Kod błędu (np. 'VALIDATION_ERROR') dla programisty.
   * @param statusCode - Kod statusu HTTP.
   * @param isOperational - Czy błąd jest operacyjny.
   * @param message - Opcjonalna wiadomość dla użytkownika.
   */
  constructor(
    code: keyof typeof ERROR_MESSAGES, // <- zapewnia zgodność z errorMessages
    statusCode: number,
    isOperational: boolean = true,
    message?: string
  ) {
    const fallbackMessage = ERROR_MESSAGES[code] || 'Wystąpił błąd serwera [AppError].';
    super(message || fallbackMessage);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
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
