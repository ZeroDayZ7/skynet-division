import { Request, Response } from 'express';
import { getUserPermissionsToLogin } from '../services/permissions.service';
import SystemLog from '#ro/common/utils/SystemLog';

export const getUserPermissionstToLoginController = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      throw new Error('Użytkownik nie znaleziony');
    }

    const permissions = await getUserPermissionsToLogin(userId);

    const response = {
      permissions,
    };

    // Logowanie pełnej odpowiedzi w konsoli
    // SystemLog.warn(`Odpowiedź użytkownikowi: ${JSON.stringify(response, null, 2)}`);

    res.status(200).json(response);

  } catch (error: any) {
    const status = error.message === 'Użytkownik nie znaleziony' ? 404 : 500;
    SystemLog.error(`Błąd w getUserPermissionsToLogin: ${error.message}`);
    res.status(status).json({ success: false, message: error.message });
  }
};
