import { Request, Response, NextFunction } from "express";
import SystemLog from "#utils/SystemLog";
import { clearAuthCookie, clearCSRFCookie } from "#/auth/utils/cookie.utils";

export const logoutController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // 1. Sprawdź, czy użytkownik jest zalogowany
    // if (!req.session?.userId) {
    //   SystemLog.warn("Logout attempt without active session");
    //   res.status(401).json({
    //     success: false,
    //     isLoggedIn: false,
    //   });
    //   return;
    // }

    const userId = req.session.userId;

    // 2. Usuń sesję po stronie serwera
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          SystemLog.error("Failed to destroy session during logout", {
            error: err.message,
          });
        }
      });
    }

    // 3. Usuń ciasteczka po stronie klienta
    res.clearCookie(process.env.JWT_COOKIE_NAME || "accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie(process.env.SESSION_COOKIE_NAME || "sessionId", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // 4. Logowanie wylogowania
    SystemLog.info("User logged out successfully", { userId });

    // 5. Odpowiedź
    res.status(200).json({
      success: true,
      message: "Wylogowanie przebiegło pomyślnie.",
      isLoggedIn: false,
    });
  } catch (error: any) {
    SystemLog.error("Logout process failed", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: "Wystąpił błąd serwera",
      isLoggedIn: true,
    });
  }
};
