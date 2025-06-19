/**
 * Schematy walidacji związane z autentykacją przy użyciu Zod.
 * @module lib/schemas/auth
 */

import { z } from 'zod';
import { activationTokenSchema, emailSchema, passwordSchema, usernameSchema } from './config.validator';


/**
 * Schemat walidacji dla formularza logowania.
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Schemat walidacji dla formularza rejestracji.
 */
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła nie są identyczne.',
    path: ['confirmPassword'],
  });

/**
 * Schemat walidacji dla formularza aktywacji.
 */
export const activateSchema = z.object({
  activationToken: activationTokenSchema,
});

/**
 * Schemat walidacji dla ponownego wysyłania kodu aktywacyjnego.
 */
export const resendActivationSchema = z.object({
  email: emailSchema,
});

/**
 * Typy wywnioskowane ze schematów.
 */
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ActivateSchema = z.infer<typeof activateSchema>;
export type ResendActivationSchema = z.infer<typeof resendActivationSchema>;
