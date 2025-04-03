import SystemLog from "#utils/SystemLog.js"; // Załóżmy, że masz logger

export const logoutController = async (req, res) => {
  try {
    // 1. Sprawdź, czy użytkownik jest zalogowany
    if (!req.session.userId) {
      SystemLog.warn("Logout attempt without active session");
      return res.status(401).json({
        success: false,
        isLoggedIn: false,
      });
    }

    const userId = req.session.userId; // Pobierz ID użytkownika z sesji

    // 2. Usuń sesję po stronie serwera
    req.session.destroy((err) => {
      if (err) {
        SystemLog.error("Error destroying session", {
          userId,
          error: err.message,
          stack: err.stack,
        });
        return res.status(500).json({
          success: false,
          message: "Błąd podczas usuwania sesji.",
          isLoggedIn: true,
        });
      }

      // 3. Usuń ciasteczka po stronie klienta
      res.clearCookie(process.env.ACCESS_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      res.clearCookie(process.env.SESSION_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      // 4. Logowanie wylogowania
      SystemLog.info("User logged out successfully", { userId });

      // 5. Odpowiedź
      return res.status(200).json({
        success: true,
        message: "Wylogowanie przebiegło pomyślnie.",
        isLoggedIn: false,
      });
    });
  } catch (error) {
    SystemLog.error("Logout process failed", {
      error: error.message,
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      isLoggedIn: true,
    });
  }
};
