import { UserRole } from '@/components/ui/ui/UserRoleBadge';

const apiUrl = process.env.EXPRESS_API_URL || 'http://localhost:4000';

export type Session = {
  user: {
    id: number;
    username: string;
    role: UserRole;
    points?: number;
    notifications?: number;
    hasDocumentsEnabled?: boolean;
  } | null;
};

/**
 * Sprawdza sesję użytkownika na podstawie klucza sesji.
 * @param sessionKey - Wartość ciasteczka sesji
 * @returns Obiekt sesji z danymi użytkownika lub null
 * @throws Error w przypadku problemów z backendem
 */
export async function checkSession(sessionKey: string): Promise<Session> {
  if (!sessionKey) {
    return { user: null };
  }

  try {
    const response = await fetch(`${apiUrl}/api/session`, {
      method: 'GET',
      headers: {
        Cookie: `${process.env.SESSION_COOKIE_NAME}=${sessionKey}`,
      },
      // credentials: 'include', // W razie potrzeby obsługi cross-origin
    });

    if (!response.ok) {
      return { user: null };
    }

    const user = await response.json();
    return { user: user.user };
  } catch (err) {
    throw new Error('Failed to verify session');
  }
}
