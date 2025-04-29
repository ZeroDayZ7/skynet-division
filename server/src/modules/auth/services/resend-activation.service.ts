import { generateActivationToken } from '#ro/common/utils/auth.utils';
import Users from '#ro/models/Users';
import AppError from '#ro/common/errors/AppError';

/**
 * Funkcja do ponownego generowania tokena aktywacyjnego
 * i zapisania go do bazy danych.
 * 
 * @param email - email użytkownika, dla którego ma zostać wygenerowany nowy token
 * @returns Promise<void>
 */
export const resendActivationToken = async (email: string): Promise<void> => {
  // Sprawdzenie, czy użytkownik istnieje w bazie danych
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    throw new AppError('USER_NOT_FOUND', 404, false, 'Użytkownik o podanym adresie e-mail nie istnieje.');
  }

  // Generowanie nowego tokena aktywacyjnego
  const newActivationToken = generateActivationToken();

  // Zapisanie nowego tokena aktywacyjnego w bazie
  user.activation_token = newActivationToken;

  // Zaktualizowanie rekordu użytkownika
  await user.save();

  // Tutaj później możesz zaimplementować logikę wysyłania e-maila (np. nodemailer)
};
