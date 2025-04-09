import { Request, Response, NextFunction } from "express";
import { promisify } from "util";
import authService from "#auth/services/auth.service";
import { TokenPayload, generateAuthToken } from "#auth/utils/token.utils";
import SystemLog from "#utils/SystemLog";
import { UserAttributes } from "#auth/types/UserAttributes";
import { generateCSRFToken } from "#auth/utils/CSRF.utils";
import { LoginInput } from "#auth/validators/loginSchema";
import { setAuthCookie, setCSRFCookie } from "#auth/utils/cookie.utils";
import { getUnreadNotificationsCount } from "../users/getUnreadNotificationsCount";

// Typ dla wyniku walidacji użytkownika
interface ValidationResult {
  error: boolean;
  message?: string;
  user?: UserAttributes;
}

export const loginController = async (
  req: Request<LoginInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.validatedData;
  const userIp = Array.isArray(req.headers["x-forwarded-for"]) ? req.headers["x-forwarded-for"][0] : req.ip || "";

  try {
    // Weryfikacja użytkownika
    const validationResult = (await authService.validateUser(email, password, userIp)) as ValidationResult;
    
    SystemLog.info(`EEE:  ${JSON.stringify(validationResult)}`);

    if (validationResult.error || !validationResult.user) {
      SystemLog.warn("Invalid login attempt", {
        email,
        reason: validationResult.message || "Nieprawidłowe dane logowania",
      });
      res.status(401).json({
        isAuthenticated: false,
        message: validationResult.message || "Nieprawidłowy email lub hasło",
      });
      return;
    }

    const user = validationResult.user;
    SystemLog.warn(`USER: ${JSON.stringify(user.id)}`);
    // Generowanie tokena JWT
    const token = generateAuthToken({ id: user.id });
    const tokenCSRF = generateCSRFToken();
    // const gey = getU

    // Zapisywanie sesji (opcjonalne)
    const unread = await getUnreadNotificationsCount(user.id);
 
    req.session.userId = user.id;
    req.session.csrfToken = tokenCSRF;
    req.session.points = user.points ?? 0;
    req.session.role = user.role ?? 'user';
    req.session.notifications = unread;

    const saveSession = promisify(req.session.save.bind(req.session));
    await saveSession();

    // Logowanie sesji po zapisaniu
    SystemLog.info("Session saved", {
      sessionId: req.sessionID,
      sessionData: req.session,
    });

    //Ustawienie bezpiecznego ciasteczka
    setAuthCookie(res, token);
    setCSRFCookie(res, tokenCSRF);

    SystemLog.info("LOGIN CONTROLLER TS: ", {
      userId: user.id,
      role: user.role,
      ip: userIp,
    });

    // 6. Zwrócenie odpowiedzi
    res.status(200).json({
      isAuthenticated: true,
      user: {
        role: user.role,
        points: user.points,
        notifications: unread
      },
      tokenCSRF,
    });
  } catch (error: any) {
    SystemLog.error("Login process failed", {
      email,
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      isAuthenticated: false,
      message: "Wystąpił błąd serwera",
    });
  }
};
