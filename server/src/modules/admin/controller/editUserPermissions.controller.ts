import { Request, Response } from 'express';
import { editUserPermissions } from '#ro/modules/admin/services/editUserPermissions';

export const editUserPermissionsController = async (req: Request, res: Response) => {
  try {
    const updatedPermissions = await editUserPermissions(req.params.id, req.body.permissions);
    res.json({ success: true, data: updatedPermissions });
  } catch (error: any) {
    console.error('PUT /users/:id/permissions error:', error);
    const status = error.message === 'Użytkownik nie znaleziony' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};
