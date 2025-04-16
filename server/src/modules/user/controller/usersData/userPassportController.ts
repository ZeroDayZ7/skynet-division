import { Request, Response } from "express";
import SystemLog from "#ro/common/utils/SystemLog.js";
import AppError from '#errors/AppError';
import { getUserPassportDataService } from "#ro/modules/auth/services/passport.data.service";

export async function getUserPassportData(req: Request, res: Response): Promise<void> { 
  // const userId = req.user?.id as number;
  // const UserIdSession = req.session.userId;
  const userId = req.session.userId;
 
  if (typeof userId !== 'number') {
    SystemLog.error(`Passport controller userId: ${userId}`);
    throw new AppError('AUTHENTICATION_FAILED', 401, true);
  }
  
  try {
    const data = await getUserPassportDataService(userId);
    SystemLog.info(`Pobrano dane Passport`);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    SystemLog.error(`error:`, error);
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      SystemLog.error("Błąd pobierania danych paszportu");
      new AppError('SERVER_ERROR', 500, false).sendErrorResponse(res);
    }
  }
}
 