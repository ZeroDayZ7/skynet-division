import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';

export const checkSessionStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Logowanie sesji dla debugowania

  // SystemLog.warn(`[checkSessionStatus]: ${JSON.stringify(req.session, null, 2)}`);
  // SystemLog.warn(`req.user: ${req.session.userId}`);
  if (req.session.userId) {
    // Sesja istnieje, użytkownik jest zalogowany
    // Wyciągamy z sesji potrzebne wartości
    const { userId: id, role, username, points, hasDocumentsEnabled} = req.session ?? {};

    // Tworzymy obiekt użytkownika
    const user = {
      id,
      role,
      username,
      points,
      hasDocumentsEnabled
    };

    // Tworzymy payload odpowiedzi
    const responsePayload = {
      user,
    };

    // SystemLog.warn(responsePayload);

    // Wysyłamy odpowiedź
    res.status(200).json(responsePayload);
  } else {
    SystemLog.info('User session not found, cookies cleared');
    res.status(200).json({ user: null });
  }
};
