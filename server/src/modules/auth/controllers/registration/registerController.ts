// import { Request, Response, NextFunction } from 'express';
// import { z } from 'zod';
// import Users from '#ro/auth/models/Users';
// import { hashValue } from '#ro/auth/utils/auth.utils';
// import SystemLog from '#ro/utils/SystemLog';
// import { createError } from '#ro/errors/errorFactory';
// import { ERROR_CODES } from '#ro/errors/errorCodes';
// import { RegisterValidator } from '#ro/auth/validators/register.validators';
// import AppError from '#ro/errors/AppError';

// export const registerController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ):  Promise<void> => {
//   const userIp = Array.isArray(req.headers['x-forwarded-for'])
//     ? req.headers['x-forwarded-for'][0]
//     : req.ip || 'unknown';

//   try {
//     const validatedData = req.validatedData as RegisterValidator;

//     const existingUser = await Users.findOne({
//       where: { email: validatedData.email },
//     });

//     if (existingUser) {
//       throw new AppError('USER_EXIST', 400);

//     }
//     // Hashowanie hasła
 
//     SystemLog.info(`Nowy użytkownik zarejestrowany: ${validatedData.email}`);

//     res.status(201).json({
//       message: 'Rejestracja przebiegła pomyślnie',
//       user: {
//         id: newUser.id,
//         email: newUser.email,
//         username: newUser.user,
//       },
//     });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       SystemLog.error('Błąd walidacji danych rejestracji', { error });
//       return res.status(400).json({
//         message: 'Nieprawidłowe dane rejestracji',
//         errors: error.errors,
//       });
//     }

//     SystemLog.error('Błąd podczas rejestracji użytkownika', { error });
//     next(error);
//   }
// };
