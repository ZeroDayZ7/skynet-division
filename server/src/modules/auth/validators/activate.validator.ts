import { z } from 'zod';

// Twoja schema tokenu aktywacyjnego
export const activationTokenSchema = z.object({
  activationToken: z.string()
    .length(6, { message: 'Token aktywacyjny musi mieć 6 znaków.' }) // Sprawdza długość
    .regex(/^[0-9]{6}$/, { message: 'Token aktywacyjny musi zawierać tylko cyfry od 1 do 9.' }), // Sprawdza zakres cyfr
});

// Tworzymy typ z użyciem Zod
export type ActivationTokenPayload = z.infer<typeof activationTokenSchema>;
