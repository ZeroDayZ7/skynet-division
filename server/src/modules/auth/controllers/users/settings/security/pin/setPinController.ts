// // controllers/users/settings/security/pin/setPinController.ts
// import { Request, Response } from 'express';
// import SystemLog from '#ro/common/utils/SystemLog';
// import AppError from '#errors/AppError';
// import { setUserPin } from '#ro/modules/auth/services/pin.service';
// import { validateSetPinInput } from '#ro/modules/auth/controllers/users/settings/security/pin/validators/pin.validation';
// import { verifyUserPassword, hashValue } from '#ro/common/utils/auth.utils';

// export const setPinController = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = req.session.userId || req.user?.id;
//     if (!userId) {
//       throw new AppError('UNAUTHORIZED', 401);
//     }
//     SystemLog.warn(`req.body: ${JSON.stringify(req.body, null, 2)}`);
//     // Walidacja danych wejściowych
//     const { pin, password } = validateSetPinInput(req.body);

//     // Sprawdzenie hasła użytkownika
//     const passwordCorrect = await verifyUserPassword(userId, password);
//     if (!passwordCorrect) {
//       throw new AppError('INVALID_PASSWORD', 401);
//     }

//     // Hashowanie PIN-u
//     const hashedPin = await hashValue(pin); // Użyj hashPassword zamiast bcrypt.hash

//     // Zapisanie PIN-u
//     await setUserPin(userId, hashedPin);

//     SystemLog.info(`PIN ustawiony dla użytkownika ID: ${userId}`);
//     res.status(200).json({ 
//         success: true, 
//         message: 'PIN został ustawiony poprawnie.'
//     });
//   } catch (error: any) {
//     if (error instanceof AppError) {
//       error.sendErrorResponse(res);
//     } else {
//       const appError = new AppError('SERVER_ERROR', 500);
//       appError.sendErrorResponse(res);
//     }
//   }
// };