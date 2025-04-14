// validators/config.validators.ts
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

// Schemat walidacji nazwy użytkownika
export const userNameSchema = z
  .string()
  .min(2, 'Pole musi mieć co najmniej 2 znaki')
  .max(50, 'Pole nie może mieć więcej niż 50 znaków')
  .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-]+$/, 'Pole zawiera niedozwolone znaki');

// Schemat walidacji nazwiska
export const surNameSchema = z
  .string()
  .min(2, 'Pole musi mieć co najmniej 2 znaki')
  .max(50, 'Pole nie może mieć więcej niż 50 znaków')
  .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-]+$/, 'Pole zawiera niedozwolone znaki');

// Schemat walidacji numeru dokumentu
export const idDocumentNumber = z
  .string()
  .length(11, 'Numer identyfikacyjny musi mieć dokładnie 11 cyfr')
  .regex(/^\d+$/, 'Numer identyfikacyjny może zawierać tylko cyfry');

// Schemat walidacji UUID
export const uuidSchema = z
  .string()
  .uuid('Nieprawidłowy format UUID');

// Schemat walidacji daty
export const dateSchema = z
  .string()
  .datetime({ message: 'Nieprawidłowy format daty' });

// Eksport wszystkich schematów jako obiekt dla łatwiejszego importu
export const validators = {
  password: passwordSchema,
  pin: pinSchema,
  email: emailSchema,
  username: userNameSchema,
  surname: surNameSchema,
  document: idDocumentNumber,
  uuid: uuidSchema,
  date: dateSchema,
};