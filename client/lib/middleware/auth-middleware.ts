// lib/middleware/auth-middleware.ts
import { NextRequest } from 'next/server';
import { checkSession, Session } from './api/checkSession';
import { cookies } from 'next/headers';

export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookieStore = await cookies();
  const cookieName = process.env.SESSION_COOKIE_NAME ?? 'SESSION_KEY';
  const getSessionCookie = cookieStore.get(cookieName);
  const sessionKey = getSessionCookie?.value || '';

  try {
    const session: Session = await checkSession(sessionKey);
    console.log(`session: ${JSON.stringify(session)}`);
    return Boolean(session.user);
  } catch (error) {
    console.error('Auth middleware error:', error);
    return false;
  }
}
