// lib/auth.ts
// import { Session } from "@/lib/session/types/session.types";
const apiUrl = process.env.EXPRESS_API_URL || "http://localhost:3001";


export type Session = {
  user: {
    id: string;
    role: "user" | "admin";
    // inne pola...
  } | null;
};


/**
 * Sprawdza sesję użytkownika, walidując ciasteczko i pobierając dane użytkownika.
 * @param sessionKey - Wartość ciasteczka 'SESSION_KEY'
 */
export async function checkSession(sessionKey: string): Promise<Session> {
  if (!sessionKey) {
    return { user: null };
  }

  try {
    // Wykonaj zapytanie do backendu, aby zweryfikować sesję
    const response = await fetch(`${apiUrl}/api/session`, {
      method: "GET",
      headers: {
        Cookie: `${process.env.SESSION_COOKIE_NAME}=${sessionKey}`, // Wysłanie tylko samego ciasteczka
      },
    });

    if (!response.ok) {
      return { user: null };
    }

    const user = await response.json();
    console.log(`[checkSession] Odpowiedź z backendu:`, user);
    return {
      user: user.user,
    };
  } catch (err) {
    console.error("Błąd podczas pobierania sesji:", err);
    return { user: null };
  }
}
