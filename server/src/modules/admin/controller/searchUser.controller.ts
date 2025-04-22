import { Request, Response } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';
import { searchUsers } from '../services/search.service';

/**
 * Kontroler do wyszukiwania użytkowników na podstawie kryteriów (email, id, role).
 * Zwraca listę użytkowników spełniających podane kryteria.
 */
export const searchUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Pobranie parametrów zapytania
    const { email = '', id = '', role = '' } = req.body;
    SystemLog.debug(`EEE`);

    // Walidacja parametrów
    if (typeof email !== 'string' || typeof id !== 'string' || typeof role !== 'string') {
      throw new AppError('INVALID_QUERY_PARAMS', 400);
    }

    // Wyszukiwanie użytkowników
    const users = await searchUsers({ email, id, role });

    // SystemLog.info(`Searched users by criteria: email=${email}, id=${id}, role=${role} - Found: ${users.length}`);
    // SystemLog.info(`[search.controller.ts] ${JSON.stringify(users, null, 2)}`);

    res.status(200).json(users);
  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500);
      appError.sendErrorResponse(res);
    }
  }
};
