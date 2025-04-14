// import { Request, Response } from 'express';
// import { z } from 'zod';
// import { checkEmailAvailability } from '#ro/auth/services/register.service';
// import SystemLog from '#ro/utils/SystemLog';

// // Tworzymy schemę walidacji Zod
// const emailSchema = z.object({
//   email: z.string().email("Niepoprawny adres e-mail").max(100, "E-mail za długi").trim(),
// });

// export const checkEmailAvailabilityController = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Walidacja e-maila bezpośrednio w kontrolerze
//     const { email } = emailSchema.parse(req.body);

//     // Sprawdzamy, czy e-mail jest dostępny
//     const userExists = await checkEmailAvailability(email);
//     SystemLog.info(`available: ${userExists}`);
//     res.status(200).json({ available: userExists }); 
//     return;

//   } catch (error: unknown) {
//     // Sprawdzamy, czy błąd jest instancją ZodError
//     if (error instanceof z.ZodError) {
//       res.status(400).json({ message: error.errors[0].message });
//     } else {
//       res.status(500).json({ message: 'Wystąpił nieoczekiwany błąd.' });
//     }
//   }
// };
