import { Request, Response } from 'express';
import { getUserPermissionsAdmin } from '#ro/modules/admin/services/getUserPermissions';
import SystemLog from '#ro/common/utils/SystemLog';

export const getUserPermissionsAdminController = async (req: Request, res: Response) => {
  try {
    SystemLog.warn(`request YOLO body: ${JSON.stringify(req.body)}`); // Logowanie ciała zapytania
    const userId = req.body.userId; // Pobieramy userId z ciała zapytania
    if (!userId) {
      throw new Error('Użytkownik nie znaleziony');
    }

    const permissions = await getUserPermissionsAdmin(userId);
    
    const response = {
      success: true,
      permissions,
    };

    // Logowanie pełnej odpowiedzi w konsoli
    SystemLog.warn(`Odpowiedź użytkownikowi: ${JSON.stringify(response, null, 2)}`);

    res.status(200).json(response);

  } catch (error: any) {
    const status = error.message === 'Użytkownik nie znaleziony' ? 404 : 500;
    SystemLog.error(`Błąd w getUserPermissionsController: ${error.message}`);
    res.status(status).json({ success: false, message: error.message });
  }
};