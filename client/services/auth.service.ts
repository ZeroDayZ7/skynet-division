// auth.service.ts
import { fetchClient } from "@/lib/fetchClient";

// Interfejs dla danych zwracanych przez API
export interface UserData {
  role?: string;             // Rola użytkownika (opcjonalne)
  points?: number;           // Punkty użytkownika (opcjonalne)
  notifications?: number;    // Liczba nieprzeczytanych powiadomień (opcjonalne)
}

export interface LoginResponse {
  isAuthenticated: boolean;
  user: {
    role: string;
    points: number;
    notifications: number;
  };
  token?: string;
}

// Logowanie użytkownika
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  return await fetchClient("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    credentials: "include", // Ważne: przekazuje ciasteczka z odpowiedzi serwera
  });
};

// Wylogowanie użytkownika
export const logoutUser = async (): Promise<void> => {
  await fetchClient("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

// Sprawdzanie sesji
export interface SessionData {
  isAuthenticated: boolean;
}

export const checkSession = async (options: { cookies?: string } = {}): Promise<SessionData> => {
  return await fetchClient<SessionData>("/api/auth/status", {
    method: "GET",
    cookies: options.cookies,
    credentials: "include",
  });
};