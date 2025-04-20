// src/modules/user/controllers/blockUserController.ts
import { Request, Response } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';
import { blockUser } from '../services/block.service';

/**
 * Kontroler do blokowania użytkownika na podstawie ID.
 * Aktualizuje pole userBlock w bazie danych.
 */
export const blockUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Sprawdzenie, czy użytkownik jest uwierzytelniony i ma uprawnienia admina
    SystemLog.warn(`[blockUserController.ts] User ID: ${req.session.userId}`);

    // Pobranie ID użytkownika z parametrów URL
    const { id } = req.params;

    // Walidacja ID
    if (!id || isNaN(parseInt(id))) {
      throw new AppError('INVALID_USER_ID', 400);
    }

    // Blokowanie użytkownika
    await blockUser(parseInt(id));

    SystemLog.info(`[blockUserController.ts] User blocked: id=${id}`);

    res.status(200).json({ success: true, message: 'Użytkownik został zablokowany' });
  } catch (error: any) {
    if (error instanceof AppError) {
      error.sendErrorResponse(res);
    } else {
      const appError = new AppError('SERVER_ERROR', 500);
      appError.sendErrorResponse(res);
    }
  }
};