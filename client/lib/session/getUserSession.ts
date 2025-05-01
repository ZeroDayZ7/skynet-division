import { fetchClient } from "@/lib/fetchClient";
import { User } from '@/context/AuthContext';

export type Session = {
  isAuthenticated: true;
  user: User;
};

// Sesja jest ważna tylko gdy user istnieje
export async function getUserSession(): Promise<Session | null> {
  try {
    const session = await fetchClient<Session>('/api/session', {
      method: 'GET',
      credentials: 'include',
    });

    if (session?.isAuthenticated && session?.user) {
      return session;
    }

    return null; // Sesja nieautoryzowana
  } catch (err) {
    console.error("[getUserSession] Błąd:", err);
    return null;
  }
}
