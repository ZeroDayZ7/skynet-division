import { Request, Response } from 'express';
import { getUserPermissions } from '#ro/modules/admin/services/getUserPermissions';
import SystemLog from '#ro/common/utils/SystemLog';

export const getUserPermissionsController = async (req: Request, res: Response) => {
  try {
    SystemLog.warn(`request body: ${JSON.stringify(req.body)}`); // Logowanie ciała zapytania
    const userId = req.body.userId; // Pobieramy userId z ciała zapytania
    if (!userId) {
      throw new Error('Użytkownik nie znaleziony');
    }

    const permissions = await getUserPermissions(userId);
    
    // Zwracamy dane w formacie oczekiwanym przez frontend
    res.json({
      success: true,
      data: permissions,
    });

    SystemLog.debug(`Zwracanie uprawnień dla użytkownika ${userId}`);

  } catch (error: any) {
    const status = error.message === 'Użytkownik nie znaleziony' ? 404 : 500;
    SystemLog.error(`Błąd w getUserPermissionsController: ${error.message}`);
    res.status(status).json({ success: false, message: error.message });
  }
};