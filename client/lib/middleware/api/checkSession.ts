const apiUrl = process.env.EXPRESS_API_URL || 'http://localhost:3001';

export type Session = {
  isAuthenticated: boolean;
};

/**
 * Sprawdza sesję użytkownika na podstawie klucza sesji.
 * @param sessionKey - Wartość ciasteczka sesji
 * @returns Obiekt sesji z danymi użytkownika lub null
 * @throws Error w przypadku problemów z backendem
 */
export async function checkSession(sessionKey: string): Promise<Session> {
  if (!sessionKey) {
    return { isAuthenticated: false };
  }

  try {
    const response = await fetch(`${apiUrl}/api/session`, {
      method: 'GET',
      // headers: {
      //   Cookie: `${process.env.SESSION_COOKIE_NAME}=${sessionKey}`,
      // },
      credentials: 'include', // W razie potrzeby obsługi cross-origin
    });

    if (!response.ok) {
      return { isAuthenticated: false };
    }

    const user = await response.json();
    return { isAuthenticated: user.isAuthenticated };
  } catch (err) {
    throw new Error('Failed to verify session');
  }
}