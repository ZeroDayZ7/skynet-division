// validators/config.validators.ts
import { z } from 'zod';

// Schemat walidacji hasła
export const passwordSchema = z
  .string()
  .min(8, 'Hasło musi mieć co najmniej 8 znaków')
  .max(128, 'Hasło nie może być dłuższe niż 128 znaków')
  .regex(/^[^\s]+$/, 'Hasło nie może zawierać spacji');

// Schemat walidacji PIN-u
export const pinSchemas = z
  .string()
  .length(4, 'PIN musi mieć dokładnie 4 cyfry')
  .regex(/^\d+$/, 'PIN może zawierać tylko cyfry');

// Schemat walidacji email
export const emailSchema = z
  .string()
  .email('Niepoprawny adres email')
  .max(100, 'Email za długi')
  .trim();

// usernameSchema i surnameSchema używają regexu do walidacji:
// ^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-]+$
// Składnia regexu:
// - a-zA-Z        → wszystkie litery alfabetu łacińskiego (małe i wielkie)
// - ąćęłńóśźżĄĆĘŁŃÓŚŹŻ → polskie litery (małe i wielkie)
// - \s            → spacje
// - \-            → myślniki (np. dla nazwisk dwuczłonowych)
// - ^ i $         → początek i koniec ciągu (cały string musi pasować)
// - +   
// Schemat walidacji nazwy użytkownika
export const usernameSchema = z
  .string()
  .min(2, 'Pole musi mieć co najmniej 2 znaki')
  .max(50, 'Pole nie może mieć więcej niż 50 znaków')
  .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-]+$/, 'Pole zawiera niedozwolone znaki');

// Schemat walidacji nazwiska
export const surnameSchema = z
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

// Schemat walidacji paginacji
export const paginationSchema = z.object({
  limit: z
    .number({
      required_error: 'Parametr "limit" jest wymagany',
      invalid_type_error: '"limit" musi być liczbą',
    })
    .int()
    .min(1, '"limit" musi być większe niż 0')
    .max(10, '"limit" nie może przekraczać 100'),
});




// Eksport wszystkich schematów jako obiekt dla łatwiejszego importu
export const validators = {
  password: passwordSchema,
  pin: pinSchemas,
  email: emailSchema,
  username: usernameSchema,
  surname: surnameSchema,
  document: idDocumentNumber,
  uuid: uuidSchema,
  date: dateSchema,
  pagination: paginationSchema
};