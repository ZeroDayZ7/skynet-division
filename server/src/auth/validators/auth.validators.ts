// validators/auth.validators.ts
import { z } from 'zod';

// Schemat walidacji hasła
export const passwordSchema = z
  .string()
  .min(6, 'Hasło musi mieć co najmniej 6 znaków')
  .max(100, 'Hasło nie może być dłuższe niż 100 znaków')
  .regex(/^[^\s]+$/, 'Hasło nie może zawierać spacji');

// Schemat walidacji PIN-u
export const pinSchema = z
  .string()
  .length(4, 'PIN musi mieć dokładnie 4 cyfry')
  .regex(/^\d+$/, 'PIN może zawierać tylko cyfry');

// Schemat walidacji email
export const emailSchema = z
  .string()
  .email('Niepoprawny adres email')
  .max(100, 'Email za długi')
  .trim();