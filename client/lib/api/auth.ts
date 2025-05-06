/**
 * Funkcje API związane z autentykacją: logowanie, rejestracja, aktywacja itp.
 * @module lib/api/auth
 */

import { fetchClient } from '../fetchClient';
import { LoginSchema, RegisterSchema } from '@/lib/schemas/auth';
import type { User } from '@/context/AuthContext';

const LOGIN_ENDPOINT = '/api/auth/login';
const REGISTER_ENDPOINT = '/api/auth/register';
const ACTIVATE_ENDPOINT = '/api/auth/activate';
const RESEND_ENDPOINT = '/api/auth/resend-activation';
const LOGOUT_ENDPOINT = '/api/auth/logout';

/**
 * Loguje użytkownika przy użyciu podanych danych uwierzytelniających.
 * @param credentials - E-mail i hasło.
 * @param csrfToken - Token CSRF dla żądania.
 * @returns Dane użytkownika z serwera.
 * @throws Error w przypadku niepowodzenia logowania.
 */
export async function login(credentials: LoginSchema, csrfToken: string): Promise<{ user: User }> {
  if (!csrfToken) {
    throw new Error('Wymagany token CSRF');
  }

  return fetchClient<{ user: User }>(LOGIN_ENDPOINT, {
    method: 'POST',
    headers: { 'X-CSRF-Token': csrfToken },
    body: JSON.stringify(credentials),
  });
}

/**
 * Rejestruje nowego użytkownika przy użyciu podanych danych.
 * @param credentials - E-mail i hasło.
 * @param csrfToken - Token CSRF dla żądania.
 * @returns Void w przypadku sukcesu.
 * @throws Error w przypadku niepowodzenia rejestracji.
 */
export async function register(credentials: Pick<RegisterSchema, 'email' | 'password'>, csrfToken: string): Promise<void> {
  if (!csrfToken) {
    throw new Error('Wymagany token CSRF');
  }

  await fetchClient(REGISTER_ENDPOINT, {
    method: 'POST',
    headers: { 'X-CSRF-Token': csrfToken },
    body: JSON.stringify(credentials),
  });
}

/**
 * Aktywuje konto użytkownika za pomocą kodu aktywacyjnego.
 * @param activationToken - 6-cyfrowy kod aktywacyjny.
 * @param csrfToken - Token CSRF dla żądania.
 * @throws Error w przypadku niepowodzenia aktywacji.
 */
export async function activateAccount(activationToken: string, csrfToken: string): Promise<void> {
  if (!csrfToken) {
    throw new Error('Wymagany token CSRF');
  }

  await fetchClient(ACTIVATE_ENDPOINT, {
    method: 'POST',
    headers: { 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ activationToken }),
  });
}

/**
 * Ponownie wysyła kod aktywacyjny na e-mail użytkownika.
 * @param email - Adres e-mail użytkownika.
 * @throws Error w przypadku niepowodzenia ponownego wysyłania.
 */
export async function resendActivationCode(email: string, csrfToken: string): Promise<void> {
  await fetchClient(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ email }),
  });
}

/**
 * Wylogowuje użytkownika, wysyłając żądanie do endpointu wylogowania.
 * @param csrfToken - Token CSRF dla żądania.
 * @returns Void w przypadku sukcesu.
 * @throws Error w przypadku niepowodzenia wylogowania.
 */
export async function logout(): Promise<void> {
  await fetchClient(LOGOUT_ENDPOINT, {
    method: 'POST',
  });
}
