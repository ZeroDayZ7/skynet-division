import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['pl', 'en'],
  defaultLocale: 'pl'
})

import { checkSession } from '@/lib/session/checkSession';
import { cookies } from 'next/headers';
import { logMiddlewareRequest, logMiddlewareResponse } from './lib/middleware/logger-middleware';

const publicPaths = ['/', '/login', '/register', '/activate', '/test'];
const roleBasedAccess = {
  admin: ['/admin/:path*'],
  user: ['/dashboard/:path*', '/profile/:path*', '/electronic-documents/:path*'],
};

const matchesPath = (pathname: string, patterns: string[]): boolean => {
  return patterns.some((pattern) => {
    const regex = new RegExp(`^${pattern.replace(/:path\*/, '.*')}$`);
    return regex.test(pathname);
  });
};

export async function middleware(request: NextRequest) {
  // const start = performance.now();

  // if (process.env.NODE_ENV === "development") {
  //   await logMiddlewareRequest(request, start);
  // }

  // const { pathname } = request.nextUrl;

  // if (publicPaths.includes(pathname) || matchesPath(pathname, publicPaths)) {
  //   const response = NextResponse.next();
  //   // if (process.env.NODE_ENV === "development") {
  //   //   logMiddlewareResponse(response, start);
  //   // }
  //   return response;
  // }

  // const cookieStore = await cookies();
  // const cookieName = process.env.SESSION_COOKIE_NAME?.toString() || 'SESSION_KEY';
  // const getSessionCookie = cookieStore.get(cookieName);
  // const sessionKey = getSessionCookie ? `${getSessionCookie.value}` : '';

  // try {
  //   const session = await checkSession(sessionKey);

  //   if (!session.isAuthenticated || !session.user) {
  //     const loginUrl = new URL('/login', request.url);
  //     loginUrl.searchParams.set('redirect', pathname);
  //     return NextResponse.redirect(loginUrl);
  //   }

  //   const response = NextResponse.next();
  //   response.headers.set('x-user-role', session.user.role);

  //   // if (process.env.NODE_ENV === 'development') {
  //   //   logMiddlewareResponse(response, start);
  //   // }

  //   return response;
  // } catch (error) {
  //   console.error('Błąd w middleware:', error);
  //   const loginUrl = new URL('/login', request.url);
  //   loginUrl.searchParams.set('redirect', pathname);
  //   return NextResponse.redirect(loginUrl);
  // }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
