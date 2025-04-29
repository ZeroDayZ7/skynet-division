/**
 * Schematy walidacji związane z autentykacją przy użyciu Zod.
 * @module lib/schemas/auth
 */

import { z } from 'zod';

const SPECIAL_CHARS = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

/**
 * Schemat walidacji dla formularza logowania.
 */
export const loginSchema = z.object({
  email: z.string().email({ message: 'Nieprawidłowy adres e-mail' }),
  password: z.string().min(6, { message: 'Hasło musi mieć co najmniej 6 znaków.' }),
});

/**
 * Schemat walidacji dla formularza rejestracji.
 */
export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Nieprawidłowy adres e-mail' }),
    password: z
      .string()
      .min(8, { message: 'Hasło musi mieć co najmniej 8 znaków.' })
      .regex(/\d/, { message: 'Hasło musi zawierać co najmniej jedną cyfrę.' })
      .regex(/[A-Z]/, { message: 'Hasło musi zawierać co najmniej jedną dużą literę.' })
      .regex(SPECIAL_CHARS, { message: 'Hasło musi zawierać co najmniej jeden znak specjalny.' }),
    confirmPassword: z.string().min(8, { message: 'Potwierdź hasło' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła nie są identyczne.',
    path: ['confirmPassword'],
  });

/**
 * Schemat walidacji dla formularza aktywacji.
 */
export const activateSchema = z.object({
  activationToken: z
    .string()
    .length(6, { message: 'Kod aktywacyjny musi mieć dokładnie 6 cyfr.' })
    .regex(/^\d{6}$/, { message: 'Kod aktywacyjny musi składać się z 6 cyfr.' }),
});

/**
 * Schemat walidacji dla ponownego wysyłania kodu aktywacyjnego.
 */
export const resendActivationSchema = z.object({
  email: z.string().email({ message: 'Nieprawidłowy adres e-mail' }),
});

/**
 * Typy wywnioskowane ze schematów.
 */
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ActivateSchema = z.infer<typeof activateSchema>;
export type ResendActivationSchema = z.infer<typeof resendActivationSchema>;