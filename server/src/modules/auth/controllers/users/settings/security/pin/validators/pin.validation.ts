// // controllers/users/settings/security/pin/validators/pin.validation.ts
// import { z } from 'zod';
// import AppError from '#ro/errors/AppError';
// import { pinSchema, passwordSchema } from '#ro/auth/validators/config.validators';

// const setPinSchema = z
//   .object({
//     pin: pinSchema,
//     confirmPin: pinSchema,
//     password: passwordSchema,
//   })
//   .refine((data) => data.pin === data.confirmPin, {
//     message: 'Podane kody PIN nie są zgodne',
//     path: ['confirmPin'],
//   });

// export const validateSetPinInput = (data: any) => {
//   const result = setPinSchema.safeParse(data);
//   if (!result.success) {
//     const message = result.error.errors.map((e) => e.message).join(', ');
//     throw new AppError('VALIDATION_ERROR', 400, true, message); // Dodano message do AppError
//   }
//   return result.data;
// };