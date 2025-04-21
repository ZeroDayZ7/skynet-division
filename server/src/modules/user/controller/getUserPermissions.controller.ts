import { Request, Response } from 'express';
import { getUserPermissions } from '#ro/modules/admin/services/getUserPermissions';
import SystemLog from '#ro/common/utils/SystemLog';

export const getUserPermissionsController = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      throw new Error('Użytkownik nie znaleziony');
    }
    SystemLog.warn(`getUserPermissionsController: ${userId}`);
    const permissions = await getUserPermissions(userId);
    SystemLog.warn(`Permissions: ${JSON.stringify(permissions, null, 2)}`);
    SystemLog.warn(`Permissions dla użytkownika ${userId}: ${JSON.stringify(permissions, null, 2)}`);

    
    res.json({ success: true, data: permissions });
  } catch (error: any) {
    const status = error.message === 'Użytkownik nie znaleziony' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};
