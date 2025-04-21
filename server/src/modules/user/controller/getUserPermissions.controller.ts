import { Request, Response } from 'express';
import { getUserPermissionsToLogin } from '../services/permissions.service';
import SystemLog from '#ro/common/utils/SystemLog';

export const getUserPermissionstToLoginController = async (req: Request, res: Response) => {
  try {
    SystemLog.warn(`start getUserPermissionstToLoginController`);
    SystemLog.warn(`userId: ${req.session.userId}`);
    const userId = req.session.userId;
    if (!userId) {
      throw new Error('Użytkownik nie znaleziony');
    }

    const permissions = await getUserPermissionsToLogin(userId);
    SystemLog.warn(`permissions: ${JSON.stringify(permissions, null, 2)}`);
    
    // Sprawdzamy, czy uprawnienia są puste
    // Zwracamy dane w formacie oczekiwanym przez frontend
    res.json({
      success: true,
      data: { permissions },
    });

    SystemLog.debug(`Zwracanie uprawnień dla użytkownika ${userId}`);

  } catch (error: any) {
    const status = error.message === 'Użytkownik nie znaleziony' ? 404 : 500;
    SystemLog.error(`Błąd w getUserPermissionsToLogin: ${error.message}`);
    res.status(status).json({ success: false, message: error.message });
  }
};