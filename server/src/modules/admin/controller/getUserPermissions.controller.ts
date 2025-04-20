import { Request, Response } from 'express';
import { getUserPermissions } from '#ro/modules/admin/services/getUserPermissions';

export const getUserPermissionsController = async (req: Request, res: Response) => {
  try {
    const permissions = await getUserPermissions(req.params.id);
    res.json({ success: true, data: permissions });
  } catch (error: any) {
    console.error('GET /users/:id/permissions error:', error);
    const status = error.message === 'Użytkownik nie znaleziony' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};
