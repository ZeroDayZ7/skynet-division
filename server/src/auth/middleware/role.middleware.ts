import { Request, Response, NextFunction } from 'express';
import { UserRole } from '#/auth/interfaces/auth.interfaces';
import { createErrorResponse } from './auth.middleware';
import SystemLog from '#/utils/SystemLog';

// Role-based access control middleware
export const roleMiddleware = (requiredRoles: UserRole[]) => (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (!req.user) {
    return createErrorResponse(res, 401, 'Authentication required', 'UNAUTHORIZED');
  }
  
  if (!req.user.role || !requiredRoles.includes(req.user.role as UserRole)) {
    SystemLog.warn('Unauthorized role attempt', {
      userId: req.user.id,
      requiredRoles,
      actualRole: req.user.role
    });
    return createErrorResponse(res, 403, 'Insufficient permissions', 'FORBIDDEN');
  }
  
  next();
};