import { fetchClient } from "@/lib/fetchClient";

// Interfejs dla danych zwracanych przez API (opcjonalne, dla lepszego typowania)
export interface SessionData {
  isAuthenticated: boolean;
}

export const loginUser = async (email: string, password: string): Promise<any> => {
  return await fetchClient("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const logoutUser = async (): Promise<void> => {
  await fetchClient("/api/auth/logout", {
    method: "POST",
  });
};

export const checkSession = async (): Promise<SessionData> => {
  return await fetchClient("/api/auth/status", {
    method: "GET",
  });
};