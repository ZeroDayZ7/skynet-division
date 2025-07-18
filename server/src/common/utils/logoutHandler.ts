import { Request, Response } from "express";
import { clearAuthCookie, clearCSRFCookie } from "#ro/common/utils/cookie.utils";
import SystemLog from "#ro/common/utils/SystemLog";
import { ErrorType } from "../errors/AppError";
import { ERROR_MESSAGES } from "../errors/errorMessages";

// Funkcja do obsługi wylogowania
export const handleLogout = (req: Request, res: Response, error: Error): void => {
  // Czyszczenie ciasteczek
  clearAuthCookie(res);

  // Czyszczenie sesji
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        SystemLog.error("Failed to destroy session during logout", {
          error: err.message,
          ip: req.ip,
          path: req.path,
        });
      }
    });
  }
SystemLog.warn(`[logoutHandler]error.message : ${error.message}`);
  // Wysłanie odpowiedzi z błędem
  res.status(401).json({
    success: false,
    type: ErrorType.UNAUTHORIZED,
    message: ERROR_MESSAGES.UNAUTHORIZED
  });
};
