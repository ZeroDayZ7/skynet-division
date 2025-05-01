import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';

// Typ dla odpowiedzi kontrolera
interface SessionStatusResponse {
  isAuthenticated: boolean;
  message?: string;
}

export const checkSessionStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Logowanie sesji dla debugowania

  // SystemLog.warn(`[checkSessionStatus]: ${JSON.stringify(req.session, null, 2)}`);
  if (req.session.userId) {
    // Sesja istnieje, użytkownik jest zalogowany
    // Wyciągamy z sesji potrzebne wartości
    const { userId: id, role, nick, points, notifications } = req.session ?? {};

    // Tworzymy obiekt użytkownika
    const user = {
      id,
      role,
      nick,
      points,
      notifications,
    };

    // Tworzymy payload odpowiedzi
    const responsePayload = {
      isAuthenticated: true,
      user,
    };

    // Wysyłamy odpowiedź
    res.status(200).json(responsePayload);
  } else {
    // Sesja nie istnieje, użytkownik nie jest zalogowany
    // res.clearCookie(process.env.JWT_COOKIE_NAME, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    // });

    // res.clearCookie(process.env.SESSION_COOKIE_NAME, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    // });

    SystemLog.info('User session not found, cookies cleared');
    res.status(200).json({ isAuthenticated: false });
  }
};
