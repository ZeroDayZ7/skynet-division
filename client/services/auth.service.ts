const apiUrl = process.env.NEXT_PUBLIC_API_SERV; // Stała na poziomie pliku

// Interfejs dla danych zwracanych przez API (opcjonalne, dla lepszego typowania)
export interface SessionData {
  isAuthenticated: boolean;
  user?: {
    role: string;
    points: number;
  };
}

export const loginUser = async (email: string, password: string): Promise<any> => {
  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Błąd logowania");
  }
  return data.user;
};

export const logoutUser = async (): Promise<void> => {
  const res = await fetch(`${apiUrl}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Błąd wylogowania");
  }
};

export const checkSession = async (): Promise<SessionData> => {
  const res = await fetch(`${apiUrl}/api/auth/status`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Sesja nieważna");
  }
  return data; // Zwraca { isAuthenticated, user? }
};