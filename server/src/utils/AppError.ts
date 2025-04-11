import SystemLog from '#ro/utils/SystemLog';

/**
 * Klasa reprezentująca błąd aplikacji z dodatkowymi informacjami.
 */
class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;

  /**
   * Tworzy instancję AppError.
   *
   * @param message - Wiadomość błędu.
   * @param statusCode - Kod statusu HTTP.
   * @param isOperational - Czy błąd jest operacyjny (np. walidacja, auth, CSRF, itd.).
   * @param code - (Opcjonalnie) kod błędu, np. 'AUTH_TOKEN_EXPIRED'
   */
  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    code?: string
  ) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);

    // Automatyczne logowanie błędu przy tworzeniu (opcjonalnie)
    SystemLog.error(`[AppError] ${message}`, {
      statusCode,
      code,
      isOperational,
    });
  }

  /**
   * Sprawdza, czy błąd jest operacyjny (np. autoryzacja, CSRF, itp.).
   */
  isOperationalError(): boolean {
    return this.isOperational;
  }
}

export default AppError;
